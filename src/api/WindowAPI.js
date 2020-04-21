import $ from 'jquery'
import { Window } from '../html/Window'

export class WindowAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map
  }

  addWindow (bodyElement, options = {}) {
    options.map = this.map_
    options.parentClassName = options.parentClassName || 'g4u-api'
    const window = new Window(options)
    window.get$Body().append(bodyElement)
    const $container = $(this.map_.getViewport()).children('.ol-overlaycontainer-stopevent')
    $container.append(window.get$Element())
    return {
      open: () => window.setVisible(true),
      close: () => window.setVisible(false)
    }
  }
}
