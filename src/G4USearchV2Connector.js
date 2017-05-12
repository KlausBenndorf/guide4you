import ol from 'openlayers'
import zip from 'lodash/zip'

import {Debug} from 'guide4you/src/Debug'
import {SearchConnector} from 'guide4you-module-search/src/SearchConnector'
import {expandTemplate, addProxy, html2Text} from 'guide4you/src/utilities'

export class G4USearchV2Connector extends SearchConnector {

  constructor (options) {
    super(options)

    this.autocompleteUrl_ = this.serviceURL + '/Autocomplete.ashx?term={searchstring}'
    this.fuzzyUrl_ = this.serviceURL + '/findall.ashx?option=2&term={searchstring}'
    this.byHandleUrl_ = this.serviceURL + '/findall.ashx?option=1&term={searchstring}'

    this.dataProjection = 'EPSG:4326'

    this.wktParser_ = new ol.format.WKT()
  }

  static flipTuples(tuples) {
    if (tuples.length) {
      return zip(...tuples)
    }
    return [[], []]
  }

  getAutoComplete (text) {
    return new Promise((resolve, reject) => {
      let url = expandTemplate(this.autocompleteUrl_, 'searchstring', text)

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'json',
        success: results => {
          resolve(SearchConnector.flipTuples(results.map(r => [r.name, r.name])))
        },
        error: (jqXHR, textStatus) => {
          reject(`Problem while trying to get search results from the Server: ${textStatus} - ${jqXHR.responseText} ` +
            `(SearchURL: ${url})`)
        }
      })
    })
  }

  getSearchResult(searchTerm) {
    return new Promise((resolve, reject) => {
      let url = expandTemplate(this.fuzzyUrl_, 'searchstring', searchTerm)

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'json',
        success: results => {
          let features = this.readFeatures_(results)
          resolve(SearchConnector.flipTuples(features.map(f => [f.get('name'), f])))
        },
        error: (jqXHR, textStatus) => {
          reject(`Problem while trying to get search results from the Server: ${textStatus} - ${jqXHR.responseText} ` +
            `(SearchURL: ${url})`)
        },
        headers: {
          'Accept-Language': this.localiser.getCurrentLang()
        }
      })
    })
  }

  getByHandle(handle) {
    return new Promise((resolve, reject) => {
      let url = expandTemplate(this.byHandleUrl_, 'searchstring', searchTerm)

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'json',
        success: results => {
          resolve(this.readFeatures_(results[0]))
        },
        error: (jqXHR, textStatus) => {
          reject(`Problem while trying to get search results from the Server: ${textStatus} - ${jqXHR.responseText} ` +
            `(SearchURL: ${url})`)
        },
        headers: {
          'Accept-Language': this.localiser.getCurrentLang()
        }
      })
    })
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
    }

    if (data.hasOwnProperty('description')) {
      featureOptions.description = data.description
    }

    if (data.hasOwnProperty('geometry')) {
      featureOptions.geometry = this.wktParser_.readGeometry(data.geometry, {
        dataProjection: this.dataProjection,
        featureProjection: this.featureProjection
      })
    } else if ((data.hasOwnProperty('lon')) && (data.hasOwnProperty('lat'))) {
      let point = [parseFloat(data.lon), parseFloat(data.lat)]

      if (this.featureProjection) {
        point = ol.proj.transform(point, this.dataProjection, this.featureProjection)
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
