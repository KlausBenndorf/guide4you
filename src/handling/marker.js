import ol from 'openlayers'
import {Debug} from 'guide4you/src/Debug'
import {restoreText} from 'guide4you/src/xssprotection'

export const markerParam = {
  keys: [ 'marklat', 'marklon', 'markx', 'marky', 'marktext', 'markpop' ],
  setEvent: 'ready',
  setToMap: (map, query) => {
    let marker = map.get('marker')

    let coords, fromProjection
    if (marker) {
      if (query.isSet('markx') && query.isSet('marky')) {
        coords = [ parseFloat(query.getSanitizedVal('markx')), parseFloat(query.getSanitizedVal('marky')) ]
        fromProjection = map.get('interfaceProjection')
      } else if (query.isSet('marklat') && query.isSet('marklon')) {
        coords = [ parseFloat(query.getSanitizedVal('marklon')), parseFloat(query.getSanitizedVal('marklat')) ]
        fromProjection = 'EPSG:4326'
      } else {
        coords = map.getView().getCenter()
        fromProjection = map.getView().getProjection()
      }
      marker.setPosition(ol.proj.transform(coords, fromProjection, map.get('mapProjection')))

      if (query.isSet('marklat') || query.isSet('marklon') || query.isSet('markx') || query.isSet('marky')) {
        marker.setActive(true)
      }

      if (query.isSet('marktext')) {
        marker.setActive(true)
        marker.setText(query.getSanitizedVal('marktext'))

        if (query.isTrue('markpop') || !query.isSet('markpop')) {
          marker.setPopupVisible(true)
        } else {
          marker.setPopupVisible(false)
        }
      }
    } else {
      Debug.warn('There is no marker configured for the map, but it was tried to set it via the urlapi.')
    }
  },
  getFromMap: (map, query) => {
    let marker = map.get('marker')

    if (marker && marker.getActive() && !query.isExcluded('marker')) {
      let result = {}

      let xy = ol.proj.transform(
        marker.getPosition(), map.get('mapProjection'), map.get('interfaceProjection'))
      let text = restoreText(marker.getText())
      let popvis = marker.getPopupVisible()

      result.markx = xy[ 0 ].toFixed(5)
      result.marky = xy[ 1 ].toFixed(5)

      if (text) {
        result.marktext = text
        result.markpop = popvis // maybe don't set if not needed?
      }

      return result
    }
  }
}
