/**
 * Gathers function calls made in a specified time or till the main loop is free again and only calls the function once
 */
export class FunctionCallBuffer {
  /**
   * @param {function} func the function whichs call should be buffered
   * @param {number} [bufferTime=0] time of the buffer. If set to 0 it evaluates as soon as the main loop is free again
   */
  constructor (func, bufferTime = 0) {
    /**
     * @type {function}
     * @private
     */
    this.func_ = func
    /**
     * @type {number}
     * @private
     */
    this.bufferTime_ = bufferTime

    /**
     * Timeout ID
     * @type {number}
     * @private
     */
    this.timeout_ = -1
  }

  /**
   * @param {any[]} params
   */
  call (...params) {
    clearTimeout(this.timeout_)
    this.timeout_ = setTimeout(() => {
      this.func_(...params)
    }, this.bufferTime_)
  }
}
