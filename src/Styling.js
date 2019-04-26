import $ from 'jquery'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import RegularShape from 'ol/style/RegularShape'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'

import { copyDeep, copy } from './utilitiesObject'
import { checkFor } from './utilities'
import { Debug } from './Debug'

import { parseCSSColor } from 'csscolorparser'

import { isFunction, isObject, isArray } from 'lodash/lang'

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
   * @param {number} [options.scaleIcons]
   * @param {boolean} [options.manageStyles=true]
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

    if (options.scaleIcons) {
      this.setGlobalIconScale(options.scaleIcons)
    }

    /**
     * @param {ol.Feature} feature
     * @param {number} resolution
     * @returns {*}
     * @private
     */
    this.managingFeatureStyle_ = (feature, resolution) => {
      let style = feature.get('managedStyle')
      if ($.isFunction(style)) {
        style = style(feature, resolution)
      }
      if (!style) {
        style = this.getStyle('#defaultStyle')
      }
      if (isArray(style)) {
        return style.map(s => this.adjustStyle_(feature, s))
      } else {
        return this.adjustStyle_(feature, style)
      }
    }

    this.nullStyle_ = new Style({
      image: null
    })

    this.manageStyles_ = options.manageStyles !== false
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
    return this.globalIconScale_ || 1
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
        preparedOptions.fill = new Fill(mergeStyleConfigs(subStyleConf.fill, filledStyleConf.fill))
      } else {
        preparedOptions.fill = new Fill(filledStyleConf.fill)
      }

      if (checkFor(subStyleConf, 'backgroundFill')) {
        preparedOptions.backgroundFill =
          new Fill(mergeStyleConfigs(subStyleConf.backgroundFill, filledStyleConf.backgroundFill))
      }

      if (checkFor(subStyleConf, 'stroke')) {
        preparedOptions.stroke = new Stroke(mergeStyleConfigs(subStyleConf.stroke, filledStyleConf.stroke))
      } else {
        preparedOptions.stroke = new Stroke(filledStyleConf.stroke)
      }

      if (checkFor(subStyleConf, 'backgroundStroke')) {
        preparedOptions.backgroundStroke =
          new Stroke(mergeStyleConfigs(subStyleConf.backgroundStroke, filledStyleConf.backgroundStroke))
      }

      return preparedOptions
    }

    let styleOptions = addFillsAndStrokes(filledStyleConf)

    styleOptions.text = new Text(addFillsAndStrokes(filledStyleConf.text))

    let scalable = false

    if (filledStyleConf.hasOwnProperty('image')) {
      if (filledStyleConf.image.type === 'icon' &&
        (filledStyleConf.image.hasOwnProperty('src')) && filledStyleConf.image.src) {
        styleOptions.image = new Icon(filledStyleConf.image)
        scalable = true
      } else if (filledStyleConf.image.type === 'circle') {
        styleOptions.image = new Circle(addFillsAndStrokes(filledStyleConf.image))
        scalable = true
      } else if (filledStyleConf.image.type === 'regularShape') {
        styleOptions.image = new RegularShape(addFillsAndStrokes(filledStyleConf.image))
        scalable = true
      }

      if (scalable) {
        styleOptions.image.setScale((styleOptions.image.getScale() || 1) * this.getGlobalIconScale())
      }
    }

    return new Style(styleOptions)
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
        Debug.warn('No style found for id ' + id + '. Using default style.')
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
      Debug.warn('No style config found for id ' + id + '. Using default style.')
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
    } else if (data instanceof Style || isFunction(data)) {
      return data
    } else if (isArray(data)) {
      return data.map(d => this.getStyle(d))
    } else if (isObject(data)) {
      if (data.hasOwnProperty('conditional')) {
        return this.getConditionalStyleFromConfig(data.conditional)
      } else {
        return this.getStyleFromConfig(data)
      }
    } else {
      return this.getStyleById(data)
    }
  }

  /**
   * This internal method is called to adjust each style to current global and feature settings
   * @param feature
   * @param style
   * @returns {ol.style.Style}
   * @private
   */
  adjustStyle_ (feature, style) {
    if (!feature.get('hidden')) {
      let clone = style.clone()
      this.scaleStyle_(clone)
      if (feature.get('opacity') !== undefined) {
        this.changeColorOpacity_(clone, feature.get('opacity'))
      }
      return clone
    } else {
      return this.nullStyle_
    }
  }

  /**
   * This method adjusts the scale of a style
   * @param style
   * @private
   */
  scaleStyle_ (style) {
    let image = style.getImage()
    if (image) {
      let origScale = style.getImage().getScale() || 1
      image.setScale(origScale * this.getGlobalIconScale())
    }
  }

  /**
   * adjust the styles opacity by a given value
   * @param {ol.style.Style} style
   * @param {number} opacity between 0 and 1
   * @returns {ol.style.Style}
   */
  changeColorOpacity_ (style, opacity) {
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
  }

  manageFeature (feature) {
    if (this.manageStyles_) {
      let style = feature.getStyle()
      if (style && !feature.get('managedStyle')) {
        feature.set('managedStyle', style)
        feature.setStyle(this.managingFeatureStyle_)
      }
    }
  }

  manageFeatureCollection (collection) {
    if (this.manageStyles_) {
      collection.forEach(feature => {
        this.manageFeature(feature)
      })

      collection.on('add', e => {
        this.manageFeature(e.element)
      })
    }
  }

  manageLayer (layer) {
    if (this.manageStyles_) {
      let style = layer.getStyle()

      if (style && !layer.get('managedStyle')) {
        layer.set('managedStyle', layer.getStyle())

        layer.setStyle((feature, resolution) => {
          let style = layer.get('managedStyle')
          if ($.isFunction(style)) {
            style = style(feature, resolution)
          }
          if (!style) {
            style = this.getStyle('#defaultStyle')
          }
          if (isArray(style)) {
            return style.map(s => this.adjustStyle_(feature, s))
          } else {
            return this.adjustStyle_(feature, style)
          }
        })
      }

      layer.getSource().getFeatures().forEach(feature => {
        this.manageFeature(feature)
      })

      layer.getSource().on('addfeature', e => {
        this.manageFeature(e.feature)
      })
    }
  }

  getConditionalStyleFromConfig (configArr) {
    const styles = configArr.map(o => this.getStyle(o.style))
    return (feature, resolution) => {
      for (let i = 0; i < configArr.length; i++) {
        if (!configArr[i]['condition']) {
          return styles[i]
        }
        const cond = configArr[i]['condition']
        switch (cond[1]) {
          case '=':
            if (feature.get(cond[0]) === cond[2]) {
              return styles[i]
            }
            break
          case '!=':
            if (feature.get(cond[0]) !== cond[2]) {
              return styles[i]
            }
            break
          case '<':
            if (feature.get(cond[0]) < cond[2]) {
              return styles[i]
            }
            break
          case '>':
            if (feature.get(cond[0]) > cond[2]) {
              return styles[i]
            }
            break
          case '<=':
            if (feature.get(cond[0]) <= cond[2]) {
              return styles[i]
            }
            break
          case '>=':
            if (feature.get(cond[0]) >= cond[2]) {
              return styles[i]
            }
            break
        }
      }
    }
  }
}
