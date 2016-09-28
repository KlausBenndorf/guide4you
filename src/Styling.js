import ol from 'openlayers'
import $ from 'jquery'

import { copyDeep, copy } from './utilitiesObject'
import { checkFor } from './utilities'
import {Debug} from './Debug'

import {parseCSSColor} from 'csscolorparser'

/**
 * @typedef {string|StyleObject|ol.style.Style} StyleLike
 */

/**
 * @typedef {Object} StyleObject
 */

/**
 * merges two style configs
 * @param {StyleObject} configTarget
 * @param {StyleObject} configSource
 * @returns {StyleObject}
 */
function mergeStyleConfigs (configTarget, configSource) {
  let mergedConf = copyDeep(configTarget)
  if (configSource) {
    for (let k of Object.keys(configSource)) {
      let sourceProp = configSource[k]

      if (configTarget.hasOwnProperty(k)) {
        let targetProp = configTarget[k]

        if (typeof targetProp === 'object' && !(targetProp instanceof Array)) {
          // if it is another object, merge recursively
          let targetProp = configTarget[k]

          if (targetProp.hasOwnProperty('type')) {
            if (sourceProp.hasOwnProperty('type')) {
              if (configTarget[k].type === sourceProp.type) {
                mergedConf[k] = mergeStyleConfigs(targetProp, sourceProp)
              }
            }
          } else {
            mergedConf[k] = mergeStyleConfigs(targetProp, sourceProp)
          }
        }
      } else {
        // copy over if it doesn't exist in the target
        if (typeof sourceProp === 'object' && !(sourceProp instanceof Array)) {
          mergedConf[k] = copyDeep(sourceProp)
        } else {
          mergedConf[k] = sourceProp
        }
      }
    }
  }
  return mergedConf
}

/**
 * This class coordinates the styling.
 */
export class Styling {
  /**
   * @param {Object} [options]
   * @param {Object} [options.styleConfigMap]
   * @param {number} [options.globalIconScale]
   */
  constructor (options = {}) {
    /**
     * @type {Map.<string,StyleObject>}
     * @private
     */
    this.styleConfigMap_ = new Map()

    if (!this.styleConfigMap_.has('#defaultStyle')) {
      // FallbackStyle
      this.styleConfigMap_.set('#defaultStyle', {
        'stroke': {
          'color': 'rgba(0,0,0,0.9)',
          'width': 2
        },
        'fill': {
          'color': 'rgba(0,0,0,0.3)'
        },
        'image': {
          'type': 'circle',
          'stroke': {
            'color': 'rgba(0,0,0,0.9)',
            'width': 2
          },
          'fill': {
            'color': 'rgba(0,0,0,0.3)'
          }
        }
      })
    }

    if (options.styleConfigMap) {
      for (let k of Object.keys(options.styleConfigMap)) {
        this.styleConfigMap_.set(k, options.styleConfigMap[k])
      }
    }

    /**
     * @type {Map.<string,ol.style.Style>}
     * @private
     */
    this.styleMap_ = new Map()

    /**
     * @type {Set.<ol.style.Style>}
     * @private
     */
    this.allStyles_ = new Set()

    if (options.globalIconScale) {
      this.setGlobalIconScale(options.globalIconScale)
    }
  }

  /**
   * @param {ol.style.Style} style
   */
  saveStyle (style) {
    this.allStyles_.add(style)
    style.saved = true
  }

  /**
   * Runs a callback on each saved style
   * @param cb
   */
  forEachStyle (cb) {
    this.allStyles_.forEach(cb)
  }

  /**
   * @param {number} scale
   */
  setGlobalIconScale (scale) {
    /**
     * @type {number}
     * @private
     */
    this.globalIconScale_ = scale
  }

  /**
   * @returns {number}
   */
  getGlobalIconScale () {
    return this.globalIconScale_
  }

  /**
   * @param {StyleObject} styleConf
   * @returns {ol.style.Style}
   */
  getStyleFromConfig (styleConf) {
    let filledStyleConf = mergeStyleConfigs(styleConf, this.styleConfigMap_.get('#default'))

    function addFillsAndStrokes (subStyleConf) {
      subStyleConf = subStyleConf || {}
      let preparedOptions = copy(subStyleConf)

      if (checkFor(subStyleConf, 'fill')) {
        preparedOptions.fill = new ol.style.Fill(mergeStyleConfigs(subStyleConf.fill, filledStyleConf.fill))
      } else {
        preparedOptions.fill = new ol.style.Fill(filledStyleConf.fill)
      }

      if (checkFor(subStyleConf, 'stroke')) {
        preparedOptions.stroke = new ol.style.Stroke(mergeStyleConfigs(subStyleConf.stroke, filledStyleConf.stroke))
      } else {
        preparedOptions.stroke = new ol.style.Stroke(filledStyleConf.stroke)
      }

      return preparedOptions
    }

    let styleOptions = addFillsAndStrokes(filledStyleConf)

    styleOptions.text = new ol.style.Text(addFillsAndStrokes(filledStyleConf.text))

    let scalable = false

    if (filledStyleConf.hasOwnProperty('image')) {
      if (filledStyleConf.image.type === 'icon' &&
        (filledStyleConf.image.hasOwnProperty('src')) && filledStyleConf.image.src) {
        styleOptions.image = new ol.style.Icon(filledStyleConf.image)
        scalable = true
      } else if (filledStyleConf.image.type === 'circle') {
        styleOptions.image = new ol.style.Circle(addFillsAndStrokes(filledStyleConf.image))
        scalable = true
      } else if (filledStyleConf.image.type === 'regularShape') {
        styleOptions.image = new ol.style.RegularShape(addFillsAndStrokes(filledStyleConf.image))
        scalable = true
      }

      if (scalable) {
        styleOptions.image.setScale((styleOptions.image.getScale() || 1) * this.getGlobalIconScale())
      }
    }

    let style = new ol.style.Style(styleOptions)

    this.saveStyle(style)

    return style
  }

  getConfigFromStyle (style) {
    throw new Error('Not implemented yet')
  }

  /**
   * @param {string} id
   * @returns {ol.style.Style}
   */
  getStyleById (id) {
    if (!this.styleMap_.has(id)) {
      if (this.styleConfigMap_.has(id)) {
        this.styleMap_.set(id, this.getStyleFromConfig(this.getConfigById(id)))
      } else {
        Debug.error('No style found for id ' + id + '. Using default style.')
        return this.styleMap_.get('#defaultStyle')
      }
    }
    return this.styleMap_.get(id)
  }

  /**
   * @param {string} id
   * @returns {StyleObject}
   */
  getConfigById (id) {
    if (this.styleConfigMap_.has(id)) {
      return this.styleConfigMap_.get(id)
    } else {
      Debug.error('No style config found for id ' + id + '. Using default style.')
      return this.styleConfigMap_.get('#defaultStyle')
    }
  }

  /**
   * @param {StyleLike} data
   * @returns {ol.style.Style}
   */
  getStyle (data) {
    if (data === undefined) {
      return this.getStyleById('#defaultStyle')
    } else if (data instanceof ol.style.Style || $.isFunction(data)) {
      return data
    } else if (typeof data === 'object') {
      return this.getStyleFromConfig(data)
    } else {
      return this.getStyleById(data)
    }
  }

  /**
   * adjust the styles opacity by a given value
   * @param {ol.style.Style} style
   * @param {number} opacity between 0 and 1
   * @returns {ol.style.Style}
   */
  adjustColorOpacity (style, opacity) {
    let adjustColor = (style, opacity) => {
      let color = style.getColor()
      if (color !== null) {
        if (!(color instanceof Array)) {
          if (typeof color === 'string') {
            color = parseCSSColor(color)
          } else {
            throw new Error('Type not supported')
          }
        }

        color[3] = color[3] * opacity
      }
      style.setColor(color)
    }

    if (style.getImage()) {
      style.getImage().setOpacity(opacity)
    }
    if (style.getFill()) {
      adjustColor(style.getFill(), opacity)
    }
    if (style.getStroke()) {
      adjustColor(style.getStroke(), opacity)
    }
    if (style.getText()) {
      if (style.getText().getFill()) {
        adjustColor(style.getText().getFill(), opacity)
      }
      if (style.getText().getStroke()) {
        adjustColor(style.getText().getStroke(), opacity)
      }
    }

    return style
  }

  /**
   * style a feature
   * @param {ol.Feature} feature
   * @param {StyleLike} styleData
   */
  styleFeature (feature, styleData) {
    let style
    if (styleData) {
      style = this.getStyle(styleData)
    } else {
      style = this.getStyle('#defaultStyle')
    }

    let fStyle = feature.getStyleFunction()

    let thisRef = this // needed

    let styleFunction = function (resolution) {
      let stylePrimitive

      if ($.isFunction(style)) {
        stylePrimitive = style.call(this, resolution)[0]
      } else {
        stylePrimitive = style
      }

      // what happens if the styleFunction returns the ol default style (worst case scenario)?
      if (fStyle) {
        let curStyles = fStyle.call(this, resolution)
        if (curStyles && curStyles.length > 0) {
          curStyles.forEach(function (curStyle) {
            // adjust icon Scale
            if (curStyle.getImage()) {
              curStyle.getImage().setScale(stylePrimitive.getImage().getScale())
            }
            if (!curStyle.saved) {
              thisRef.saveStyle(curStyle)
            }
          })
          stylePrimitive = curStyles[0]
        }
      }
      return [stylePrimitive]
    }

    if (fStyle !== styleFunction) { // this does not seem to work, the function gets applied multiple times somehow.
      feature.setStyle(styleFunction)
    }
  }

  /**
   * converts ol.StyleFunction to ol.FeatureStyleFunction
   * @param {ol.style.StyleFunction} styleFunction
   * @returns {ol.FeatureStyleFunction}
   */
  convertStyleFunction (styleFunction) {
    return function (resolution) { return styleFunction(this, resolution) }
  }

  /**
   * style a layer
   * @param {VectorLayer} layer
   * @param {StyleLike} styleData
   */
  styleLayer (layer, styleData) {
    let style
    if (styleData) {
      style = this.getStyle(styleData)
    } else {
      style = this.getStyle('#defaultStyle')
    }

    if ($.isFunction(style)) {
      style = this.convertStyleFunction(style)
    }

    layer.getSource().getFeatures().forEach(feature => {
      this.styleFeature(feature, style)
    })

    layer.getSource().on('addfeature', e => {
      this.styleFeature(e.feature, style)
    })

    layer.setStyle((feature, resolution) => {
      if (feature.getStyleFunction() !== undefined) {
        return feature.getStyleFunction().call(feature, resolution)
      } else {
        return feature.getStyle()
      }
    })
  }

  /**
   * style a collection
   * @param {ol.Collection} collection
   * @param {StyleLike} styleData
   */
  styleCollection (collection, styleData) {
    let style
    if (styleData) {
      style = this.getStyle(styleData)
    } else {
      style = this.getStyle('#defaultStyle')
    }

    if ($.isFunction(style)) {
      style = this.convertStyleFunction(style)
    }

    collection.forEach(feature => {
      this.styleFeature(feature, style)
    })

    collection.on('add', /** ol.CollectionEvent */ e => {
      this.styleFeature(e.element, style)
    })
  }

  /**
   * @param {ol.style.Fill} fill
   * @returns {ol.style.Fill}
   */
  cloneFill (fill) {
    if (fill) {
      return new ol.style.Fill({
        color: fill.getColor()
      })
    }
  }

  /**
   * @param {ol.style.Stroke} stroke
   * @returns {ol.style.Stroke}
   */
  cloneStroke (stroke) {
    if (stroke) {
      return new ol.style.Stroke({
        color: stroke.getColor(),
        lineCap: stroke.getLineCap(),
        lineJoin: stroke.getLineJoin(),
        lineDash: stroke.getLineDash(),
        miterLimit: stroke.getMiterLimit(),
        width: stroke.getWidth()
      })
    }
  }

  /**
   * @param {ol.style.Style} style
   * @returns {ol.style.Style}
   */
  cloneStyle (style) {
    let image
    if (style.getImage()) {
      if (style.getImage() instanceof ol.style.Icon) {
        image = new ol.style.Icon({
          anchor: style.getImage().getAnchor(),
          anchorOrigin: style.getImage().getOrigin(),
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          img: style.getImage().getImage(),
          imgSize: [style.getImage().getImage().width, style.getImage().getImage().height],
          size: style.getImage().getSize(),
          opacity: style.getImage().getOpacity(),
          scale: style.getImage().getScale(),
          snapToPixel: style.getImage().getSnapToPixel(),
          rotation: style.getImage().getRotation(),
          rotateWithView: style.getImage().getRotateWithView()
        })

        image.setRotation(style.getImage().getRotation())
      } else if (style.getImage() instanceof ol.style.Circle) {
        image = new ol.style.Circle({
          fill: this.cloneFill(style.getImage().getFill()),
          radius: style.getImage().getRadius(),
          snapToPixel: style.getImage().getSnapToPixel(),
          stroke: this.cloneStroke(style.getImage().getStroke())
        })

        image.setOpacity(style.getImage().getOpacity())
        image.setRotation(style.getImage().getRotation())
        image.setScale(style.getImage().getScale())
      } else if (style.getImage() instanceof ol.style.RegularShape) {
        let radius, radius1, radius2

        if (style.getImage().getRadius2()) {
          radius1 = style.getImage().getRadius()
          radius2 = style.getImage().getRadius2()
        } else {
          radius = style.getImage().getRadius()
        }

        image = new ol.style.RegularShape({
          fill: this.cloneFill(style.getImage().getFill()),
          points: style.getImage().getPoints(),
          radius: radius,
          radius1: radius1,
          radius2: radius2,
          angle: style.getImage().getAngle(),
          snapToPixel: style.getImage().getSnapToPixel(),
          stroke: this.cloneStroke(style.getImage().getStroke()),
          rotation: style.getImage().getRotation(),
          rotateWithView: style.getImage().getRotateWithView()
        })

        image.setOpacity(style.getImage().getOpacity())
        image.setRotation(style.getImage().getRotation())
        image.setScale(style.getImage().getScale())
      }
    }

    let text
    if (style.getText()) {
      text = new ol.style.Text({
        font: style.getText().getFont(),
        offsetX: style.getText().getOffsetX(),
        offsetY: style.getText().getOffsetY(),
        scale: style.getText().getScale(),
        rotation: style.getText().getRotation(),
        text: style.getText().getText(),
        textAlign: style.getText().getTextAlign(),
        textBaseline: style.getText().getTextBaseline(),
        fill: this.cloneFill(style.getText().getFill()),
        stroke: this.cloneStroke(style.getText().getStroke())
      })
    }

    return new ol.style.Style({
      geometry: style.getGeometry(),
      fill: this.cloneFill(style.getFill()),
      image: image,
      stroke: this.cloneStroke(style.getStroke()),
      text: text,
      zIndex: style.getZIndex()
    })
  }
}
