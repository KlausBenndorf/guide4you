import $ from 'jquery'

import { transformExtent } from 'ol/proj'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import ImageLayer from 'ol/layer/Image'
import { ImageStatic } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import RegularShape from 'ol/style/RegularShape'
import Fill from 'ol/style/Fill'
import Point from 'ol/geom/Point'

import { Control } from './Control'
import { VectorLayer } from '../layers/VectorLayer'

import '../../less/staticoverviewmap.less'
import Polygon from 'ol/geom/Polygon'

/**
 * @typedef {ControlOptions} StaticOverviewMapOptions
 * @property {String} url to the static picture
 * @property {Number[]} extent of the shown image
 * @property {ol.ProjectionLike} projection used
 */

export class StaticOverviewMap extends Control {
  /**
   * @param {StaticOverviewMapOptions} options
   */
  constructor (options = {}) {
    options.element = $('<div>')[0]
    options.className = options.className || 'g4u-static-overviewmap'

    super(options)

    this.doNotShowArrow_ = options.doNotShowArrow !== false

    this.$mapElement_ = $('<div>').addClass(this.getClassName() + '-map')

    this.get$Element().append(this.$mapElement_)

    this.collapsible_ = options.collapsible || true

    if (this.getCollapsible()) {
      this.get$Element()
        .append($('<button>')
          .on('click', () => this.setCollapsed(!this.getCollapsed()))
        )
    }

    this.setCollapsed(options.collapsed || false)

    this.projection = options.projection
    this.extent = options.extent
    this.url = options.url

    this.boundCalculateOrientationFeatures_ = () => this.calculateOrientationFeatures()
  }

  getCollapsible () {
    return this.collapsible_
  }

  setCollapsed (collapsed) {
    const oldValue = this.collapsed_
    if (oldValue !== collapsed) {
      this.collapsed_ = collapsed
      if (collapsed) {
        this.get$Element().addClass('ol-collapsed')
      } else {
        this.get$Element().removeClass('ol-collapsed')
        if (this.ovmap_) {
          this.ovmap_.updateSize()
          this.ovmap_.render()
        }
        this.calculateOrientationFeatures()
      }
      this.dispatchEvent({ type: 'change:collapsed', oldValue })
    }
  }

  getCollapsed () {
    return this.collapsed_
  }

  getOverviewMap () {
    return this.ovmap_
  }

  setMap (map) {
    // detach
    if (this.getMap()) {
      if (this.ovmap_) {
        this.ovmap_.un('postrender', this.boundCalculateOrientationFeatures_)
      }
      this.ovmap_ = null
      this.getMap().getView().un('change:center', this.boundCalculateOrientationFeatures_)
      this.getMap().getView().un('change:resolution', this.boundCalculateOrientationFeatures_)
    }

    super.setMap(map)

    // attach
    if (map) {
      map.asSoonAs('mobile', false, () => {
        const mapProjection = map.getView().getProjection()
        const transformedExtent = transformExtent(this.extent, this.projection, mapProjection)

        this.frame = new Feature()
        if (!this.doNotShowArrow_) {
          this.arrow = new Feature()
        }

        const fitViewToImage = () => {
          this.ovmap_.getView().fit(transformedExtent)
        }

        const setSize = (width, height) => {
          if (this.ovmap_) {
            this.$mapElement_.innerWidth(width)
            this.$mapElement_.innerHeight(height)
            this.ovmap_.updateSize()
            fitViewToImage()
          }
        }

        const features = [this.frame]
        if (!this.doNotShowArrow_) {
          features.push(this.arrow)
        }
        this.ovmap_ = new Map({
          target: this.$mapElement_[0],
          view: new View({
            projection: mapProjection,
            constrainResolution: false
          }),
          layers: [
            new ImageLayer({
              source: new ImageStatic({
                imageExtent: transformedExtent,
                url: this.url,
                imageLoadFunction: function (image, src) {
                  const $img = $(image.getImage())
                  $img.on('load', () => {
                    setSize($img.prop('width'), $img.prop('height'))
                  }).prop('src', src)
                }
              })
            }),
            new VectorLayer({
              source: new VectorSource({
                features: features
              }),
              style: new Style({
                stroke: new Stroke({
                  color: 'rgb(0,0,0)',
                  width: 2
                })
              })
            })
          ],
          interactions: [],
          controls: []
        })

        this.ovmap_.once('postrender', this.boundCalculateOrientationFeatures_)

        fitViewToImage()

        map.getView().on('change:center', this.boundCalculateOrientationFeatures_)
        map.getView().on('change:resolution', this.boundCalculateOrientationFeatures_)

        // interactivity

        let $overviewmap = this.get$Element().find('.' + this.getClassName() + '-map')

        $overviewmap = $overviewmap.add($overviewmap.find('.' + this.getClassName() + '-box'))

        let dontClick = false

        $overviewmap.on('click', e => {
          if (!dontClick) {
            map.getView().setCenter(this.getOverviewMap().getEventCoordinate(e))
          }
        })

        let mouseDown = false

        $overviewmap.on('mousedown', () => {
          dontClick = false
          mouseDown = true
        })

        $overviewmap.on('mouseup', () => {
          mouseDown = false
        })

        $overviewmap.on('mousemove', e => {
          if (mouseDown) {
            map.getView().setCenter(this.getOverviewMap().getEventCoordinate(e))
          }
        })

        this.getOverviewMap().getView().on('change:center', () => {
          mouseDown = false
          dontClick = true
        })
      })
    }
  }

  calculateOrientationFeatures () {
    if (this.getMap() && !this.getCollapsed()) {
      const extent = this.getMap().getView().calculateExtent(this.getMap().getSize())
      this.frame.setGeometry(new Polygon([[
        [extent[0], extent[1]],
        [extent[2], extent[1]],
        [extent[2], extent[3]],
        [extent[0], extent[3]],
        [extent[0], extent[1]]
      ]]))

      if (!this.doNotShowArrow_) {
        const mapCenter = this.getMap().getView().getCenter()

        const edgePoint = [mapCenter[0], extent[3]]
        const edgePointPixel = this.ovmap_.getPixelFromCoordinate(edgePoint)

        const arrowPointPixel = [edgePointPixel[0], edgePointPixel[1] - 7]

        const arrowPoint = this.ovmap_.getCoordinateFromPixel(arrowPointPixel)
        this.arrow.setGeometry(new Point(arrowPoint))

        this.arrow.setStyle(new Style({
          image: new RegularShape({
            fill: new Fill({
              color: 'rgb(0,0,0)'
            }),
            points: 3,
            radius: 5,
            stroke: new Stroke({
              width: 0,
              color: 'rgb(0,0,0)'
            }),
            rotation: 0
          })
        }))
      }
    }
  }
}
