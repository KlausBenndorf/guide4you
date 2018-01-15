import ol from 'openlayers'
import $ from 'jquery'

import { VectorLayer } from './layers/VectorLayer'
import { MapEventInteraction } from './interactions/MapEventInteraction'
import { FeaturePopup } from './FeaturePopup'
import { cssClasses } from './globals'

/**
 * @typedef {Object} ShowWMSFeatureInfoOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {String} [seperator='<br>']
 * @property {String[]} [popupModifiers=[]]
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

    this.popupModifiers_ = options.popupModifiers || []
  }

  handleClickEvent (e) {
    let map = this.getMap()
    let featurePopup = map.get('featurePopup')
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
                  [...this.popupModifiers_, ...layer.getSource().getFeatureInfoMutators()])
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

  layerQueryable (layer) {
    return this.layers_.some(l => {
      return l.getVisible() &&
        this.layers_.indexOf(layer) > -1 &&
        layer.getSource().getQueryable()
    })
  }

  handlePointerMoveEvent (e) {
    let map = this.getMap()
    if (!map.forEachFeatureAtPixel(e.mapEvent.pixel, FeaturePopup.canDisplay, {hitTolerance: 5})) {
      let featureTooltip = map.get('featureTooltip')
      this.lastTooltipPixel_ = e.pixel

      if (map.forEachLayerAtPixel(e.mapEvent.pixel, layer => this.layerQueryable(layer))) {
        clearTimeout(this.tooltipTimeout_)
        $(map.getViewport()).addClass(cssClasses.clickable)
        this.tooltipTimeout_ = setTimeout(() => {
          if (e.pixel === this.lastTooltipPixel_) {
            let projection = map.getView().getProjection()
            let coordinate = e.mapEvent.coordinate
            let feature
            map.forEachLayerAtPixel(e.mapEvent.pixel, layer => {
              if (this.layerQueryable(layer)) {
                layer.getSource().getFeatureInfo(coordinate, map.getView().getResolution(), projection)
                  .then(data => {
                    if (data !== '') {
                      if (!feature) {
                        feature = new ol.Feature({
                          geometry: new ol.geom.Point(coordinate),
                          description: data
                        })
                        featureTooltip.setFeature(feature, coordinate,
                          [...this.popupModifiers_, ...layer.getSource().getFeatureInfoMutators()])
                      } else {
                        feature.set('description', feature.get('description') + this.separator_ + data)
                      }
                      this.shouldHide_ = true
                    }
                    layer.on('change:visible', () => {
                      featureTooltip.setFeature(null)
                    })
                  })
              }
            })
          }
        }, 200)
      } else {
        if (this.shouldHide_) {
          featureTooltip.setFeature(null)
        }
        $(map.getViewport()).removeClass(cssClasses.clickable)
      }
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

      let interaction = new MapEventInteraction({type: 'singleclick'})
      interaction.on('mapevent', e => this.handleClickEvent(e))

      map.addDefaultInteraction('singleclick', interaction)

      let hoverInteraction = new MapEventInteraction({type: 'pointermove'})
      hoverInteraction.on('mapevent', e => this.handlePointerMoveEvent(e))

      map.addDefaultInteraction('pointermove', hoverInteraction)

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
