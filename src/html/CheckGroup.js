import $ from 'jquery'
import Observable from 'ol/Observable'

import '../../less/checkgroup.less'

export class CheckGroup extends Observable {
  constructor (type, nameValues) {
    super()
    this.buttons_ = {}
    this.type_ = type
    this.values_ = []

    this.$element_ = $('<div>')
      .addClass('g4u-check-group')
      .addClass(`g4u-check-group-${type}`)
    nameValues.forEach(([name, value]) => {
      const $button = $('<button>')
        .text(name)
        .on('click', e => {
          this.toggleValue(value)
          this.dispatchEvent({
            type: 'change:value',
            changed: value
          })
        })
        .appendTo(this.$element_)
      this.buttons_[value] = $button
    })
  }

  setValues (values) {
    if (values === undefined) {
      this.values_ = []
    } else {
      this.values_ = values
    }
    for (let bval in this.buttons_) {
      if (this.values_.includes(bval)) {
        this.buttons_[bval].addClass('g4u-active')
      } else {
        this.buttons_[bval].removeClass('g4u-active')
      }
    }
  }

  getValues (values) {
    return this.values_
  }

  toggleValue (value) {
    if (this.type_ === 'checkbox') {
      if (this.values_.includes(value)) {
        if (this.values_.length > 1) {
          this.values_.splice(this.values_.indexOf(value), 1)
          this.buttons_[value].removeClass('g4u-active')
        }
      } else {
        this.values_.push(value)
        this.buttons_[value].addClass('g4u-active')
      }
    } else {
      if (this.values_[0] !== value) {
        this.buttons_[this.values_[0]].removeClass('g4u-active')
        this.values_ = [value]
        this.buttons_[value].addClass('g4u-active')
      }
    }
  }

  get$Element () {
    return this.$element_
  }

  getSize () {
    return Object.keys(this.buttons_).length
  }
}
