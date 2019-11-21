import { getSize as getExtentSize } from 'ol/extent'

/**
 * returns an extent with the same center but width and height miltiplied by the given value
 * @param {ol.Extent} extent
 * @param {number} value
 * @returns {ol.Extent}
 */
export function multiplyExtent (extent, value) {
  const size = getExtentSize(extent)
  const addX = size[0] * (value - 1) / 2
  const addY = size[1] * (value - 1) / 2
  return [extent[0] - addX, extent[1] - addY, extent[2] + addX, extent[3] + addY]
}
