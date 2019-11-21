import { get as getProj, transform } from 'ol/proj'
import { Debug } from '../../Debug'

/**
 * @type {URLParameter}
 */
export const centerParam = {
  keys: ['lon', 'lat', 'x', 'y', 'srid'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('lon') && query.isSet('lat') && Math.abs(parseFloat(query.getSanitizedVal('lat'))) < 90) {
      const lon = parseFloat(query.getSanitizedVal('lon'))
      const lat = parseFloat(query.getSanitizedVal('lat'))

      if (!isNaN(lon) && !isNaN(lat)) {
        query.setUrlValue('x', lon.toString())
        query.setUrlValue('y', lat.toString())
        query.setUrlValue('srid', 'EPSG:4326')
        query.setJsValue('x', lon)
        query.setJsValue('y', lat)
        query.setJsValue('srid', 'EPSG:4326')
      }
    }
    if (query.isSet('x') && query.isSet('y')) {
      const x = parseFloat(query.getSanitizedVal('x'))
      const y = parseFloat(query.getSanitizedVal('y'))
      let srId = map.get('interfaceProjection')
      if (query.isSet('srid')) {
        srId = query.getSanitizedVal('srid')
      }

      if (!isNaN(x) && !isNaN(y)) {
        const view = map.getView()
        if (getProj(srId)) {
          view.setCenter(view.constrainCenter(
            transform([x, y], srId, view.getProjection())
          ))
        } else {
          Debug.error(`Unknown Projection '${srId}'`)
        }
      }
    }
  },
  getFromMap: (map, query) => {
    const view = map.getView()
    const coordinate = transform(
      view.getCenter(),
      view.getProjection(),
      map.get('interfaceProjection')
    )

    if (!query.isExcluded('center')) {
      return {
        x: coordinate[0].toFixed(5),
        y: coordinate[1].toFixed(5),
        srid: map.get('interfaceProjection')
      }
    }
  }
}
