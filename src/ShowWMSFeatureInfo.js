import ol from 'openlayers'
import $ from 'jquery'
import {VectorLayer} from './layers/VectorLayer';
import {MapEventInteraction} from './interactions/MapEventInteraction';
import {finishAllImages} from './utilities'

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

    this.animated_ = (options.hasOwnProperty('animated')) ? options.animated : false
    this.centerOnPopup_ = (options.hasOwnProperty('centerOnPopup')) ? options.centerOnPopup : true
    this.centerIfNoData_ = (options.hasOwnProperty('centerOnPopup')) ? options.centerIfNoData : false

    this.centerOnPopupInitial_ = this.centerOnPopup_

  }

  setMap (map) {

    let onMapChangeMobile = () => {
      if (map.get('mobile')) {
        this.centerOnPopup_ = false
      } else {
        this.centerOnPopup_ = this.centerOnPopupInitial_
      }
    }

    let centerMapOnPopup = (featurePopup) => {
      this.getMap().get('move').toPoint(featurePopup.getCenter(), { animated: this.animated_ })
    }

    if (this.getMap()) {
      this.getMap().un('change:mobile', onMapChangeMobile)
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

      let interaction = new MapEventInteraction({ type: 'singleclick' })
      interaction.on('mapevent', e => {
        let mapEvent = e.mapEvent
        this.utilitySource_.clear()
        let feature
        for (let layer of this.layers_) {
          if (layer.getVisible()) {
            layer.getSource().getFeatureInfo(mapEvent.coordinate, map.getView().getResolution(), projection)
              .then(data => {
                if (data !== '') {
                  if (!feature) {
                    feature = new ol.Feature({
                      geometry: new ol.geom.Point(mapEvent.coordinate),
                      description: data
                    })
                    map.get('styling').styleFeature(feature, this.style_)
                    this.utilitySource_.addFeature(feature)
                    featurePopup.setFeature(feature)
                    featurePopup.setVisible(true)
                    if (this.centerOnPopup_) {
                      if (this.centerIfNoData_ || $($.parseXML(data)).find('object').length) {
                        centerMapOnPopup(featurePopup)
                      }
                    }
                    featurePopup.once('change:visible', () => {
                      this.utilitySource_.clear()
                    })
                  } else {
                    feature.set('description', feature.get('description') + this.separator_ + data)
                  }
                }
                layer.on('change:visible', () => {
                  featurePopup.setVisible(false)
                })
                for (let control of map.getControls().getArray()) {
                  if (control.getControlName() === 'areaMeasurementButton')
                  {
                    control.once('measurement:activate', () => {
                      featurePopup.setVisible(false)
                    })
                  }
                }
              })
          }
        }
      })

      map.addDefaultInteraction('singleclick', interaction)

      onMapChangeMobile()
      map.on('change:mobile', onMapChangeMobile)
    }
  }

  getMap () {
    return this.map_
  }

  addLayer (layer) {
    this.layers_.push(layer)
  }
}
