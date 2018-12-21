import $ from 'jquery'

import { merge } from '../utilitiesObject'
import { Control } from './Control'
import { addTooltip } from '../html/html'

import '../../less/arrowbuttons.less'
import { rotate } from 'ol/coordinate'

/**
 * @typedef {g4uControlOptions} ArrowButtonOptions
 * @property {number} [pixelDelta=128] how many pixels should one click move the map
 * @property {ol.Extent|undefined} [initExtent=undefined] the initial Extent to move the map back to (center button)
 * @property {number} [animationDuration=100] duration of the animation
 * @property {boolean} [animated=true] if the move should be done with an animation or without
 * @property {{up: string, right: string, down: string, left: string, center: string}|{}} [labels={}]
 *  unicode labels for the buttons (only shown if pictures are not loaded)
 */

/**
 * ArrowButtons shows Buttons on the map which let you move in all 4 directions and a button to return to the initial
 * position of the map. It provides an Interface class with an produceOlControl returning an
 * {ol.control.Control} - Object. This can be added as normal controls to the map
 * (e.g. ``map.addControl(arrowButtons.produceOlControl)`` ).
 *
 * The Options are passed as an Object (e.g. ``{ initCenter : map.getView().getCenter(),
 *      initZoom : map.getView().getZoom() }``.
 */
export class ArrowButtons extends Control {
  /**
   * @param {ArrowButtonOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-arrowbuttons'
    options.element = $('<div class="ol-unselectable ol-control"></div>')[0]
    options.singleButton = false

    super(options)

    let description = {
      'left': this.getLocaliser().localiseUsingDictionary('ArrowButtons leftward'),
      'right': this.getLocaliser().localiseUsingDictionary('ArrowButtons rightward'),
      'up': this.getLocaliser().localiseUsingDictionary('ArrowButtons upward'),
      'down': this.getLocaliser().localiseUsingDictionary('ArrowButtons downward'),
      'center': this.getLocaliser().localiseUsingDictionary('ArrowButtons centerward')
    }

    /**
     * @type {number}
     * @private
     */
    this.pixelDelta_ = options.pixelDelta || 128

    /**
     * @type {ol.Extent|undefined}
     * @private
     */
    this.initExtent_ = options.initExtent || undefined

    /**
     * @type {number}
     * @private
     */
    this.animationDuration_ = options.animationDuration || 100

    /**
     * @type {boolean}
     * @private
     */
    this.animated_ = options.animated || true

    /**
     * @type {string[]}
     * @private
     */
    this.directions_ = ['center', 'left', 'up', 'right', 'down']

    /**
     * @type {{left: number[], up: number[], right: number[], down: number[]}}
     * @private
     */
    this.vectors_ = { left: [-1, 0], up: [0, 1], right: [1, 0], down: [0, -1] }

    /**
     * @type {{up: string, right: string, down: string, left: string, center: string}}
     * @private
     */
    this.labels_ = merge(options.labels || {}, {
      left: '&#9665;',
      up: '&#9651;',
      right: '&#9655;',
      down: '&#9661;',
      center: '&#9675;'
    })

    // creating the HTML-Elements and registering Event-Handlers

    for (let direction of this.directions_) {
      // HTML

      let $button = $('<button>')
        .addClass(this.className_ + '-' + direction)
        .html(this.labels_[direction])

      addTooltip($button, description[direction])

      // Handler
      $button.on('click', () => {
        this.onClick_(direction)
        $button.blur()
      })

      // adding button
      this.get$Element().append($button)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    super.setMap(map)

    if (map) {
      if (!this.initExtent_) {
        this.initExtent_ = map.getView().calculateExtent(map.getSize())
      }
    }
  }

  /**
   * This method is called when a button is clicked and makes a move on the map corresponding to the direction.
   * @param {string} direction
   * @private
   */
  onClick_ (direction) {
    let map = this.getMap()
    let view = map.getView()

    if (direction === 'center') {
      map.get('move').toExtent(this.initExtent_, { animated: this.animated_ })
    } else {
      let resolution = view.getResolution()
      let rotation = view.getRotation()

      // a vector that points in the direction the move should be going
      let dirVec = this.vectors_[direction]

      // this calculates the 'move'-vector out of the direction and pixelDelta (-> length, how many pixels per move)
      let delta = [dirVec[0] * resolution * this.pixelDelta_, dirVec[1] * resolution * this.pixelDelta_]

      // this rotates if needed
      rotate(delta, rotation)

      let oldPosition = view.getCenter()

      // adding the delta to the actual center

      let constrainedCenter = view.constrainCenter([oldPosition[0] + delta[0], oldPosition[1] + delta[1]])

      if (this.animated_) {
        // creating a pan-animation
        view.animate({
          center: constrainedCenter,
          duration: this.animationDuration_
        })
      } else {
        view.setCenter(constrainedCenter)
      }
    }
    $(map.getViewport()).focus()
  }
}
