import $ from 'jquery'

import {Control} from './Control'
import {ListenerOrganizerMixin} from '../ListenerOrganizerMixin'
import {mixin} from '../utilities'
import {cssClasses} from '../globals'
import {addTooltip} from '../html/html'

export class Attribution extends mixin(Control, ListenerOrganizerMixin) {
  constructor (options) {
    options.className = options.className || 'g4u-attribution'
    options.singleButton = false
    options.element = $('<div>').get(0)

    super(options)

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('Attribution tipLabel'))

    /**
     * Attribution -> LayerNames
     */
    this.visibleAttributions_ = new Map()

    this.createStaticHTML(options)

    this.setCollapsed(options.collapsed === true)
  }

  setCollapsed (collapsed) {
    let oldValue = this.collapsed_
    if (oldValue !== collapsed) {
      this.collapsed_ = collapsed
      this.dispatchEvent({
        type: 'change:collapsed',
        oldValue
      })
      this.$list_.toggleClass(cssClasses.collapsed, collapsed)
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
        : options.poweredBy

      /**
       * @type {jQuery}
       * @private
       */
      this.$poweredBy_ = $('<li>')
        .append(content)
        .addClass(this.className_ + '-poweredby')
    }
  }

  updateList () {
    this.$list_.empty()
    if (this.showPoweredBy_) {
      this.$list_.append(this.$poweredBy_)
    }
    this.visibleAttributions_.forEach((layerTitles, attribution) => {
      let text
      if (layerTitles.length === 1) {
        text = layerTitles[0]
      } else {
        text = layerTitles.slice(0, -1).join(', ') + ' & ' + layerTitles[layerTitles.length - 1]
      }
      text += ': ' + attribution
      this.$list_.append($('<li>').html(text))
    })
  }

  forEachLayer (layer) {
    if (layer.getLayers) {
      this.listenAt(layer.getLayers())
        .on('add', e => {
          this.forEachLayer(e.element)
          this.updateList()
        })
        .on('remove', e => {
          this.detachFrom(e.element)
          this.updateList()
        })
      layer.getLayers().forEach(l => this.forEachLayer(l))
    } else {
      if (layer.getVisible()) {
        this.addLayer(layer)
      }
      layer.on('change:visible', () => {
        if (layer.getVisible()) {
          this.addLayer(layer)
        } else {
          this.removeLayer(layer)
        }
        this.updateList()
      })
    }
  }

  addLayer (layer) {
    let attributions = layer.getSource().getAttributions()
    let label = layer.isBaseLayer
      ? this.getLocaliser().localiseUsingDictionary('Attribution baseLayerLabel')
      : layer.get('title')
    if (attributions) {
      for (let attribution of attributions) {
        attribution = attribution.getHTML()
        var layerTitles = this.visibleAttributions_.get(attribution)
        if (!layerTitles) {
          layerTitles = []
          this.visibleAttributions_.set(attribution, layerTitles)
        }
        layerTitles.push(label)
      }
    }
  }

  removeLayer (layer) {
    let attributions = layer.getSource().getAttributions()
    let label = layer.isBaseLayer
      ? this.getLocaliser().localiseUsingDictionary('Attribution baseLayerLabel')
      : layer.get('title')
    if (attributions) {
      for (let attribution of attributions) {
        attribution = attribution.getHTML()
        var layerTitles = this.visibleAttributions_.get(attribution)
        layerTitles.splice(layerTitles.indexOf(label), 1)
        if (layerTitles.length === 0) {
          this.visibleAttributions_.delete(attribution)
        }
      }
    }
  }

  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()
    }

    super.setMap(map)

    if (map) {
      this.forEachLayer(map.getLayerGroup())
      this.updateList()
    }
  }
}
