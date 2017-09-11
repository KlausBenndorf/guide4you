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
    let loadingPrecise = false

    this.getSource().on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], () => {
      this.loadProcessCount_ += 1
      if (!this.isLoading_) {
        this.isLoading_ = true
        this.dispatchEvent('loadcountstart')
      }
      loadingPrecise = true
    })

    this.getSource().on([
      'vectorloadend', 'vectorloaderror',
      'tileloadend', 'tileloaderror',
      'imageloadend', 'imageloaderror'], () => {
      this.loadProcessCount_ -= 1
      if (this.loadProcessCount_ === 0) {
        loadingPrecise = false
        this.getProvidedMap().once('delayedpostrender', () => {
          if (!loadingPrecise) {
            this.isLoading_ = false
            this.dispatchEvent('loadcountend')
          }
        })
      }
    })
  }

  isLoading () {
    return this.isLoading_
  }
}
