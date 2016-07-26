/**
 * This class organizes controls in an active group in which only one control can bea active at a time.
 * This specified and configured via a property 'activeGroup' in the config object of the control and
 * a matching string for all controls which should be in this group
 */
export default class ActiveGroup {
  /**
   * @param {Control[]} controls
   */
  constructor (controls = []) {
    /**
     * @type {Control[]}
     * @private
     */
    this.controls_ = controls
    for (let control of this.controls_) {
      this.addControl(control)
    }
  }

  /**
   * @param {Control} control
   */
  addControl (control) {
    this.controls_.push(control)
    control.on('change:active', () => {
      if (control.getActive()) {
        if (this.activeControl_) {
          this.activeControl_.setActive(false)
        }
        this.activeControl_ = control
      } else {
        this.activeControl_ = null
      }
    })
  }
}
