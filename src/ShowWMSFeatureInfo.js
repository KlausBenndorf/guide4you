import ol from 'openlayers'
import $ from 'jquery'
import {VectorLayer} from './layers/VectorLayer';

/**
 * @typedef {Object} ShowWMSFeatureInfoOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {String} [seperator='<br>']
 */

export class ShowWMSFeatureInfo {
  /**
   * @param {ShowWMSFeatureInfoOptions} [options={}]
   */
  constructor (options = {}) {
    this.separator_ = options.hasOwnProperty('seperator') ? options.seperator : '<br>'
    this.style_ = options.style || '#defaultStyle'
  }

  setMap (map) {
    if (this.getMap()) {
      ol.Observable.unByKey(this.listenerKey_)
    }
    this.map_ = map
    if (map) {
      this.utilitySource_ = new ol.source.Vector()
      map.addLayer(new VectorLayer({
        visible: true,
        source: this.utilitySource_
      }))

      this.layers_ = []

      let featurePopup = map.get('featurePopup')
      let projection = map.getView().getProjection()

      this.listenerKey_ = map.on('singleclick', e => {
        if ($(e.originalEvent.target).is('.ol-viewport > canvas')) {
          this.utilitySource_.clear()
          let feature
          for (let layer of this.layers_) {
            if (layer.getVisible()) {
              layer.getSource().getFeatureInfo(e.coordinate, map.getView().getResolution(), projection)
                .then(data => {
                  if (data !== '') {
                    if (!feature) {
                      feature = new ol.Feature({
                        geometry: new ol.geom.Point(e.coordinate),
                        description: data
                      })
                      map.get('styling').styleFeature(feature, this.style_)
                      this.utilitySource_.addFeature(feature)
                      featurePopup.setFeature(feature)
                      featurePopup.setVisible(true)
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
