import ol from 'ol'
import $ from 'jquery'

/**
 * extends the openlayers ol.Object class. Waits till a property is set to a specific value and calls the given
 * callback function. If the value already has the desired value the callback is called immediately.
 * @param {string} propName
 * @param {*} value
 * @param {function} cb
 */
ol.Object.prototype.asSoonAs = function (propName, value, cb) {
  if (!$.isFunction(cb)) {
    throw new Error('You need to provide a callback to asSoonAs.')
  }
  if (this.get(propName) === value) {
    // run callback
    cb()
  } else {
    this.once('change:' + propName, () => {
      // recursive call
      this.asSoonAs(propName, value, cb)
    })
  }
}
