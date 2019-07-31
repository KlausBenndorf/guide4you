import $ from 'jquery'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'

import { Control } from './Control'
import '../../less/legendviewer.less'

export class LegendViewer extends mixin(Control, ListenerOrganizerMixin) {
  constructor (options = {}) {
    options.element = $('<div>')[0]
    options.className = options.className || 'g4u-legendviewer'

    super(options)

    this.setTitle(this.getTitle() || this.getLocaliser().localiseUsingDictionary('LegendViewer title'))
  }

  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()
    }
    super.setMap(map)
    if (map) {
      map.getLayers().forEach(layer => {
        if (layer.getSource && layer.getSource() && layer.getSource().get('legend')) {
          this.listenAt(layer).on('change:visible', () => this.update())
          this.listenAt(layer.getSource()).on('change:layers', () => this.update())
        }
      })
      this.update()
    }
  }

  update () {
    const $element = this.get$Element()
    $element.empty()
    this.getMap().getLayers().forEach(layer => {
      if (layer.getSource && layer.getSource() && layer.getSource().get('legend')) {
        if (layer.getVisible() && layer.getSource().anyLayerActive()) {
          for (const url of layer.getSource().getGetLegendGraphicUrls(this.getMap().getView().getResolution())) {
            $('<img>')
              .prop('src', url)
              .appendTo($element)
          }
        }
      }
    })
    this.dispatchEvent('change:size')
  }
}
