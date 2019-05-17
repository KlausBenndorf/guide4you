import $ from 'jquery'
import { isPlainObject } from 'lodash/lang'
import OlMap from 'ol/Map'
import stripJsonComments from 'strip-json-comments'

import { MapConfigurator } from './configurators/MapConfigurator'
import { Debug } from './Debug'
import { cssClasses } from './globals'
import { L10N } from './L10N'
import { layerConfigConverter } from './layerSelector/layerConfigConverter'
import { getRegisteredModules } from './moduleRegistration'
import './openlayersInjections'
import { PopupModifierManager } from './PopupModifierManager'

import '../less/map.less'

/**
 * @typedef {object} Configs
 * @property {string|object} client the client config
 * @property {string|object} layer the layer config
 * @property {string|object} translations the translations
 * @property {string|object} [styles] the style map
 */

/**
 * @typedef {object} G4UMapOptions
 * @property {L10N} [localiser]
 * @property {object.<string, PopupModifier>} [popupModifiers]
 */

/**
 * Definition of the map-object
 * Main task of the constructor is to load and read out the configuration.
 * Uses the functions makeMapLayers, makeMapUI to create the map.
 *
 * Custom properties accessible via method .get('propertyName')
 *
 * @fires 'resize'
 * @fires 'userActionTracking'
 * @fires 'beforeConfigLoad'
 * @fires 'afterConfigLoad'
 * @fires 'afterConfiguring'
 * @fires 'change:ready'
 * @fires 'change:ready:ui'
 * @fires 'change:ready:layers'
 */
export class G4UMap extends OlMap {
  static loadConfigFile (fileName) {
    return $.ajax({
      url: fileName,
      dataType: 'text'
    }).then(data => {
      try {
        return JSON.parse(stripJsonComments(data))
      } catch (err) {
        Debug.error(`The config file ${fileName} couldn't be parsed.`)
        Debug.error(err)
      }
    }).fail((err) => {
      Debug.error(`The config file ${fileName} couldn't be loaded.`)
      Debug.error(err)
    })
  }

  updateClientConfig (config) {
    let clientPromise
    if (isPlainObject(config)) {
      clientPromise = Promise.resolve(config)
    } else {
      if (!this.get('configFileName')) {
        this.set('configFileName', config)
      }
      clientPromise = G4UMap.loadConfigFile(config)
    }
    clientPromise.then(data => {
      this.set('mapConfigReady', true)
      this.set('mapConfig', data)
    })
    return clientPromise
  }

  updateLayerConfig (config) {
    let layerPromise
    if (isPlainObject(config)) {
      layerPromise = Promise.resolve(config)
    } else {
      if (!this.get('layerConfigFileName')) {
        this.set('layerConfigFileName', config)
      }
      layerPromise = G4UMap.loadConfigFile(config)
    }
    layerPromise.then(data => {
      this.set('layerConfigReady', true)
      this.set('layerConfig', layerConfigConverter(data))
    })
  }

  loadConfigs (configs) {
    this.set('mapConfigReady', false)
    this.set('layerConfigReady', false)

    const configPromises = []

    if (configs.hasOwnProperty('client')) {
      configPromises.push(this.updateClientConfig(configs.client))
    } else {
      Debug.error('No client config provided.')
    }

    // issue reload of mapConfig if the name was changed
    this.on('change:configFileName', /** ol.ObjectEvent */ e => {
      this.set('ready', false)
      this.set('mapConfigReady', false)

      this.oldMapConfigs_ = this.oldMapConfigs_ || {}
      this.oldMapConfigs_[e.oldValue] = this.get('mapConfig')

      if (this.oldMapConfigs_.hasOwnProperty(this.get('configFileName'))) {
        this.updateClientConfig(this.oldMapConfigs_[this.get('configFileName')])
      } else {
        this.updateClientConfig(this.get('configFileName'))
      }
    })

    if (configs.hasOwnProperty('layer')) {
      configPromises.push(this.updateLayerConfig(configs.layer))
    } else {
      Debug.error('No client config provided.')
    }

    // issue reload of layerConfig if the name was changed
    this.on('change:layerConfigFileName', /** ol.ObjectEvent */ e => {
      this.set('ready', false)
      this.set('layerConfigReady', false)

      this.oldLayerConfigs_ = this.oldLayerConfigs_ || {}
      this.oldLayerConfigs_[e.oldValue] = this.get('layerConfig')

      if (this.oldLayerConfigs_.hasOwnProperty(this.get('layerConfigFileName'))) {
        this.updateLayerConfig(this.oldLayerConfigs_[this.get('layerConfigFileName')])
      } else {
        this.updateLayerConfig(this.get('layerConfigFileName'))
      }
    })

    if (configs.hasOwnProperty('translations')) {
      configPromises.push(G4UMap.loadConfigFile(configs.translations).then(data => {
        this.set('translations', data)
      }))
    } else {
      Debug.error('No translations provided')
    }

    if (configs.hasOwnProperty('styleMap')) {
      configPromises.push(G4UMap.loadConfigFile(configs.styleMap).then(data => {
        this.set('styleMap', data)
      }))
    }

    return Promise.all(configPromises)
  }

  /**
   * @param {HTMLElement|jQuery|string} target element or id of an element
   * @param {Configs} configs
   * @param {G4UMapOptions} [options={}]
   */
  constructor (target, configs, options = {}) {
    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                     Call of the Parents Class Constructor                                //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    super({
      controls: [],
      interactions: [],
      view: null
    })

    this.set('guide4youVersion', GUIDE4YOU_VERSION) // eslint-disable-line

    this.set('options', options)

    /**
     * @type {Map.<string, ol.interaction.Interaction[]>}
     * @private
     */
    this.defaultInteractions_ = new Map()

    /**
     * @type {Map.<string, ol.interaction.Interaction[]>}
     * @private
     */
    this.supersedingInteractions_ = new Map()

    /**
     * @type {Module[]}
     * @private
     */
    this.modules_ = []

    this.addModules(getRegisteredModules())

    this.set('ready', false)

    this.on(['change:ready', 'change:ready:ui', 'change:ready:layers'], /** ol.ObjectEvent */ e => {
      if (this.get(e.key)) {
        this.dispatchEvent(e.key)
      }
    })

    // popupModifiers

    let popupModifiers = new PopupModifierManager()
    this.set('popupModifiers', popupModifiers)

    if (options.popupModifiers) {
      this.on('change:featurePopup', () => {
        for (let name of Object.keys(options.popupModifiers)) {
          let popupModifier = options.popupModifiers[name]
          popupModifier.setMap(this)
          popupModifiers.register(name, popupModifier)
        }
      })
    }

    // Setting the target of the map

    if (typeof target === 'string' && target[0] !== '#') {
      this.setTarget($('#' + target).get(0))
    } else {
      this.setTarget($(target).get(0))
    }

    // set the display mode to desktop initially to render overviewmpa correctly
    $(this.getTarget()).children().addClass(cssClasses.desktop)

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                            Load config files if needed                                 //
    // //////////////////////////////////////////////////////////////////////////////////////////

    this.dispatchEvent('beforeConfigLoad')

    this.set('mapConfigReady', false)
    this.set('layerConfigReady', false)

    this.loadConfigs(configs).then(() => {
      const config = this.get('mapConfig')

      this.dispatchEvent('afterConfigLoad')

      this.set('proxy', config.proxy)

      // //////////////////////////////////////////////////////////////////////////////////////// //
      //                                     Localization                                         //
      // //////////////////////////////////////////////////////////////////////////////////////// //

      if (!options.localiser) {
        let localiserOptions = {}

        if (config.hasOwnProperty('languageSettings')) {
          let l10nconf = config.languageSettings

          localiserOptions.currentLanguage = l10nconf.currentLanguage

          if (l10nconf.hasOwnProperty('defaultLanguage')) {
            localiserOptions.defaultLanguage = l10nconf.defaultLanguage
          }

          if (l10nconf.hasOwnProperty('availableLanguages')) {
            localiserOptions.availableLanguages = l10nconf.availableLanguages
          }
        }

        if (localiserOptions.hasOwnProperty('languageFile')) {
          Debug.error('You are using a languageFile options in your client config. This option is not used anymore.\n' +
            'Either remove the option if you want to use the default values or pass it via' +
            'the configs object to createMap (`createMap(target, { l10n: \'path/to/l10n.json\' })`).')
        }

        let localiser = new L10N(this.get('translations'), localiserOptions)
        this.set('localiser', localiser)
      } else {
        this.set('localiser', options.localiser)
      }

      this.asSoonAs('ready', true, () => {
        this.get('localiser').on('change:language', () => {
          let visibilities = this.getLayerGroup().getIdsVisibilities()

          this.get('configurator').configureLayers()
          this.get('configurator').configureUI()

          this.getLayerGroup().setIdsVisibilities(visibilities)
        })
      })

      // //////////////////////////////////////////////////////////////////////////////////////// //
      //                                    Configurator                                          //
      // //////////////////////////////////////////////////////////////////////////////////////// //

      this.set('configurator', new MapConfigurator(this))

      this.dispatchEvent('afterConfiguring')

      if (this.get('ready:ui') && this.get('ready:layers')) {
        this.set('ready', true)
      }

      this.on(['change:ready:ui', 'change:ready:layers'], /** ol.ObjectEvent */ e => {
        if (!this.get(e.key)) {
          this.set('ready', false)
        }

        if (this.get('ready:ui') && this.get('ready:layers')) {
          this.set('ready', true)
        }
      })
    }).catch(Debug.defaultErrorHandler)
  }

  /**
   * Searches all controls of the specified name
   * @param {string} name
   * @returns {Control[]}
   */
  getControlsByName (name) {
    return this.controlsByName[name] || []
  }

  getControlsByType (type) {
    let matched = []
    for (const controls of Object.values(this.controlsByName)) {
      matched = matched.concat(controls.filter(c => c instanceof type))
    }
    return matched
  }

  /**
   * @param {Module} module
   */
  addModule (module) {
    module.setMap(this)
    this.modules_.push(module)
  }

  /**
   * @param {Module[]} modules
   */
  addModules (modules) {
    for (let module of modules) {
      this.addModule(module)
    }
  }

  /**
   * The listener is called once immediately after the next postrender event
   * @param listener
   */
  afterPostrender (listener) {
    this.once('postrender', () => setTimeout(listener, 0))
  }

  /**
   * @returns {Module[]}
   */
  getModules () {
    return this.modules_
  }

  /**
   * @param {ol.interaction.Interaction} interaction
   */
  removeInteraction (interaction) {
    let index

    this.defaultInteractions_.forEach(interactions => {
      index = interactions.indexOf(interaction)
      if (index > -1) {
        interactions.splice(index, 1)
      }
    })

    this.supersedingInteractions_.forEach(interactions => {
      index = interactions.indexOf(interaction)
      if (index > -1) {
        interactions.splice(index, 1)
      }
    })

    super.removeInteraction(interaction)
  }

  /**
   * Remove all interactions
   */
  removeInteractions () {
    while (this.getInteractions() && this.getInteractions().getLength()) {
      for (let interaction of this.getInteractions().getArray()) {
        this.removeInteraction(interaction)
      }
    }
  }

  /**
   * overwrite base method to notify developer about differing api
   */
  addInteraction () {
    throw new Error('Use addDefaultInteraction or addSupersedingInteraction')
  }

  /**
   * Add an interaction that should be active by default (i.e. in the normal state of the map)
   * @param {string} eventTypes a list of space separated eventtypes this interaction reacts on
   * @param {ol.interaction.Interaction} interaction
   */
  addDefaultInteraction (eventTypes, interaction) {
    for (let eventtype of eventTypes.split(' ')) {
      if (this.defaultInteractions_.has(eventtype)) {
        this.defaultInteractions_.get(eventtype).push(interaction)
      } else {
        this.defaultInteractions_.set(eventtype, [interaction])
      }
    }

    super.addInteraction(interaction)
  }

  /**
   * This deactivates all interactions which use a given event type
   * @param {string} eventType
   */
  deactivateInteractions (eventType) {
    for (let defInteraction of this.defaultInteractions_.get(eventType)) {
      defInteraction.setActive(false)
    }
    for (let supInteraction of this.supersedingInteractions_.get(eventType)) {
      supInteraction.setActive(false)
    }
  }

  /**
   * Reactivates all default interactions which use a specified event type
   * @param {string} eventType
   */
  activateInteractions (eventType) {
    for (let defInteraction of this.getDefaultInteractions(eventType)) {
      defInteraction.setActive(true)
    }
  }

  /**
   * Gets all interactions which use the specified event type
   * @param {string} eventType
   * @returns {ol.interaction.Interaction[]}
   */
  getDefaultInteractions (eventType) {
    return this.defaultInteractions_.get(eventType)
  }

  /**
   * This adds an interaction to the map which prohibits other interactions which use the same eventtype to be active
   * at the same time. When the superseding interaction is activated all affected ones get deactivated and vice versa
   * @param {string} eventTypes a list of space separated eventtypes this interaction reacts on
   * @param {ol.interaction.Interaction} interaction
   */
  addSupersedingInteraction (eventTypes, interaction) {
    let eventTypes_ = eventTypes.split(' ')

    let onActivation = () => {
      // deactivation of all other interactions with the same eventtypes

      for (let eventType of eventTypes_) {
        for (let supersedingInteraction of this.supersedingInteractions_.get(eventType)) {
          if (interaction !== supersedingInteraction) {
            supersedingInteraction.setActive(false)
          }
        }

        if (this.defaultInteractions_.get(eventType)) {
          for (let defaultInteraction of this.defaultInteractions_.get(eventType)) {
            defaultInteraction.setActive(false)
          }
        }
      }
    }

    let onDeactivation = () => {
      // reactivation of the default interactions
      // NOTE: if a superseding turned off another superseding interactions it won't reactivate it
      for (let eventType of eventTypes_) {
        if (this.defaultInteractions_.get(eventType)) {
          for (let defaultInteraction of this.defaultInteractions_.get(eventType)) {
            defaultInteraction.setActive(true)
          }
        }
      }
    }

    for (let eventType of eventTypes_) {
      if (this.supersedingInteractions_.has(eventType)) {
        this.supersedingInteractions_.get(eventType).push(interaction)
      } else {
        this.supersedingInteractions_.set(eventType, [interaction])
      }
    }

    if (interaction.getActive()) {
      onActivation()
    }

    interaction.on('change:active', /** ol.ObjectEvent */ e => {
      if (e.oldValue !== interaction.getActive()) {
        if (interaction.getActive()) {
          this.activating_ = true
          onActivation()
          this.activating_ = false
        } else {
          if (this.interactionDecativationTimeout_) {
            clearTimeout(this.interactionDecativationTimeout_)
          }

          if (!this.activating_) {
            this.interactionDecativationTimeout_ = setTimeout(onDeactivation, 500)
          }
        }
      }
    })

    super.addInteraction(interaction)
  }

  /**
   * @param {GroupLayer} groupLayer
   * @param {boolean} [silent=false] provide map to layers
   */
  setLayerGroup (groupLayer, silent = false) {
    if (!silent) {
      groupLayer.provideMap(this)
    }
    super.setLayerGroup(groupLayer)
  }

  /**
   * Remove all controls
   */
  removeControls () {
    let controls = this.getControls()

    if (controls) {
      // its neccessary to loop, problem caused by the nesting?
      while (controls.getLength() > 0) {
        controls.forEach(control => this.removeControl(control))
        controls = this.getControls()
      }
    }
  }
}
