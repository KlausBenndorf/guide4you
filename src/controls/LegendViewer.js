import $ from 'jquery'
import { isPlainObject, isArray } from 'lodash/lang'
import { cssClasses } from '../globals'
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
        if (layer.getSource && layer.getSource() && layer.getSource().get('legends')) {
          this.listenAt(layer).on('change:visible', () => this.update())
          this.listenAt(layer.getSource()).on('change:layers', () => this.update())
        }
      })
      this.update()
    }
  }

  update () {
    const $element = this.get$Element()
    const urls = []
    this.getMap().getLayers().forEach(layer => {
      if (layer.getSource && layer.getSource() && layer.getSource().get('legends')) {
        const legends = layer.getSource().get('legends')
        if (layer.getVisible()) {
          if (isArray(legends)) {
            for (const layerName of legends) {
              if (layer.getSource().areLayersActive([layerName])) {
                urls.push(layer.getSource().getGetLegendGraphicUrl(this.getMap().getView().getResolution(), layerName))
              }
            }
          } else if (isPlainObject(legends)) {
            for (const layerName of Object.keys(legends)) {
              if (layer.getSource().areLayersActive([layerName])) {
                urls.push(legends[layerName])
              }
            }
          }
        }
      }
    })
    $element.empty()
    if (urls.length === 0) {
      $element.addClass(cssClasses.hidden)
    } else {
      $element.removeClass(cssClasses.hidden)
      for (const url of urls) {
        $('<img>')
          .prop('src', url)
          .appendTo($element)
      }
    }
    this.dispatchEvent('change:size')
  }
}
