import ol from 'openlayers'

import {Debug} from 'guide4you/src/Debug'
import {SearchConnector} from 'guide4you-module-search/src/SearchConnector'
import {expandTemplate, addProxy, html2Text} from 'guide4you/src/utilities'

export class G4UServerSearchConnector extends SearchConnector {

  constructor (options) {
    super(options)

    this.autocompleteUrl_ = this.serviceURL + '/Search/AutoComplete/{searchstring}'
    this.fuzzyUrl_ = this.serviceURL + '/Search/{searchstring}'
    this.byHandleUrl_ = this.serviceURL + '/Search/Exact/{type}/{id}'

    this.format_ = new ol.format.KML({showPointNames: false})
  }

  getAutoComplete(searchTerm) {
    return new Promise((resolve, reject) => {
      let url = expandTemplate(this.fuzzyUrl_, 'searchstring', searchTerm)

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'text',
        success: results => {
          let features = this.format_.readFeatures(results, { dataProjection: 'EPSG:4326', featureProjection: this.featureProjection })
          resolve(SearchConnector.flipTuples(features.map(f => [f.get('extra'), f])))
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
    // return new Promise((resolve, reject) => {
    //   let url = expandTemplate(this.autocompleteUrl_, 'searchstring', searchTerm)
    //
    //   $.ajax({
    //     url: this.proxifyUrl(url),
    //     dataType: 'json',
    //     success: results => {
    //       resolve(SearchConnector.flipTuples(results.map(r => [r.name, r])))
    //     },
    //     error: (jqXHR, textStatus) => {
    //       reject(`Problem while trying to get search results from the Server: ${textStatus} - ${jqXHR.responseText} ` +
    //         `(SearchURL: ${url})`)
    //     },
    //     headers: {
    //       'Accept-Language': this.localiser.getCurrentLang()
    //     }
    //   })
    // })
  }

  getSearchResult(searchTerm) {
    return new Promise((resolve, reject) => {
      let url = expandTemplate(this.fuzzyUrl_, 'searchstring', searchTerm)

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'text',
        success: results => {
          let features = this.format_.readFeatures(results, { dataProjection: 'EPSG:4326', featureProjection: this.featureProjection })
          resolve(SearchConnector.flipTuples(features.map(f => [f.get('extra'), f])))
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
      let url = expandTemplate(this.byHandleUrl_, 'type', handle.type)
      url = expandTemplate(url, 'id', JSON.stringify(handle.id))

      $.ajax({
        url: this.proxifyUrl(url),
        dataType: 'text',
        success: results => {
          let features = this.format_.readFeatures(results, { dataProjection: 'EPSG:4326', featureProjection: this.featureProjection })
          resolve(features[0])
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
}
