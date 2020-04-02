import KML from 'ol/format/KML'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Debug } from '../Debug'

export class KMLAPI {
  constructor (mainAPI, map) {
    /**
     * @type {API}
     * @private
     */
    this.mainAPI_ = mainAPI

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map

    this.nextId_ = 0

    this.layers_ = {}
  }

  add (kml, options = {}) {
    const styling = this.map_.get('styling')
    const style = styling.getStyle(options.style || '#defaultStyle')
    const features = new KML({
      extractStyles: !!options.extractStyles,
      defaultStyle: style
    }).readFeatures(kml, {
      featureProjection: this.map_.getView().getProjection()
    })
    const layer = new VectorLayer({
      source: new VectorSource({ features }),
      style: style,
      visible: true
    })
    styling.manageLayer(layer)
    this.map_.addLayer(layer)
    const id = this.nextId_++

    this.layers_[id] = layer
    return id
  }

  update (id, kml, options) {
    if (!this.layers_.hasOwnProperty(id)) {
      Debug.error('layer does not exist')
    }
    const styling = this.map_.get('styling')
    const style = styling.getStyle(options.style || '#defaultStyle')
    const features = new KML({
      extractStyles: !!options.extractStyles,
      defaultStyle: style
    }).readFeatures(kml, {
      featureProjection: this.map_.getView().getProjection()
    })
    const source = this.layers_[id].getSource()
    source.clear()
    source.addFeatures(features)
  }

  remove (id) {
    if (!this.layers_.hasOwnProperty(id)) {
      Debug.error('layer does not exist')
    }
    this.map_.removeLayer(this.layers_[id])
    delete this.layers_[id]
  }
}
