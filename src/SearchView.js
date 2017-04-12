import ol from 'openlayers'
import {VectorLayer} from 'guide4you/src/layers/VectorLayer'

/**
 * @typedef {Object} SearchViewOptions
 * @property {StyleLike} [style] of the search results
 */

export class SearchView {

  /**
   * @param {SearchViewOptions} options
   */
  constructor (options) {
    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || {}

    /**
     * the searchresults stored as features
     * @type {ol.Feature[]}
     * @private
     */
    this.features_ = []

    /**
     * this layer is shown under the normal VectorLayers. Intended for polygons and lines.
     * @type {?VectorLayer}
     * @private
     */
    this.searchlayerBottom_ = null

    /**
     * this layer is shown above the normal VectorLayers. Intended for points.
     * @type {?VectorLayer}
     * @private
     */
    this.searchlayerTop_ = null
  }

  setMap (map) {
    if (this.getMap()) {
      this.getMap().getLayers().remove(this.searchlayerBottom_)
      this.getMap().getLayers().remove(this.searchlayerTop_)
    }

    this.map_ = map

    if (map) {
      this.searchlayerBottom_ = new VectorLayer({
        source: new ol.source.Vector({
          projection: map.getView().getProjection()
        })
      })
      map.getLayers().insertAt(1, this.searchlayerBottom_)
      map.get('styling').styleLayer(this.searchlayerBottom_, this.style_)

      this.searchlayerTop_ = new VectorLayer({
        source: new ol.source.Vector({
          projection: map.getView().getProjection()
        })
      })
      map.addLayer(this.searchlayerTop_)
      map.get('styling').styleLayer(this.searchlayerTop_, this.style_)
    }
  }

  getMap () {
    return this.map_
  }

  /**
   * @private
   */
  centerOnSearchlayer () {
    if (this.searchlayerBottom_.getVisible()) {
      let extent = ol.extent.extend(
        this.searchlayerBottom_.getSource().getExtent(),
        this.searchlayerTop_.getSource().getExtent()
      )

      if (!ol.extent.isEmpty(extent)) {
        this.getMap().get('move').toExtent(extent, { animated: this.animated_, padding: 'default' })
      }
    }
  }

  getFeatures () {
    return this.features_
  }

  /**
   * @param {ol.Feature[]} features
   */
  showSearchResults (features) {
    if (features.length === 1 && !this.getMap().get('mobile')) {
      // exact search result
      let featurePopup = this.getMap().get('featurePopup')
      featurePopup.setFeature(features[0])
      featurePopup.setVisible(true, false)
      featurePopup.update(false)
      featurePopup.centerMapOnPopup()
    } else {
      // fuzzy search result
      this.centerOnSearchlayer()
    }

    let sourceBottom = this.searchlayerBottom_.getSource()
    sourceBottom.clear()

    let sourceTop = this.searchlayerTop_.getSource()
    sourceTop.clear()

    features.forEach(function (feature) {
      if (feature.getGeometry()) {
        if (feature.getGeometry() instanceof ol.geom.Point || feature.getGeometry() instanceof ol.geom.MultiPoint) {
          sourceTop.addFeature(feature)
        } else {
          sourceBottom.addFeature(feature)
        }
      }
    })

    this.searchlayerBottom_.setVisible(true)
    this.searchlayerTop_.setVisible(true)
  }

  hideSearchResults () {
    if (this.searchlayerBottom_) {
      this.searchlayerBottom_.setVisible(false)
    }

    if (this.searchlayerTop_) {
      this.searchlayerTop_.setVisible(false)
    }
  }
}
