import $ from 'jquery'
import { mixin } from '../utilities'
import Observable from 'ol/Observable'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { debounce } from 'lodash/function'

export class Element extends mixin(Observable, ListenerOrganizerMixin) {
  constructor (layerSelector, config, map) {
    super()
    this.layerSelector = layerSelector
    this.config = config
    this.debouncedUpdate = debounce(() => this.update())
    this.disabled_ = false
    this.$element_ = $()
    this.map = map

    if (this.config.hasOwnProperty('group')) {
      this.layerSelector.addElementToGroup(this, this.config.group)
    }
  }

  detach () {
    this.detachAllListeners()
  }

  get$Element () {
    return this.$element_
  }

  update () {
    this.dispatchEvent('update')
  }

  updateDisabled (zoom) {
    this.disabled_ = (this.config.hasOwnProperty('minZoom') && zoom < this.config.minZoom) ||
      (this.config.hasOwnProperty('maxZoom') && zoom > this.config.maxZoom)
    if (this.disabled_ && this.getActive) {
      this.setActive(false)
    }
    this.debouncedUpdate()
  }

  getDisabled () {
    return this.disabled_
  }

  setActive (active) {
    if (active && this.config.hasOwnProperty('group')) {
      this.layerSelector.deactivateOtherGroupElements(this, this.config.group)
    }
  }
}
