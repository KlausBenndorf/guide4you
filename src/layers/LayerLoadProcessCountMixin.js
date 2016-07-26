/**
 * A mixin to keep track the amount of load processes a source is currently waiting for
 */
export default class LayerLoadProcessCountMixin {
  initialize () {
    /**
     * @type {number}
     * @private
     */
    this.loadProcessCount_ = 0

    this.getSource().on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], () => {
      this.loadProcessCount_ += 1
    })

    this.getSource().on([
      'vectorloadend', 'vectorloaderror',
      'tileloadend', 'tileloaderror',
      'imageloadend', 'imageloaderror'], () => {
      this.loadProcessCount_ -= 1
    })
  }

  /**
   * @returns {number}
   */
  getLoadProcessCount () {
    return this.loadProcessCount_
  }

  /**
   * Resets load process count to 0
   */
  resetLoadProcessCount () {
    this.loadProcessCount_ = 0
  }
}
