import {SourceServerVector} from './SourceServerVector'
import { expandTemplate } from '../utilities'

/**
 * @typedef {SourceServerVectorOptions} QuerySourceOptions
 * @property {String[]} [queryValues=[]]
 */

/**
 * A source for a VectorLayer which address is controlled by the urlapi and which is not shown in the LayerSelector
 */
export class QueryVectorSource extends SourceServerVector {
  /**
   * @param {QuerySourceOptions} options
   */
  constructor (options = {}) {
    super(options)

    /**
     * @type {string}
     * @private
     */
    this.origUrlTemplate_ = this.getUrlTemplate()

    /**
     * @type {number}
     * @private
     */
    this.changedQueryValuesCount_ = 0

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
    this.setUrlTemplate(expandTemplate(this.origUrlTemplate_, 'apiValue', this.queryValues_))

    this.changedQueryValuesCount_++
    this.changed()
  }

  addFeatures (features) {
    if (this.changedQueryValuesCount_ > 0) {
      this.changedQueryValuesCount_--
      this.clear()
    }
    super.addFeatures(features)
  }

  /**
   * @returns {string[]}
   */
  getQueryValues () {
    return this.queryValues_
  }
}
