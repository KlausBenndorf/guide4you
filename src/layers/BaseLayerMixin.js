import { GroupLayer } from './GroupLayer'

/**
 * @typedef {object} BaseLayerMixinOptions
 * @property {GroupLayer} groupLayer the group this baseLayer belongs to
 */

/**
 * This mixin provides baselayer functionality to any layer
 */
export class BaseLayerMixin {
  /**
   * @param {BaseLayerMixinOptions} options
   */
  initialize (options) {
    /**
     * @type {GroupLayer}
     * @private
     */
    this.groupLayer_ = options.groupLayer

    this.on('change:available', this.onChangeAvailable.bind(this))
    this.on('change:visible', this.onChangeVisible.bind(this))

    this.isBaseLayer = true
  }

  /**
   * This method sets the next available layer visible if this layer gets unavailable and was the visible baselayer
   */
  onChangeAvailable () {
    if (!this.get('available') && this.getVisible()) {
      this.groupLayer_.recursiveForEach(layer => {
        if (!(layer instanceof GroupLayer) && layer.get('available')) {
          layer.setVisible(true)
        }
      })
    }
  }

  /**
   * This method sets all other baselayers not visible if set true.
   */
  onChangeVisible () {
    if (this.getVisible()) {
      this.groupLayer_.recursiveForEach(layer => {
        if (!(layer instanceof GroupLayer) && layer !== this) {
          layer.setVisible(false)
        }
      })
    } else {
      let found = false
      this.groupLayer_.recursiveForEach(layer => {
        if (!(layer instanceof GroupLayer) && layer.getVisible()) {
          found = true
        }
      })

      if (!found) {
        this.setVisible(true)
      }
    }
  }
}
