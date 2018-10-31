import ol from 'ol'
import $ from 'jquery'

export class MapEventInteraction extends ol.interaction.Interaction {
  constructor (options = {}) {
    let type = options.type || 'singleclick'
    super({
      handleEvent: e => {
        if (this.getActive() && e.type === type && $(e.originalEvent.target).is('.ol-viewport > canvas')) {
          this.handleMapEvent(e)
        }
        return true
      }
    })
  }

  handleMapEvent (e) {
    this.dispatchEvent({
      type: 'mapevent',
      mapEvent: e
    })
  }
}
