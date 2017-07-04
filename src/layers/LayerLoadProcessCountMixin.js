/**
 * A mixin to keep track the amount of load processes a source is currently waiting for
 */
export class LayerLoadProcessCountMixin {
  initialize () {
    this.debounceLoadComplete_ = 40

    this.isLoading_ = false

    /**
     * @type {number}
     * @private
     */
    this.loadProcessCount_ = 0

    if (this.getSource()) {
      this.registerCounters_()
    }

    this.on('change:source', () => this.registerCounters_())
  }

  registerCounters_ () {
    let loadCompleteTimeout

    this.getSource().on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], () => {
      this.loadProcessCount_ += 1
      if (!this.isLoading_) {
        this.dispatchEvent('loadcountstart')
        this.isLoading_ = true
      }
      clearTimeout(loadCompleteTimeout)
    })

    this.getSource().on([
      'vectorloadend', 'vectorloaderror',
      'tileloadend', 'tileloaderror',
      'imageloadend', 'imageloaderror'], () => {
      this.loadProcessCount_ -= 1
      if (this.loadProcessCount_ === 0) {
        loadCompleteTimeout = setTimeout(() => {
          this.dispatchEvent('loadcountend')
          this.isLoading_ = false
        }, this.debounceLoadComplete_)
      }
    })
  }

  isLoading () {
    return this.isLoading_
  }
}
