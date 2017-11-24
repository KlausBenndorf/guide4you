import ol from 'openlayers'
import { Debug } from 'guide4you/src/Debug'

/**
 * @type {URLParameter}
 */
export const fitRectangleParam = {
  keys: ['x0', 'y0', 'x1', 'y1', 'srid', 'pad'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('x0') && query.isSet('y0') && query.isSet('x1') && query.isSet('y1')) {
      let x0 = parseFloat(query.getSanitizedVal('x0'))
      let y0 = parseFloat(query.getSanitizedVal('y0'))
      let x1 = parseFloat(query.getSanitizedVal('x1'))
      let y1 = parseFloat(query.getSanitizedVal('y1'))
      if (!isNaN(x0) && !isNaN(y0) && !isNaN(x1) && !isNaN(y1)) {
        let options = {}
        if (query.isSet('srid')) {
          let srId = query.getSanitizedVal('srid')
          if (ol.proj.get(srId)) {
            options.srId = srId
          } else {
            Debug.error(`Unknown Projection '${srId}'`)
          }
        } else {
          options.srId = map.get('interfaceProjection')
        }
        if (query.isSet('pad')) {
          let p = parseFloat(query.getSanitizedVal('pad'))
          options.padding = [p, p, p, p]
        }

        map.get('api').fitRectangle([[x0, y0], [x1, y1]], options)
      }
    }
  },
  getFromMap: (map, query) => {
    let view = map.getView()
    let coordinate = ol.proj.transform(
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
