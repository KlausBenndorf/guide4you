import Collection from 'ol/Collection'
import WKT from 'ol/format/WKT'
import LineString from 'ol/geom/LineString'
import { fromCircle } from 'ol/geom/Polygon'
import Draw, { createBox } from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { getLength } from 'ol/sphere'
import CircleStyle from 'ol/style/Circle'
import Style from 'ol/style/Style'
import { Debug } from '../Debug'
import { take } from '../utilitiesObject'

export class GeometryAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map

    this.lastId_ = 0
    this.wktParser_ = new WKT()
  }

  drawGeometry (type, options = {}) {
    this.mainAPI_.cancelInteractions()

    const collection = new Collection()
    const style = this.map_.get('styling').getStyle(take(options, 'style') || this.mainAPI_.getDrawStyle())
    // this.map_.get('styling').manageFeatureCollection(collection)
    const cursorRadius = take(options, 'cursorRadius') || 0
    const cssCursor = take(options, 'cssCursor') || 'crosshair'
    const showCircleRadius = take(options, 'showCircleRadius')
    const format = take(options, 'format') || 'wkt'
    const projection = take(options, 'projection') || this.map_.getView().getProjection()

    let sketchFeature

    const textStyle = style.getText().clone()
    let cursorStyle
    if (cursorRadius > 0) {
      if (!(style.getImage() instanceof CircleStyle)) {
        Debug.error('Cursor radius can only be used with image style type "circle"')
      }
      cursorStyle = style.clone()
      cursorStyle.getImage().setRadius(cursorRadius)
    }

    const drawOptions = Object.assign({}, options, {
      features: collection
    })

    if (type === 'Box') {
      drawOptions.type = 'Circle'
      drawOptions.geometryFunction = createBox()
    } else {
      drawOptions.type = type
    }

    if (type === 'Circle' && showCircleRadius) {
      drawOptions.style = feature => {
        if (feature === sketchFeature) {
          return style
        } else if (sketchFeature !== undefined) {
          const line = new LineString([
            sketchFeature.getGeometry().getCenter(),
            feature.getGeometry().getCoordinates()
          ])
          const length = getLength(line, { projection: this.map_.getView().getProjection() }).toFixed(0)
          textStyle.setText(`${length} m`)
          return new Style({
            geometry: line,
            stroke: style.getStroke(),
            text: textStyle
          })
        } else {
          return cursorStyle
        }
      }
    } else {
      drawOptions.style = feature => {
        if (feature === sketchFeature) {
          return style
        } else {
          return cursorStyle
        }
      }
    }

    const interaction = new Draw(drawOptions)

    interaction.on('drawstart', e => {
      sketchFeature = e.feature
    })

    this.map_.addSupersedingInteraction('singleclick dblclick pointermove', interaction)

    const oldCursor = this.map_.getViewport().style.cursor
    this.map_.getViewport().style.cursor = cssCursor

    return new Promise(resolve => {
      this.mainAPI_.once('cancelInteractions', () => {
        if (interaction.getActive()) {
          interaction.setActive(false)
          this.map_.removeInteraction(interaction)
          this.map_.getViewport().style.cursor = oldCursor
          resolve(null)
        }
      })
      interaction.on('drawend', e => {
        interaction.setActive(false)
        this.map_.removeInteraction(interaction)
        this.map_.getViewport().style.cursor = oldCursor
        let geom = e.feature.getGeometry()
        if (type === 'Circle') {
          geom = fromCircle(geom)
        }
        switch (format) {
          case 'wkt':
            resolve(this.wktParser_.writeGeometry(geom, {
              dataProjection: projection,
              featureProjection: this.map_.getView().getProjection()
            }))
            break
          case 'array':
            geom = geom.transform(this.map_.getView().getProjection(), projection)
            resolve(geom.getCoordinates())
            break
        }
      })
    })
  }

  showGeometry (geometryWKT, options = {}) {
    const styling = this.map_.get('styling')
    if (!this.geometrySource_) {
      this.geometrySource_ = new VectorSource()
      this.map_.addLayer(new VectorLayer({
        source: this.geometrySource_,
        style: styling.getStyle('#defaultStyle')
      }))
      this.modifyCollection_ = new Collection()

      styling.manageFeatureCollection(this.modifyCollection_)

      this.modifyGeometryInteraction_ = new Modify({
        features: this.modifyCollection_,
        style: styling.getStyle(this.mainAPI_.getDrawStyle())
      })
      this.map_.addDefaultInteraction('singleclick', this.modifyGeometryInteraction_)
      this.modifyGeometryInteraction_.setActive(true)
    }

    const id = ++this.lastId_
    const feature = this.wktParser_.readFeature(geometryWKT, {
      dataProjection: options.projection || this.map_.get('interfaceProjection'),
      featureProjection: this.map_.get('mapProjection')
    })
    feature.setId(id)
    if (options.style) {
      feature.setStyle(styling.getStyle(options.style))
    }

    let target = this.geometrySource_
    if (options.target !== undefined) {
      const layer = this.map_.getLayerGroup().getLayerById(options.target)
      if (layer === undefined) {
        Debug.error(`No layer with id ${options.target} found.`)
      } else if (!layer.getSource || !(layer.getSource() instanceof VectorSource)) {
        Debug.error('The layer has to be a VectorLayer (KML, GeoJSON, Intern)')
      } else {
        target = layer.getSource()
      }
    }

    target.addFeature(feature)

    if (options.modifiable) {
      this.modifyCollection_.add(feature)
    }

    return id
  }

  getGeometry (id) {
    return this.wktParser_.writeFeature(this.geometrySource_.getFeatureById(id))
  }

  hideGeometry (id) {
    this.geometrySource_.removeFeature(this.geometrySource_.getFeatureById(id))
  }

  clear () {
    if (this.geometrySource_) {
      this.geometrySource_.clear()
    }
  }

  getExtent () {
    return this.geometrySource_.getExtent()
  }
}
