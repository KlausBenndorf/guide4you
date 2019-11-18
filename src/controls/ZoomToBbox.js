import $ from 'jquery'
import ExtentInteraction from 'ol/interaction/Extent'
import { addTooltip } from '../html/html'

import { Control } from './Control'
import { cssClasses } from '../globals'

import '../../less/zoomtobbox.less'
import { mixin } from '../utilities'
import { ActivatableMixin } from './ActivatableMixin'

/**
 * Zoom to a drawn Bbox
 */
export class ZoomToBbox extends mixin(Control, ActivatableMixin) {
  /**
   * @param {g4uControlOptions} options
   */
  constructor (options = {}) {
    options.element = $('<button>').get(0)
    options.className = options.className || 'g4u-zoom-to-bbox'
    options.singleButton = true

    super(options)

    this.classNameActive_ = this.className_ + '-active'

    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || '#defaultStyle'

    this.setTitle(this.getTitle() ||
      this.getLocaliser().localiseUsingDictionary('ZoomToBbox title')
    )
    this.setTipLabel(this.getTipLabel() ||
      this.getLocaliser().localiseUsingDictionary('ZoomToBbox tipLabel')
    )

    this.get$Element()
      .addClass(this.className_)
      .addClass(cssClasses.mainButton)
      .html(this.getTitle())

    addTooltip(this.get$Element(), this.getTipLabel())

    this.get$Element().on('click', () => this.setActive(!this.getActive()))

    this.on('change:active', e => this.activeChangeHandler_(e))
  }

  setMap (map) {
    if (this.getMap()) {
      this.removeInteraction(this.interaction_)
    }
    super.setMap(map)
    if (map) {
      this.interaction_ = new ExtentInteraction({
        boxStyle: map.get('styling').getStyle(this.style_),
        pointerStyle: () => null,
        handleUpEvent: e => {
          this.setActive(false)
          return true
        }
      })

      this.interaction_.setActive(false)

      map.addSupersedingInteraction('singleclick pointermove drag', this.interaction_)
    }
  }

  activeChangeHandler_ () {
    const active = this.getActive()
    this.get$Element().toggleClass(cssClasses.active, active)
    if (active) {
      this.interaction_.setActive(true)
      $(this.map_.getViewport()).addClass(cssClasses.crosshair)
    } else {
      this.map_.getView().fit(this.interaction_.getExtent())
      $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
      this.interaction_.setActive(false)
      this.interaction_.setExtent(null)
    }
  }
}
