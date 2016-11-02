import $ from 'jquery'

import {Control} from './Control'
import {TempDetach} from '../html/TempDetach'
import {cssClasses} from '../globals'
import {ListenerOrganizerMixin} from '../ListenerOrganizerMixin'
import {mixin} from '../utilities'

import '../../less/accesshiddencontrols.less'

export class AccessHiddenControls extends mixin(Control, ListenerOrganizerMixin) {
  constructor (options = {}) {
    options.className = options.className || 'g4u-access-hidden-control'
    options.element = $('<div></div>')[ 0 ]
    options.singleButton = true

    super(options)

    this.tempDetaches_ = []
  }

  getActive () {
    return this.active_
  }

  setActive (active) {
    const oldValue = this.active_
    if (active !== oldValue) {
      this.active_ = active
      this.dispatchEvent({
        type: 'change:active',
        oldValue: oldValue
      })
    }
  }

  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()
      this.setActive(false)
    }

    super.setMap(map)

    if (map) {
      map.asSoonAs('ready', true, () => {
        this.$parentDecorator_ = this.get$Element().parents().filter('.g4u-window-decorator')

        this.gatherControls_()

        this.listenAt(map.get('controlPositioning'))
          .on('before:positioning', () => this.releaseControls_())
        this.listenAt(map.get('controlPositioning'))
          .on('after:positioning', () => this.gatherControls_())
      })
    }
  }

  releaseControls_ () {
    for (let tempDetach of this.tempDetaches_) {
      tempDetach.$element.addClass(cssClasses.hidden)
      tempDetach.restore()
    }
  }

  gatherControls_ () {
    for (let hidden of this.getMap().get('controlPositioning').getHiddenControls()) {
      var $element = hidden.get$Element()
      $element.removeClass(cssClasses.hidden)
      this.tempDetaches_.unshift(new TempDetach($element))
      this.get$Element().append($element)
    }
    if (this.tempDetaches_.length) {
      this.$parentDecorator_.removeClass(cssClasses.disabled)
      this.changed()
    } else {
      this.$parentDecorator_.addClass(cssClasses.disabled)
    }
  }
}
