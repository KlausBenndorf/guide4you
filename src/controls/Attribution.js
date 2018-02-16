import $ from 'jquery'

import { Control } from './Control'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'
import { cssClasses } from '../globals'
import { addTooltip } from '../html/html'

import '../../less/attribution.less'

export class Attribution extends mixin(Control, ListenerOrganizerMixin) {
  constructor (options) {
    options.className = options.className || 'g4u-attribution'
    options.singleButton = false
    options.element = $('<div>').get(0)

    super(options)

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('Attribution tipLabel'))

    this.createStaticHTML(options)

    this.setCollapsed(options.collapsed === true)
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

  updateList (attributions) {
    this.$list_.empty()
    if (this.showPoweredBy_) {
      this.$list_.append(this.$poweredBy_)
    }

    for (let attribution of attributions) {
      this.$list_.append($('<li>').html(attribution))
    }

    if (!this.getCollapsed()) {
      this.dispatchEvent('change:size')
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
      this.detachAllListeners()
    }

    super.setMap(map)

    if (map) {
      map.asSoonAs('ready:layers', true, () => {
        if (this.getMap()) {
          const attributions = this.getMap().get('attributions')
          this.updateList(attributions.getArray())
          this.listenAt(attributions).on('change', () => {
            this.updateList(attributions.getArray())
          })
          this.updateRtl()
          this.listenAt(this.getMap().get('localiser')).on('change:language', () => {
            this.updateRtl()
          })
        }
      }, 0)
    }
  }
}
