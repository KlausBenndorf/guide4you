/**
 * Gathers function calls made in a specified time or till the main loop is free again and only calls the function once
 */
export class FunctionCallBuffer {
  /**
   * @param {number} [bufferTime=0] time of the buffer. If set to 0 it evaluates as soon as the main loop is free again
   */
  constructor (bufferTime = 0) {
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
   * @param {function} func
   */
  call (func) {
    clearTimeout(this.timeout_)
    this.timeout_ = setTimeout(() => {
      func()
    }, this.bufferTime_)
  }
}
