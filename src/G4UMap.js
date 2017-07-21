import ol from 'openlayers'
import $ from 'jquery'

import stripJsonComments from 'strip-json-comments'

import {MapConfigurator} from './configurators/MapConfigurator'
import './openlayersInjections'
import {L10N} from './L10N'

import {mergeWithDefaults} from './utilitiesObject'
import {cssClasses} from './globals'

import {defaults} from './defaultconfig'

import {Debug} from './Debug'

import '../less/map.less'
import { getRegisteredModules } from './moduleRegistration'

/**
 * @typedef {object} G4UMapOptions
 * @property {L10N} [localiser]
 * @property {object.<string, Mutator>} [mutators]
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
export class G4UMap extends ol.Map {
  /**
   * @param {HTMLElement|jQuery|string} target element or id of an element
   * @param {MapConfig|string} configOrFileName
   * @param {LayerConfig|string} layerConfigOrFileName
   * @param {G4UMapOptions} [options={}]
   */
  constructor (target, configOrFileName, layerConfigOrFileName, options = {}) {
    let config = {}
    let layerConfig = {}

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                     Call of the Parents Class Constructor                                //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    super({
      controls: [],
      interactions: [],
      view: null
    })

    this.set('guide4youVersion', GUIDE4YOU_VERSION) // eslint-disable-line

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
    options.modules_ = options.modules || []

    this.addModules(options.modules)

    this.set('ready', false)

    this.on([ 'change:ready', 'change:ready:ui', 'change:ready:layers' ], /** ol.ObjectEvent */ e => {
      if (this.get(e.key)) {
        this.dispatchEvent(e.key)
      }
    })

    // registering mutators

    if (options.mutators) {
      this.on('change:featurePopup', () => {
        let featurePopup = this.get('featurePopup')
        for (let name of Object.keys(options.mutators)) {
          featurePopup.registerMutator(name, options.mutators[name])
        }
      })
    }

    // Setting the target of the map

    if (typeof target === 'string' && target[ 0 ] !== '#') {
      this.setTarget($('#' + target).get(0))
    } else {
      this.setTarget($(target).get(0))
    }

    // set the display mode to desktop initially to render overviewmpa correctly
    $(this.getTarget()).children().addClass(cssClasses.desktop)

    // check type of mapConfig
    if (typeof configOrFileName === 'object') {
      config = configOrFileName
    } else if (typeof configOrFileName === 'string') {
      this.set('configFileName', configOrFileName)
      this.set('defaultLayerConfigFileName', layerConfigOrFileName)
    } else {
      throw new Error('Unrecognised type for parameter configOrFileName!')
    }

    // check type of layerConfig
    if (typeof layerConfigOrFileName === 'object') {
      layerConfig = layerConfigOrFileName
    } else if (typeof layerConfigOrFileName === 'string') {
      this.set('layerConfigFileName', layerConfigOrFileName)
    } else {
      throw new Error('Unrecognised type for parameter layerConfigOrFileName!')
    }

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                            Load config files if needed                                 //
    // //////////////////////////////////////////////////////////////////////////////////////////

    this.dispatchEvent('beforeConfigLoad')

    this.set('mapConfigReady', false)
    this.set('layerConfigReady', false)

    function loadConfigFile (fileName) {
      return $.ajax({
        url: fileName,
        dataType: 'text'
      }).then((data) => {
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

    let filesToLoad = []

    let configFileName = this.get('configFileName')
    if (configFileName) {
      filesToLoad.push(loadConfigFile(configFileName).then((data) => {
        config = data
      }))
    }

    let layerConfigFileName = this.get('layerConfigFileName')
    if (layerConfigFileName) {
      filesToLoad.push(loadConfigFile(layerConfigFileName).then((data) => {
        layerConfig = data
      }))
    }

    // wait for all promises in filesToLoad to resolve
    Promise.all(filesToLoad).then(() => {
      this.set('mapConfigReady', true)
      this.set('layerConfigReady', true)

      // Merging the custom config with the default config
      config = mergeWithDefaults(config, defaults.config)

      this.set('mapConfig', config)
      this.set('layerConfig', layerConfig)

      let loading = 0

      // issue reload of mapConfig if the name was changed
      this.on('change:configFileName', /** ol.ObjectEvent */ e => {
        this.set('ready', false)
        loading++

        this.oldMapConfigs_ = this.oldMapConfigs_ || {}
        this.oldMapConfigs_[ e.oldValue ] = this.get('mapConfig')

        if (this.oldMapConfigs_.hasOwnProperty(this.get('configFileName'))) {
          this.set('mapConfig', this.oldMapConfigs_[ this.get('configFileName') ])
        } else {
          this.set('mapConfigReady', false)
          loadConfigFile(this.get('configFileName')).then((data) => {
            this.set('mapConfigReady', true)
            this.set('mapConfig', data)
          }).always(() => {
            loading--
            if (loading === 0) {
              this.set('ready', true)
            }
          })
        }
      })

      // issue reload of layerConfig if the name was changed
      this.on('change:layerConfigFileName', /** ol.ObjectEvent */ e => {
        this.set('ready', false)
        loading++

        this.oldLayerConfigs_ = this.oldLayerConfigs_ || {}
        this.oldLayerConfigs_[ e.oldValue ] = this.get('layerConfig')

        if (this.oldLayerConfigs_.hasOwnProperty(this.get('layerConfigFileName'))) {
          this.set('layerConfig', this.oldLayerConfigs_[ this.get('layerConfigFileName') ])
        } else {
          this.set('layerConfigReady', false)
          loadConfigFile(this.get('layerConfigFileName'))
            .then((data) => {
              this.set('layerConfigReady', true)
              this.set('layerConfig', data)
            })
            .always(() => {
              loading--
              if (loading === 0) {
                this.set('ready', true)
              }
            })
        }
      })

      // //////////////////////////////////////////////////////////////////////////////////////// //
      //                                     Localization                                         //
      // //////////////////////////////////////////////////////////////////////////////////////// //

      let asyncLanguageFilePromise

      if (!options.localiser) {
        let localiserOptions = {}

        if (config.hasOwnProperty('languageSettings')) {
          let l10nconf = config.languageSettings

          localiserOptions.currentLanguage = l10nconf.currentLanguage

          if (l10nconf.hasOwnProperty('defaultLanguage')) {
            localiserOptions.defaultLanguage = l10nconf.defaultLanguage
          }

          if (l10nconf.hasOwnProperty('languageFile')) {
            localiserOptions.languageFile = l10nconf.languageFile
          }

          if (l10nconf.hasOwnProperty('availableLanguages')) {
            localiserOptions.availableLanguages = l10nconf.availableLanguages
          }
        }

        let localiser = new L10N(localiserOptions)
        this.set('localiser', localiser)

        asyncLanguageFilePromise = localiser.ajaxGetLanguageFile()
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

      this.dispatchEvent('afterConfigLoad')

      return asyncLanguageFilePromise
    })
      .then(() => {
        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                    Configurator                                          //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        this.set('configurator', new MapConfigurator(this))

        this.dispatchEvent('afterConfiguring')

        if (this.get('ready:ui') && this.get('ready:layers')) {
          this.set('ready', true)
        }

        this.on([ 'change:ready:ui', 'change:ready:layers' ], /** ol.ObjectEvent */ e => {
          if (!this.get(e.key)) {
            this.set('ready', false)
          }

          if (this.get('ready:ui') && this.get('ready:layers')) {
            this.set('ready', true)
          }
        })
      })
      .catch(Debug.defaultErrorHandler)
  }

  /**
   * Searches all controls of the specified name
   * @param {string} name
   * @returns {Control[]}
   */
  getControlsByName (name) {
    return this.controlsByName[ name ] || []
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
        this.defaultInteractions_.set(eventtype, [ interaction ])
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
        this.supersedingInteractions_.set(eventType, [ interaction ])
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
   */
  setLayerGroup (groupLayer) {
    groupLayer.provideMap(this)
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
