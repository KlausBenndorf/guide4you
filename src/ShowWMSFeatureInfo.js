import ol from 'openlayers'

import {VectorLayer} from './layers/VectorLayer'
import {MapEventInteraction} from './interactions/MapEventInteraction'
import {FeaturePopup} from './FeaturePopup'

/**
 * @typedef {Object} ShowWMSFeatureInfoOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {String} [seperator='<br>']
 * @property {String[]} [mutators=[]]
 * @property {boolean} [animated]
 */

export class ShowWMSFeatureInfo {
  /**
   * @param {ShowWMSFeatureInfoOptions} [options={}]
   */
  constructor (options = {}) {
    this.separator_ = options.hasOwnProperty('seperator') ? options.seperator : '<br>'
    this.style_ = options.style || '#defaultStyle'

    this.animated_ = options.animated
    this.centerOnPopup_ = options.hasOwnProperty('centerOnPopup') ? options.centerOnPopup : true
    this.centerIfNoData_ = this.centerOnPopup_ && options.hasOwnProperty('centerIfNoData')
      ? options.centerIfNoData : false

    this.centerOnPopupInitial_ = this.centerOnPopup_

    this.mutators_ = options.mutators || []
  }

  setMap (map) {
    let onMapChangeMobile = () => {
      if (map.get('mobile')) {
        this.centerOnPopup_ = false
      } else {
        this.centerOnPopup_ = this.centerOnPopupInitial_
      }
    }

    if (this.getMap()) {
      this.getMap().un('change:mobile', onMapChangeMobile)
      ol.Observable.unByKey(this.listenerKey_)
    }

    this.map_ = map
    if (map) {
      this.utilitySource_ = new ol.source.Vector()
      this.utilityLayer_ = new VectorLayer({
        visible: false,
        source: this.utilitySource_
      })
      map.addLayer(this.utilityLayer_)

      this.layers_ = []

      let featurePopup = map.get('featurePopup')
      let projection = map.getView().getProjection()

      let interaction = new MapEventInteraction({ type: 'singleclick' })
      interaction.on('mapevent', e => {
        let coordinate = e.mapEvent.coordinate
        this.utilitySource_.clear()
        if (!map.forEachFeatureAtPixel(e.mapEvent.pixel, FeaturePopup.canDisplay)) {
          let feature
          for (let layer of this.layers_) {
            if (layer.getVisible()) {
              layer.getSource().getFeatureInfo(coordinate, map.getView().getResolution(), projection)
                .then(data => {
                  if (data !== '') {
                    if (!feature) {
                      this.utilitySource_.clear()
                      feature = new ol.Feature({
                        geometry: new ol.geom.Point(coordinate),
                        description: data,
                        style: map.get('styling').getStyle(this.style_)
                      })
                      map.get('styling').manageFeature(feature)
                      this.utilitySource_.addFeature(feature)
                      featurePopup.setFeature(feature, coordinate,
                        [ ...this.mutators_, ...layer.getSource().getFeatureInfoMutators() ])
                      featurePopup.setVisible(true)
                      this.setPointVisible(true)
                      if (this.centerOnPopup_) {
                        featurePopup.centerMapOnPopup(this.animated_)
                      }
                      featurePopup.once('change:visible', () => this.setPointVisible(false))
                    } else {
                      feature.set('description', feature.get('description') + this.separator_ + data)
                    }
                  }
                  layer.on('change:visible', () => {
                    featurePopup.setVisible(false)
                  })
                })
            }
          }
        }
      })

      map.addDefaultInteraction('singleclick', interaction)

      onMapChangeMobile()
      map.on('change:mobile', onMapChangeMobile)
    }
  }

  getPointVisible () {
    return this.utilityLayer_.getVisible()
  }

  setPointVisible (visible) {
    this.utilityLayer_.setVisible(visible)
  }

  getMap () {
    return this.map_
  }

  addLayer (layer) {
    this.layers_.push(layer)
  }
}
