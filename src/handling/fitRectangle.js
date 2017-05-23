import ol from 'openlayers'

export const fitRectangleParam = {
  keys: ['x0', 'y0', 'x1', 'y1', 'srid'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('x0') && query.isSet('y0') && query.isSet('x1') && query.isSet('y1')) {
      let x0 = parseFloat(query.getSanitizedVal('x0'))
      let y0 = parseFloat(query.getSanitizedVal('y0'))
      let x1 = parseFloat(query.getSanitizedVal('x1'))
      let y1 = parseFloat(query.getSanitizedVal('y1'))
      let srId = map.get('interfaceProjection')
      if (query.isSet('srid')) {
        srId = query.getSanitizedVal('srid')
      }

      if (!isNaN(x0) && !isNaN(y0) && !isNaN(x1) && !isNaN(y1)) {
        if (ol.proj.get(srId)) {
          map.get('api').fitRectangle([[x0, y0], [x1, y1]], {'srId': srId})
        } else {
          console.error(`Unknown Projection '${srId}'`)
        }
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
