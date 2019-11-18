import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { unByKey } from 'ol/Observable'
import VectorSource from 'ol/source/Vector'
import { FeaturePopup } from './FeaturePopup'
import { MapEventInteraction } from './interactions/MapEventInteraction'

import { VectorLayer } from './layers/VectorLayer'

/**
 * @typedef {Object} ShowWMSFeatureInfoOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {String} [seperator='<br>']
 * @property {String} [showClickable='layerAtPixel'] can be 'everywhere', 'layerAtPixel' or 'nowhere'
 * @property {boolean} [animated]
 */

export class ShowWMSFeatureInfo {
  /**
   * @param {ShowWMSFeatureInfoOptions} [options={}]
   */
  constructor (options = {}) {
    this.separator_ = options.hasOwnProperty('seperator') ? options.seperator : '<br>'
    this.styleConf_ = options.style || '#defaultStyle'

    this.animated_ = options.animated
    this.centerOnPopup_ = options.hasOwnProperty('centerOnPopup') ? options.centerOnPopup : true
    this.showClickable_ = options.hasOwnProperty('showClickable') ? options.showClickable : 'layerAtPixel'
    // this.centerIfNoData_ = this.centerOnPopup_ && options.hasOwnProperty('centerIfNoData')
    //   ? options.centerIfNoData : false

    this.centerOnPopupInitial_ = this.centerOnPopup_
  }

  handleClickEvent (e) {
    let map = this.getMap()

    let projection = map.getView().getProjection()

    let layers = this.layers_.filter(l => l.getVisible())

    let shouldShow = map.forEachLayerAtPixel(e.mapEvent.pixel, layer => layers.indexOf(layer) > -1) &&
      !map.forEachFeatureAtPixel(e.mapEvent.pixel, FeaturePopup.canDisplay)

    if (shouldShow) {
      let coordinate = e.mapEvent.coordinate
      this.utilitySource_.clear()
      let feature
      for (let layer of layers) {
        layer.getSource().getFeatureInfo(coordinate, map.getView().getResolution(), projection)
          .then(data => this.handleData(feature, coordinate, layer, data))
      }
    }
  }

  handleData (feature, coordinate, layer, data) {
    if (data !== '') {
      let featurePopup = this.getMap().get('featurePopup')
      if (!feature) {
        this.utilitySource_.clear()
        feature = new Feature({
          geometry: new Point(coordinate),
          description: data,
          style: this.style_
        })
        this.getMap().get('styling').manageFeature(feature)
        this.utilitySource_.addFeature(feature)

        featurePopup.setFeature(feature, layer, this.style_, coordinate)
        featurePopup.setVisible(true)

        this.setPointVisible(true)
        if (this.centerOnPopup_) {
          featurePopup.centerMapOnPopup(this.animated_)
        }
        featurePopup.once('change:visible', () => this.setPointVisible(false))
      } else {
        feature.set('description', feature.get('description') + this.separator_ + data)
      }
      layer.on('change:visible', () => {
        featurePopup.setVisible(false)
      })
    }
  }

  layerQueryable (layer) {
    return this.layers_.some(l => {
      return l.getVisible() &&
        this.layers_.indexOf(layer) > -1 &&
        layer.getSource().getQueryable()
    })
  }

  clickableFilter (e) {
    if (this.showClickable_ === 'everywhere') {
      return true
    } else if (this.showClickable_ === 'layerAtPixel') {
      return this.getMap().forEachLayerAtPixel(e.pixel, layer => this.layerQueryable(layer))
    } else {
      return false
    }
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
    }

    this.map_ = map
    if (map) {
      this.style_ = map.get('styling').getStyle(this.styleConf_)

      this.utilitySource_ = new VectorSource()
      this.utilityLayer_ = new VectorLayer({
        visible: false,
        source: this.utilitySource_
      })
      map.addLayer(this.utilityLayer_)

      this.layers_ = []

      let interaction = new MapEventInteraction({ type: 'singleclick' })
      interaction.on('mapevent', e => this.handleClickEvent(e))

      map.addDefaultInteraction('singleclick', interaction)

      map.get('clickableInteraction').addFilter(e => this.clickableFilter(e))

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
