import ol from 'openlayers'

import Parser from 'guide4you-module-search/src/SearchParser'

/**
 * A Parser for the search results returned from the G4UServer using the SearchV2
 */
export class G4USearchV2 extends Parser {
  /**
   * @param {SearchParserOptions} [options]
   */
  constructor (options = {}) {
    super(options)

    /**
     * @type {ol.format.WKT}
     * @private
     */
    this.wktParser_ = new ol.format.WKT()
  }

  /**
   * @param {object} data
   * @returns {ol.Feature}
   * @protected
   */
  readFeature_ (data) {
    let featureOptions = {}

    if (data.hasOwnProperty('id')) {
      featureOptions.id = data.id
    }

    if (data.hasOwnProperty('name')) {
      featureOptions.name = data.name
      featureOptions.dropdowntext = data.name
      featureOptions.searchtext = data.name
    }

    if (data.hasOwnProperty('description')) {
      featureOptions.description = data.description
    }

    if (data.hasOwnProperty('geometry')) {
      featureOptions.geometry = this.wktParser_.readGeometry(data.geometry, {
        dataProjection: this.dataProjection_,
        featureProjection: this.featureProjection_
      })
    } else if ((data.hasOwnProperty('lon')) && (data.hasOwnProperty('lat'))) {
      let point = [parseFloat(data.lon), parseFloat(data.lat)]

      if (this.featureProjection_) {
        point = ol.proj.transform(point, this.dataProjection_, this.featureProjection_)
      }

      featureOptions.geometry = new ol.geom.Point(point)
    }

    return new ol.Feature(featureOptions)
  }

  /**
   * @param {string} text
   * @returns {ol.Feature[]}
   */
  parseFeatures (text) {
    // calling the parent's parseFeatures method with adjusted text
    // G4USearchV2Parser Search sometimes returns jsonp, this function just strip the () and
    // furthermore uses " instead of '

    if (text[0] === '(') {
      return super.parseFeatures(text.substr(1, text.length - 2).replace(/"/g, '\\"').replace(/'/g, '"'))
    } else {
      return super.parseFeatures(text)
    }
  }

}
