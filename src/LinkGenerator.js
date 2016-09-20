import $ from 'jquery'

import {Control} from 'guide4you/src/controls/Control'

/**
 * @typedef {g4uControlOptions} LinkGeneratorOptions
 * @property {string} [baseURL] the baseUrl of the link. Defaults to the current location.
 * @property {string} [type='url'] possible values are 'url', 'link' and 'iframe'
 *    'url' can be copied
 *    'link' can be clicked
 *    'iframe' can be copied
 */

/**
 * Generates links optionally wrapped in iframe- or a-tags that can be copied or clicked by the user.
 */
export class LinkGenerator extends Control {
  /**
   * @param {LinkGeneratorOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-minimaptaggenerator'
    options.element = $('<div>').get(0)
    options.singleButton = false

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.baseURL_ = (options.hasOwnProperty('baseURL'))
      ? options.baseURL
      : window.location.origin + window.location.pathname

    /**
     * @type {string}
     * @private
     */
    this.type_ = options.type || 'url'

    if (this.type_ === 'iframe' || this.type_ === 'url') {
      this.$textfield_ = $('<textarea>')
      this.get$Element().append(this.$textfield_)
    } else if (this.type_ === 'link') {
      this.get$Element().append(this.getLocaliser().localiseUsingDictionary('LinkGenerator beforeLinkText'))
      this.$link_ = $('<a target="_new">')
        .text(this.getLocaliser().localiseUsingDictionary('LinkGenerator linkText'))
      this.get$Element().append(this.$link_)
      this.get$Element().append(this.getLocaliser().localiseUsingDictionary('LinkGenerator afterLinkText'))
    }

    /**
     * @type {function(this:LinkGenerator)}
     * @private
     */
    this.generateHandler_ = this.generate_.bind(this)
  }

  /**
   * @param {?G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().un('click', this.generateHandler_)
      $(document).off('click keydown keyup touch mousewheel wheel DOMMouseScroll', this.generateHandler_)
    }

    super.setMap(map)

    if (map) {
      $(document).on('click keydown keyup touch mousewheel wheel DOMMouseScroll', this.generateHandler_)
      map.on('click', this.generateHandler_)
      map.asSoonAs('ready', true, () => this.generate_())
    }
  }

  /**
   * @private
   */
  generate_ () {
    let map = this.getMap()
    let url = map.get('urlApi').makeURL({
      baseURL: this.baseURL_,
      exclude: ['lang']
    })

    if (this.type_ === 'iframe') {
      let mapSize = map.getSize()
      let text = `<iframe style="border:0;" width="${mapSize[0]}" height="${mapSize[1]}" src="${url}"></iframe>`
      this.$textfield_.val(text)
    } else if (this.type_ === 'url') {
      this.$textfield_.val(url)
    } else if (this.type_ === 'link') {
      this.$link_.attr('href', url)
    }
  }
}
