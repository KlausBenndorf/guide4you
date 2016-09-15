import ol from 'openlayers'
import $ from 'jquery'

export class ShowWMSFeatureInfo {
  constructor () {
    this.separator_ = '<br>'
  }

  setMap (map) {
    if (this.getMap()) {
      ol.Observable.unByKey(this.listenerKey_)
    }
    this.map_ = map
    if (map) {
      this.layers_ = []

      let featurePopup = map.get('featurePopup')
      let projection = map.getView().getProjection()

      this.listenerKey_ = map.on('singleclick', e => {
        if ($(e.originalEvent.target).is('.ol-viewport > canvas')) {
          let feature = new ol.Feature({
            geometry: new ol.geom.Point(e.coordinate)
          })

          for (let layer of this.layers_) {
            if (layer.getVisible()) {
              layer.getSource().getFeatureInfo(e.coordinate, map.getView().getResolution(), projection)
                .then(data => {
                  if (data !== '') {
                    if (!feature.get('description')) {
                      featurePopup.setFeature(feature)
                      featurePopup.setVisible(true)
                      feature.set('description', data)
                    } else {
                      feature.set('description', feature.get('description') + this.separator_ + data)
                    }
                  }
                })
            }
          }
        }
      })
    }
  }

  getMap () {
    return this.map_
  }

  addLayer (layer) {
    this.layers_.push(layer)
  }
}
