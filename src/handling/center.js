import ol from 'openlayers'

/**
 * @type {URLParameter}
 */
export const centerParam = {
  keys: ['lon', 'lat', 'x', 'y', 'srid'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('x') && query.isSet('y')) {
      let x = parseFloat(query.getSanitizedVal('x'))
      let y = parseFloat(query.getSanitizedVal('y'))
      let srId = map.get('interfaceProjection')
      if (query.isSet('srid')) {
        srId = query.getSanitizedVal('srid')
      }

      if (!isNaN(x) && !isNaN(y)) {
        let view = map.getView()
        if (ol.proj.get(srId)) {
          view.setCenter(view.constrainCenter(
            ol.proj.transform([x, y], srId, view.getProjection())
          ))
        } else {
          console.error(`Unknown Projection '${srId}'`)
        }
      }
    } else if (query.isSet('lon') && query.isSet('lat') && Math.abs(parseFloat(query.getSanitizedVal('lat'))) < 90) {
      let lon = parseFloat(query.getSanitizedVal('lon'))
      let lat = parseFloat(query.getSanitizedVal('lat'))

      if (!isNaN(lon) && !isNaN(lat)) {
        let view = map.getView()

        view.setCenter(view.constrainCenter(
          ol.proj.transform([lon, lat], 'EPSG:4326', view.getProjection())
        ))
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
