import ol from 'openlayers'

/**
 * @typedef {Object} SearchParserOptions
 * @property {ol.ProjectionLike} [featureProjection='EPSG:3857']
 * @property {ol.ProjectionLike} [dataProjection='EPSG:4326']
 */

export class SearchParser {
  /**
   * @param {SearchParserOptions} options
   */
  constructor (options = {}) {
    /**
     * @type {ol.ProjectionLike}
     * @private
     */
    this.dataProjection_ = options.dataProjection || ol.proj.get('EPSG:4326')

    /**
     * @type {ol.ProjectionLike}
     * @private
     */
    this.featureProjection_ = options.featureProjection || ol.proj.get('EPSG:3857')
  }

  /**
   * This is the interface used by the software. It can be overwritten if needed.
   * @param {string} text
   * @returns {ol.Feature[]}
   */
  parseFeatures (text) {
    if (text) {
      return this.readFeatures_(JSON.parse(text))
    }
  }

  /**
   * This method is abstract, i.e. it needs to be implemented in every subclass.
   * It should return an feature with the following properties:
   *
   * 'id' (if available)
   * 'name' (neccessary)
   * 'description' (if available - else only name is shown in html)
   * 'dropdowntext' (plain text - the text shown in the dropdown of the searchControl)
   * 'searchtext' (plain text - a text to search and find the object)
   *
   * And the feature needs to have the fitting geometry and if informations
   * about an icon are provided, a style containing the icon should be set.
   * @param {object} data
   * @returns {ol.Feature}
   * @protected
   * @abstract
   */
  readFeature_ (data) {
    throw new Error('Function readFeature_ not implemented!')
  }

  /**
   * This method is used by the parseFeatures method and calls the readFeature_ method multiple times.
   * It can be overridden if needed.
   * @param {object[]} data
   * @returns {ol.Feature[]}
   * @protected
   */
  readFeatures_ (data) {
    let features = []
    if (data) {
      if (Array.isArray(data)) {
        for (let i = 0, ii = data.length; i < ii; i++) {
          features.push(this.readFeature_(data[i]))
        }
      } else {
        throw new Error('Search did not return an Array.')
      }
    }

    return features
  }
}
