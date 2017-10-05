import { mixin } from '../utilities'
import { ImageWMSSource, TileWMSSource } from './ImageWMSSource'

/**
 * A source for a VectorLayer which address is controlled by the urlapi and which is not shown in the LayerSelector
 */
export class QueryWMSMixin {
  initialize (options) {
    this.setQueryValues(options.queryValues || [])
  }

  /**
   * @param {string[]} values
   */
  setQueryValues (values) {
    /**
     * @type {string[]}
     * @private
     */
    this.queryValues_ = values

    this.updateParams(Object.assign({}, this.getParams(), { LAYERS: values }))

    this.changed()
  }

  /**
   * @returns {string[]}
   */
  getQueryValues () {
    return this.queryValues_
  }
}

export const QueryImageWMSSource = mixin(ImageWMSSource, QueryWMSMixin)

export const QueryTileWMSSource = mixin(TileWMSSource, QueryWMSMixin)
