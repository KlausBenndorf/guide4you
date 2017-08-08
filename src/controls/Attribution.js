import $ from 'jquery'
import { groupBy, map } from 'lodash/collection'

import { Control } from './Control'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'
import { cssClasses } from '../globals'
import { addTooltip } from '../html/html'
import { GroupLayer } from '../layers/GroupLayer'

import '../../less/attribution.less'
import { uniq } from 'lodash/array'
import { FunctionCallBuffer } from '../FunctionCallBuffer'

function groupByChain (col) {
  return {
    groupBy: (cb) => {
      return groupByChain(groupBy(col, cb))
    },
    forEach: (cb) => {
      return groupByChain(col.forEach(cb))
    },
    map: (cb) => {
      return groupByChain(map(col, cb))
    }
  }
}

export class Attribution extends mixin(Control, ListenerOrganizerMixin) {
  constructor (options) {
    options.className = options.className || 'g4u-attribution'
    options.singleButton = false
    options.element = $('<div>').get(0)

    super(options)

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('Attribution tipLabel'))

    /**
     * Pairs of layer title and attribution
     * @type {Array.<[string, string]>}
     * @private
     */
    this.visibleAttributions_ = []

    this.createStaticHTML(options)

    this.setCollapsed(options.collapsed === true)

    this.updateListCallBuffer = new FunctionCallBuffer(() => this.updateList())
  }

  setCollapsed (collapsed, silent) {
    let oldValue = this.collapsed_
    if (oldValue !== collapsed) {
      this.collapsed_ = collapsed
      this.dispatchEvent({
        type: 'change:collapsed',
        oldValue
      })
      if (!silent) {
        this.dispatchEvent('change:size')
      }
      this.get$Element().toggleClass(cssClasses.collapsed, collapsed)
    }
  }

  getCollapsed () {
    return this.collapsed_
  }

  createStaticHTML (options) {
    let $button = $('<button>')
      .on('click', () => {
        this.setCollapsed(!this.getCollapsed())
      })
    addTooltip($button, this.getTipLabel())

    this.$list_ = $('<ul>')

    this.get$Element()
      .append($button)
      .append(this.$list_)

    /**
     * @type {boolean}
     * @private
     */
    this.showPoweredBy_ = options.poweredBy !== false
    if (this.showPoweredBy_) {
      let content = (options.poweredBy === undefined)
        ? '<a href="https://github.com/KlausBenndorf/guide4you" target="_blank">Guide4You</a>'
        : this.getLocaliser().selectL10N(options.poweredBy)

      if (!Array.isArray(content)) {
        content = [content]
      }

      /**
       * @type {jQuery}
       * @private
       */
      this.$poweredBy_ = content.map(c => $('<li>')
        .append(c)
        .addClass(this.className_ + '-poweredby'))
    }
  }

  updateList () {
    this.scanLayers()

    this.$list_.empty()
    if (this.showPoweredBy_) {
      this.$list_.append(this.$poweredBy_)
    }

    groupByChain(this.visibleAttributions_)
      .groupBy(([layerTitle, attribution]) => {
        return layerTitle
      }) // -> { layerTitle: [[layerTitle, attribution]*] }
      .map((val, key) => {
        return [key, val.map(p => p[1])]
      }) // -> [[layerTitle, attribution*]*]
      .groupBy(([layerTitle, attributions]) => {
        attributions = uniq(attributions)
        if (attributions.length === 1) {
          return attributions[0]
        } else {
          return attributions.join(' & ')
        }
      })
      .map((val, key) => {
        return [val.map(p => p[0]), key]
      })
      .forEach(([layerTitles, attributionText]) => {
        let text
        if (layerTitles.length === 1) {
          text = layerTitles[0]
        } else {
          text = layerTitles.slice(0, -1).join(', ') + ' & ' + layerTitles[layerTitles.length - 1]
        }
        text += ': ' + attributionText
        this.$list_.append($('<li>').html(text))
        if (!this.getCollapsed()) {
          this.dispatchEvent('change:size')
        }
      })
  }

  scanLayers () {
    if (this.getMap()) {
      this.visibleAttributions_ = []
      this.scanLayer(this.getMap().getLayerGroup())
    }
  }

  scanLayer (layer, layerTitle = null) {
    if (layer.getVisible()) {
      if (layer.getLayers) {
        let silentGroup = !(layer instanceof GroupLayer)
        layer.getLayers().forEach(l => this.scanLayer(l, silentGroup ? layer.get('title') : null))
      } else {
        if (layer.getVisible()) {
          let label = layer.isBaseLayer
            ? this.getLocaliser().localiseUsingDictionary('Attribution baseLayerLabel')
            : (layerTitle || layer.get('title'))
          this.addLayer(layer, label)
        }
      }
    }
  }

  attachListeners (layer) {
    if (layer.getLayers) {
      layer.getLayers().forEach(l => this.attachListeners(l))
      this.listenAt(layer.getLayers())
        .on('add', e => {
          this.attachListeners(e.element)
          this.updateListCallBuffer.call()
        })
        .on('remove', e => {
          this.detachFrom(e.element)
          this.updateListCallBuffer.call()
        })
    }

    if (!(layer instanceof GroupLayer)) {
      this.listenAt(layer)
        .on('change:visible', () => {
          this.updateListCallBuffer.call()
        })
        .on('change:source', () => {
          if (layer.getVisible()) {
            this.updateListCallBuffer.call()
          }
        })
    }
  }

  addLayer (layer, label) {
    if (layer.getSource && layer.getSource()) {
      let attributions = layer.getSource().getAttributions()
      if (attributions) {
        for (let attribution of attributions) {
          this.visibleAttributions_.push([label, attribution.getHTML()])
        }
      }
    }
  }

  updateRtl () {
    if (this.getMap().get('localiser').isRtl()) {
      this.$list_.prop('dir', 'rtl')
    } else {
      this.$list_.prop('dir', undefined)
    }
  }

  setMap (map) {
    if (this.getMap()) {
      this.visibleAttributions_ = []
      this.detachAllListeners()
    }

    super.setMap(map)

    if (map) {
      setTimeout(() => {
        this.attachListeners(map.getLayerGroup())
        this.updateListCallBuffer.call()
        this.updateRtl()
        this.listenAt(map.get('localiser')).on('change:language', () => {
          this.updateRtl()
        })
      }, 0)
    }
  }
}
