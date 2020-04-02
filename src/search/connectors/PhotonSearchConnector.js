import $ from 'jquery'
import { transform } from 'ol/proj'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'

import { SearchConnector } from './SearchConnector'

export class PhotonSearchConnector extends SearchConnector {
  constructor (options) {
    super(options)

    this.dataProjection = 'EPSG:4326'
  }

  getAutoComplete (text) {
    return new Promise(resolve => resolve([[], []]))
  }

  getSearchResult (searchTerm) {
    return new Promise((resolve, reject) => {
      const location = transform(
        this.getMap().getView().getCenter(),
        this.getMap().getView().getProjection(),
        this.dataProjection)

      const finalUrl = this.serviceURL.clone()
        .expandTemplate('searchstring', searchTerm)
        .expandTemplate('lon', location[0].toFixed(5))
        .expandTemplate('lat', location[1].toFixed(5))
        .finalize()

      $.ajax({
        url: finalUrl,
        dataType: 'json',
        success: results => {
          resolve(SearchConnector.flipTuples(results.features.map(d => this.readFeature_(d))))
        },
        error: (jqXHR, textStatus) => {
          reject(new Error('Problem while trying to get search results from the Server: ' +
            `${textStatus} - ${jqXHR.responseText} (SearchURL: ${finalUrl})`))
        }
      })
    })
  }

  /**
   * @param {object} data
   * @returns {[string, Feature]}
   * @protected
   */
  readFeature_ (data) {
    // creates Features which may have the following data fields:
    // id
    // name
    // description
    // dropdowntext
    // searchtext
    //
    // and will have a geometry and a style if anything was provided

    const dropdowntext = data.properties.name

    const featureOptions = {
      name: data.properties.name,
      geometry: new Point(transform(
        data.geometry.coordinates, this.dataProjection, this.getMap().getView().getProjection()))
    }

    const feature = new Feature(featureOptions)

    feature.setId(data.properties.osm_id)

    return [dropdowntext, feature]
  }
}
