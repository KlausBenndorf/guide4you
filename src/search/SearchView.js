import { Vector as VectorSource } from 'ol/source'
import { extend, isEmpty } from 'ol/extent'
import Point from 'ol/geom/Point'
import MultiPoint from 'ol/geom/MultiPoint'

import { VectorLayer } from '../layers/VectorLayer'

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
      this.olStyle_ = map.get('styling').getStyle(this.style_)

      this.searchlayerBottom_ = new VectorLayer({
        source: new VectorSource({
          projection: map.getView().getProjection()
        })
      })
      map.getLayers().insertAt(1, this.searchlayerBottom_)
      this.searchlayerBottom_.setStyle(this.olStyle_)
      map.get('styling').manageLayer(this.searchlayerBottom_)

      this.searchlayerTop_ = new VectorLayer({
        source: new VectorSource({
          projection: map.getView().getProjection()
        })
      })
      map.addLayer(this.searchlayerTop_)
      this.searchlayerTop_.setStyle(this.olStyle_)
      map.get('styling').manageLayer(this.searchlayerTop_)
    }
  }

  getMap () {
    return this.map_
  }

  getStyle () {
    return this.olStyle_
  }

  /**
   * @private
   */
  centerOnSearchlayer () {
    if (this.searchlayerBottom_.getVisible()) {
      let extent = extend(
        this.searchlayerBottom_.getSource().getExtent(),
        this.searchlayerTop_.getSource().getExtent()
      )

      if (!isEmpty(extent)) {
        this.getMap().get('move').toExtent(extent, { animated: this.animated_ })
      }
    }
  }

  getFeatures () {
    return this.searchlayerBottom_.getSource().getFeatures().concat(
      this.searchlayerTop_.getSource().getFeatures()
    )
  }

  /**
   * @param {ol.Feature[]} features
   */
  showSearchResults (features) {
    let sourceBottom = this.searchlayerBottom_.getSource()
    sourceBottom.clear()

    let sourceTop = this.searchlayerTop_.getSource()
    sourceTop.clear()

    features.forEach(function (feature) {
      if (feature.getGeometry()) {
        if (feature.getGeometry() instanceof Point || feature.getGeometry() instanceof MultiPoint) {
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
