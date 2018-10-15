import $ from 'jquery'
import { cssClasses } from '../globals'

/**
 * This class contains logic which should be part of any Control in the Software. Any custom controls
 * should inherit from Control which inherits from this class AND from ol.cont
 */
export class ControlLogicMixin {
  /**
   * @param {g4uControlOptions} options
   */
  initialize (options = {}) {
    /**
     * @type {string}
     * @private
     */
    this.className_ = options.hasOwnProperty('className')
      ? options.className
      : ''

    if (options.hasOwnProperty('target')) {
      let $target
      if (typeof options.target === 'string' && options.target[ 0 ] !== '#') {
        $target = $('#' + options.target)
      } else {
        $target = $(options.target)
      }
      this.set$Target($target)
    }

    if (options.hasOwnProperty('element')) {
      $(options.element).addClass(this.className_).addClass('ol-unselectable ol-control')
    }

    /**
     * @type {boolean}
     */
    this.singleButton = (options.singleButton === true)
    if (this.singleButton) {
      $(options.element).addClass(cssClasses.mainButton)
    }

    /**
     * @type {string|undefined}
     * @private
     */
    this.controlName_ = options.controlName

    /**
     * @type {boolean}
     * @private
     */
    this.windowed_ = options.hasOwnProperty('windowed')
      ? options.windowed
      : false

    /**
     * @type {L10N}
     * @private
     */
    this.localiser_ = options.localiser

    /**
     * @type {string|undefined}
     * @private
     */
    this.title_ = options.hasOwnProperty('title') ? this.getLocaliser().selectL10N(options.title) : undefined

    /**
     * @type {string|undefined}
     * @private
     */
    this.tipLabel_ = options.hasOwnProperty('tipLabel') ? this.getLocaliser().selectL10N(options.tipLabel) : undefined

    /**
     * @type {string[]| string}
     * @private
     */
    this.float_ = (options.float === undefined) ? [ 'top', 'left' ] : options.float

    /**
     * @type {number}
     * @private
     */
    this.importance_ = options.importance || 0

    /**
     * @type {boolean}
     * @private
     */
    this.visible_ = true
  }

  /**
   * Returns the floating directions of the control
   * @returns {string[]|string}
   */
  getFloat () {
    return this.float_
  }

  /**
   * @returns {number}
   */
  getImportance () {
    return this.importance_
  }

  /**
   * @returns {L10N}
   */
  getLocaliser () {
    return this.localiser_
  }

  /**
   * Returns true if the element consists only of a single button
   * @returns {Boolean} element it is created in
   */
  isSingleButton () {
    return this.singleButton
  }

  /**
   * @returns {boolean}
   */
  isWindowed () {
    return this.windowed_
  }

  /**
   * Returns the name of the control if given to the constructor
   * @returns {string}
   */
  getControlName () {
    return this.controlName_
  }

  /**
   * Returns the title of the control if given to the constructor
   * @returns {string}
   */
  getTitle () {
    return this.title_
  }

  /**
   * @param {Localizable} title
   */
  setTitle (title) {
    this.title_ = this.getLocaliser().selectL10N(title)
  }

  /**
   * Returns the tipLabel of the control if given to the constructor
   * @returns {string} title
   */
  getTipLabel () {
    return this.tipLabel_
  }

  /**
   * @param {Localizable} tipLabel
   */
  setTipLabel (tipLabel) {
    this.tipLabel_ = this.getLocaliser().selectL10N(tipLabel)
  }

  /**
   * Returns the element of the control
   * @returns {jQuery} element it is created in
   */
  get$Element () {
    return $(this.element)
  }

  /**
   * Returns the target of the control
   * @returns {jQuery} element it is created in
   */
  get$Target () {
    if (this.catched$Target_) {
      return this.catched$Target_
    } else if (this.getMap()) {
      this.catched$Target_ = $(this.getMap().getViewport()).children('.ol-overlaycontainer-stopevent')
      return this.catched$Target_
    }
  }

  /**
   * Returns the CSS-className of the control
   * @returns {string} CSS-className
   */
  getClassName () {
    return this.className_
  }

  /**
   * Sets a new target for the control
   * @param {jQuery} $target element it is moved to
   */
  set$Target ($target) {
    /**
     * @type {jQuery}
     * @private
     */
    this.catched$Target_ = $target
    this.setTarget($target[ 0 ])
    $target.append(this.get$Element())
  }

  /**
   * @param {boolean} visible
   */
  setVisible (visible) {
    if (visible !== this.visible_) {
      this.get$Element().toggleClass(cssClasses.hidden, !visible)
      this.visible_ = visible
      this.dispatchEvent('change:visible')
    }
  }

  /**
   * @returns {boolean}
   */
  getVisible () {
    return this.visible_
  }
}
