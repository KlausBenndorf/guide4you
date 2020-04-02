export class ActivatableMixin {
  /**
   * @param {object} options
   * @param {boolean} options.active
   */
  initialize (options = {}) {
    /**
     * @type {boolean}
     * @private
     */
    this.activate_ = options.active === true

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false
  }

  activateOnMapChange () {
    this.setActive(this.activate_)
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    const oldValue = this.active_
    if (oldValue !== active) {
      this.active_ = active
      const changeEvent = {
        type: 'change:active',
        oldValue: oldValue
      }
      this.dispatchEvent(changeEvent)
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }
}
