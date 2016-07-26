import $ from 'jquery'

import ShiftableComposedControl from './ShiftableComposedControl'
import WindowDecorator from './WindowDecorator'

import '../../less/mobilecontrols.less'

/**
 * This class represents the mobile menu containing all the controls.
 */
export default class MobileControls extends ShiftableComposedControl {
  /**
   * @param {ShiftableComposedControlOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-mobilecontrols'
    options.element = $('<div>').get(0)
    options.containerClassName = options.className + '-container'
    options.visibleControls = options.visibleControls || 5

    super(options)
  }

  /**
   * @param {Control} control
   * @param {g4uControlOptions} options
   */
  addControl (control, options) {
    if (control.isWindowed() || control.isSingleButton()) {
      super.addControl(control, options)
    } else {
      super.addControl(new WindowDecorator({
        component: control
      }), options)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().un('change:mobile', this.handler_)
    }

    super.setMap(map)

    if (map) {
      this.handler_ = () => {
        if (!map.get('mobile')) {
          for (let control of this.getControls().filter(c => c.setWindowVisible)) {
            control.setWindowVisible(false)
          }
        }
      }
      map.on('change:mobile', this.handler_)
    }
  }
}
