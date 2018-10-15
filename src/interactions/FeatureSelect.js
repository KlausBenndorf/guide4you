import ol from 'ol'
import sortBy from 'lodash/sortBy'

/**
 * This interaction is a little further customized select interaction.
 * Selected features get sorted by geometry type.
 */
export class FeatureSelect extends ol.interaction.Select {
  /**
   * @param {object} [options={}]
   */
  constructor (options = {}) {
    super(options)

    let sort = f => {
      if ((f.getGeometry() instanceof ol.geom.Point) || (f.getGeometry() instanceof ol.geom.MultiPoint)) {
        return 1
      } else if ((f.getGeometry() instanceof ol.geom.LineString) ||
        (f.getGeometry() instanceof ol.geom.MultiLineString)) {
        return 2
      } else {
        return 3
      }
    }

    this.on('select', e => {
      e.selected = sortBy(e.selected, sort)
      e.deselected = sortBy(e.deselected, sort)
    })
  }
}
