/**
 * This class provides different debug behaviour based on the SWITCH_DEBUG build flag
 */
export default class Debug {
  /**
   * if in release mode all thrown errors in the callback are catched and the program is continued
   * @param {function} cb
   */
  static tryOrThrow (cb) {
    if (SWITCH_DEBUG === 'DEBUG') { // eslint-disable-line
      cb()
    } else if (SWITCH_DEBUG === 'PRODUCTION') { // eslint-disable-line
      try {
        cb()
      } catch (e) {
        this.error(e)
      }
    }
  }

  /**
   * Prints an info note if in debug mode
   * @param {string} msg
   */
  static info (msg) {
    if (SWITCH_DEBUG === 'DEBUG') { // eslint-disable-line
      console.log(msg) // eslint-disable-line
    }
  }

  /**
   * prints a warning
   * @param {string} msg
   */
  static warn (msg) {
    console.warn(msg) // eslint-disable-line
  }

  /**
   * prints an error
   * @param {string} msg
   */
  static error (msg) {
    console.error(msg) // eslint-disable-line
  }

  /**
   * a default error handler for .catch functions
   * @param {string} message
   */
  static defaultErrorHandler (message) {
    Debug.error(message)
    if (message.stack) {
      Debug.error(message.stack)
    }
  }
}
