import ol from 'ol'

import { Attribution } from '../controls/Attribution'
import { ComposedControl } from '../controls/ComposedControl'
import { ArrowButtons } from '../controls/ArrowButtons'
import { CombinedZoom } from '../controls/CombinedZoom'
import { LayerSelector } from '../controls/LayerSelector'
import { GeolocationButton } from '../controls/GeoLocationButton'
import { MeasurementButton } from '../controls/MeasurementButton'
import { LanguageSwitcherButton } from '../controls/LanguageSwitcherButton'
import { LanguageSwitcherMenu } from '../controls/LanguageSwitcherMenu'
import { MobileControls } from '../controls/MobileControls'
import { InfoButton } from '../controls/InfoButton'
import { LinkButton } from '../controls/LinkButton'
import { PrintButton } from '../controls/PrintButton'
import { Logo } from '../controls/Logo'
import { HelpButton } from '../controls/HelpButton'
import { WindowDecorator } from '../controls/WindowDecorator'

import { asObject, checkFor } from '../utilities'
import { copyDeep } from '../utilitiesObject'

import { G4UMap } from '../G4UMap'

import { Debug } from '../Debug'
import { ActiveGroup } from '../controls/ActiveGroup'
import { MousePosition } from '../controls/MousePosition'
import { ScaleLine } from '../controls/ScaleLine'
import { OverviewMap } from '../controls/OverviewMap'
import { SingleDrawButton } from '../controls/SingleDrawButton'

/**
 *  Inside of this object the controls are configured. Normally they are referenced by their type, but if
 *  you have multiple controls of one type you can specify a name under which it is referenced. Then you
 *  have to specify the `controlType` in the configuration object.
 *
 *  Example:
 *  let `'example'` be the chosen name for an attribution control. Then we can reference it in `onMap` or
 *  any `contains` property as `'example'`. The configuration object is now named `'example'` but needs to
 *  have an `'controlType'` property which needs to be set to `'attribution'`.
 *
 *  ```
 *    "controls": {
 *      "onMap": ["example"],
 *      "example": {
 *        "controlType": "attribution",
 *        ...
 *      }
 *    }
 *  ```
 *
 * @typedef {object} ControlsConfig
 * @property {string[]} onMap All controls mentioned in this array will be added directly to the map.
 * @property {ArrowButtonOptions} [arrowButtons]
 * @property {AttributionOptions} [attribution]
 * @property {CombinedZoomOptions} [combinedZoom]
 * @property {GeoLocationButtonOptions} [geolocationButton]
 * @property {HelpButtonOptions} [helpButton]
 * @property {InfoButtonOptions} [infoButton]
 * @property {LanguageSwitcherButtonOptions} [languageSwitcherButton]
 * @property {LanguageSwitcherMenuOptions} [languageSwitcherMenu]
 * @property {LayerSelectorOptions} [layerSelector]
 * @property {LinkButtonOptions} [linkButton]
 * @property {LogoOptions} [logo]
 * @property {MeasurementButtonOptions} [measurementButton]
 * @property {ShiftableComposedControlOptions} [mobileControls]
 * @property {MousePositionOptions} [mousePosition]
 * @property {OverviewMapOptions} [overviewMap]
 * @property {g4uControlOptions} [printButton]
 * @property {ScaleLineOptions} [scaleLine]
 * @property {DrawButtonsOptions} [singleDrawButton]
 * @property {ComposedControlOptions} [toolbox]
 * @property {ComposedControlOptions} [layerMenu]
 */

/**
 * @typedef {Object} ControlFactoryOptions
 * @property {L10N} localiser
 * @property {G4UMap} map
 */

/**
 * A Factory that takes a control config as an object and returns the correspondig control. Modules can expand the
 * functionality of this class via the createControl method
 */
export class ControlFactory {
  /**
   * @param {ControlFactoryOptions} options
   * @public
   */
  constructor (options) {
    /**
     * @type {L10N}
     * @private
     * */
    this.localiser_ = options.localiser

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = options.map

    /**
     * @type {Map.<string, ActiveGroup>}
     * @private
     */
    this.activeGroups_ = new Map()
  }

  /**
   * @returns {Positioning}
   */
  getPositioning () {
    return this.map_.get('controlPositioning')
  }

  /**
   * The factory function
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @returns {Control}
   * @public
   */
  createControl (controlType, options) {
    switch (controlType) {
      case 'mousePosition':
        options.projection = options.projection || this.map_.get('interfaceProjection')
        return new MousePosition(options)
      case 'attribution':
        return new Attribution(options)
      case 'zoom':
        return new CombinedZoom(options)
      case 'scaleLine':
        return new ScaleLine(options)
      case 'logo':
        return new Logo(options)
      case 'linkButton':
        return new LinkButton(options)
      case 'mobileControls':
        return new MobileControls(options)
      case 'overviewMap':
        let projection = options.projection || this.map_.get('mapProjection')
        options.view = new ol.View({ projection: projection })
        return new OverviewMap(options)
      case 'infoButton':
        return new WindowDecorator({
          component: new InfoButton(options)
        })
      case 'arrowButtons':
        let mapConfig = this.map_.get('mapConfig')
        if (mapConfig.view) {
          if (mapConfig.view.center) {
            options.initCenter = ol.proj.transform(mapConfig.view.center,
              this.map_.get('interfaceProjection'), this.map_.get('mapProjection'))
          }
          if (mapConfig.view.zoom) {
            options.initZoom = mapConfig.view.zoom
          }
        }
        return new ArrowButtons(options)
      case 'layerSelector':
        return new LayerSelector(options)
      case 'geolocationButton':
        return new GeolocationButton(options)
      case 'languageSwitcherButton':
        return new LanguageSwitcherButton(options)
      case 'languageSwitcherMenu':
        return new LanguageSwitcherMenu(options)
      case 'printButton':
        return new PrintButton(options)
      case 'distanceMeasurementButton':
        options.className = options.className || 'g4u-distance-measurement'
        options.type = 'LineString'
        options.dimension = 1
        return new WindowDecorator({
          component: new MeasurementButton(options)
        })
      case 'areaMeasurementButton':
        options.className = options.className || 'g4u-area-measurement'
        options.type = 'Polygon'
        options.dimension = 2
        return new WindowDecorator({
          component: new MeasurementButton(options)
        })
      case 'helpButton':
        options.configControls = this.map_.get('mapConfig').controls
        return new WindowDecorator({
          component: new HelpButton(options)
        })
      case 'toolbox':
        options.className = options.className || 'g4u-toolbox'
        return new ComposedControl(options)
      case 'layerMenu':
        options.className = options.className || 'g4u-layermenu'
        return new ComposedControl(options)
      case 'singleDrawButton':
        return new SingleDrawButton(options)
    }
  }

  /**
   * Function to add a control by its name to a certain receiver
   * @param {ComposedControl|G4UMap} receiver
   * @param {string} controlName
   * @public
   */
  addControlTo (receiver, controlName) {
    /**
     * @type {g4uControlOptions}
     */
    let config = copyDeep(asObject(this.controlsConfig[controlName]))

    let controlType = config.controlType || controlName

    config.controlName = controlName

    config.localiser = this.localiser_

    if (!config.hasOwnProperty('importance') && receiver.getImportance) {
      config.importance = receiver.getImportance()
    }

    let control = this.createControl(controlType, config, receiver)

    let modules = this.map_.getModules()

    for (let i = 0, ii = modules.length; i < ii && (control === undefined); i++) {
      control = modules[i].createControl(controlType, config, receiver)
    }

    if (control) {
      if (config.activeGroup) {
        if (!this.activeGroups_.has(config.activeGroup)) {
          this.activeGroups_.set(config.activeGroup, new ActiveGroup())
        }
        this.activeGroups_.get(config.activeGroup).addControl(control)
      }

      if (!this.map_.controlsByName[controlName]) {
        this.map_.controlsByName[controlName] = [control]
      } else {
        this.map_.controlsByName[controlName].push(control)
      }

      receiver.addControl(control)

      if (config.contains) {
        this.addControlMultipleInternal_(control, config.contains)
      }

      if (control.rewire) {
        control.rewire()
      }

      if (receiver instanceof G4UMap) {
        this.getPositioning().addControl(control)
      }
    } else if (control === undefined) {
      throw new Error('Unrecognized control type ' + controlType +
        ', maybe you did forget to set the property type of the control?')
    }
  }

  /**
   * Adds multiple controls to one receiver
   * @param {ComposedControl|G4UMap} receiver
   * @param {string[]} controlNames
   * @private
   */
  addControlMultipleInternal_ (receiver, controlNames) {
    controlNames.forEach(controlName => {
      Debug.tryOrThrow(() => {
        this.addControlTo(receiver, controlName)
      })
    })
  }

  /**
   * Add all configured Controls to the map
   * @public
   */
  addControls () {
    /**
     * @type {ControlsConfig}
     */
    this.controlsConfig = this.map_.get('mapConfig').controls
    if (checkFor(this.controlsConfig, 'onMap')) {
      this.addControlMultipleInternal_(this.map_, this.controlsConfig.onMap)
    }
  }

  /**
   * Sets the localiser to pass on to the controls
   * @param {L10N} loc
   * @public
   */
  setLocaliser (loc) {
    this.localiser_ = loc
  }
}
