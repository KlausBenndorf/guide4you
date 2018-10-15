import ol from 'ol'
import {RewireMixin} from './RewireMixin'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import {mixin} from '../utilities'

import '../../less/overviewmap.less'

/**
 * @typedef {g4uControlOptions} OverviewMapOptions
 * @property {Localizable} [tipLabel]
 * @property {ol.layer.Group} [layerGroup]
 */

/**
 * @extends Control
 */
export class OverviewMap extends mixin(mixin(ol.control.OverviewMap, RewireMixin), ListenerOrganizerMixin) {
  /**
   * @param {OverviewMapOptions} [options={}]
   */
  constructor (options = {}) {
    if (options.hasOwnProperty('title')) {
      options.tipLabel = options.localiser.selectL10N(options.title)
    } else {
      options.tipLabel = (options.hasOwnProperty('tipLabel'))
        ? options.localiser.selectL10N(options.tipLabel)
        : options.localiser.localiseUsingDictionary('OverviewMap tipLabel')
    }

    options.layers = []

    super(options)
  }

  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()
    }
    super.setMap(map)
    if (map) {
      const view = map.getView()

      this.getOverviewMap().setLayerGroup(map.get('baseLayers'))

      let $overviewmap = this.get$Element().find('.ol-overviewmap-map')

      $overviewmap = $overviewmap.add($overviewmap.find('.ol-overviewmap-box'))

      let dontClick = false

      this.listenAt($overviewmap).on('click', e => {
        if (!dontClick) {
          view.setCenter(view.constrainCenter(this.getOverviewMap().getEventCoordinate(e)))
        }
      })

      let mouseDown = false

      this.listenAt($overviewmap).on('mousedown', () => {
        dontClick = false
        mouseDown = true
      })

      this.listenAt($overviewmap).on('mouseup', e => {
        mouseDown = false
      })

      this.listenAt($overviewmap).on('mousemove', e => {
        if (mouseDown) {
          view.setCenter(view.constrainCenter(this.getOverviewMap().getEventCoordinate(e)))
        }
      })

      this.getOverviewMap().getView().on('change:center', () => {
        mouseDown = false
        dontClick = true
      })

      let $button = this.get$Element().find('button')
      this.listenAt($button).on('click', () => this.dispatchEvent('change:size'))
    }
  }

  afterPositioning () {
    this.getOverviewMap().updateSize()
  }
}
