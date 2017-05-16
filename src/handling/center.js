import ol from 'openlayers'

export const centerParam = {
  keys: ['lon', 'lat', 'x', 'y'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('x') && query.isSet('y')) {
      let x = parseFloat(query.getSanitizedVal('x'))
      let y = parseFloat(query.getSanitizedVal('y'))

      if (!isNaN(x) && !isNaN(y)) {
        let view = map.getView()

        view.setCenter(view.constrainCenter(
          ol.proj.transform([x, y], map.get('interfaceProjection'), view.getProjection())
        ))
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
        y: coordinate[1].toFixed(5)
      }
    }
  }
}
