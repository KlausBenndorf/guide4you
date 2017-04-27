import $ from 'jquery'

import {Control} from './Control'
import { checkFor, finishAllImages } from '../utilities'
import stripJsonComments from 'strip-json-comments'
import {Debug} from '../Debug'

import '../../less/helpbutton.less'

import 'polyfill!Array.prototype.includes'

/**
 * @typedef {g4uControlOptions} HelpButtonOptions
 * @property {object} [configControls={}]
 * @property {string} fileName of the json with the helptexts
 */

/**
 * Shows a help button. Loads an json file with the helptexts and images from the server.
 */
export class HelpButton extends Control {
  /**
   * @param {HelpButtonOptions} options
   */
  constructor (options) {
    options.element = $('<div>')[ 0 ]
    options.className = options.className || 'g4u-helpbutton'

    super(options)

    this.setTitle(this.getTitle() || this.getLocaliser().localiseUsingDictionary('HelpButton title'))
    this.setTipLabel(this.getTipLabel() || options.localiser.localiseUsingDictionary('HelpButton tipLabel'))

    /**
     * @type {object}
     * @private
     */
    this.configControls_ = options.configControls || {}

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    /**
     * @type {string}
     * @private
     */
    this.documentationFileName_ = options.fileName
  }

  createContent_ () {
    let localiser = this.getMap().get('localiser')

    let documentationObject = JSON.parse(stripJsonComments(this.contentData_))

    if (checkFor(documentationObject, localiser.getCurrentLang())) {
      this.language = localiser.getCurrentLang()
    } else if (checkFor(documentationObject, localiser.getDefaultLang())) {
      this.language = localiser.getDefaultLang()
    } else {
      this.language = 'de'
    }

    let makeDocumentationTable = (documentation, language) => {
      let $table = $('<table>').addClass(this.className_ + '-table')
      if (localiser.isRtl()) {
        $table.prop('dir', 'rtl')
      }
      let documentationLocalized = documentationObject[ language ]
      let id
      let imgData
      let descrData
      let joinWith
      let imgElements
      let $row
      let $td
      let visibleControls = []

      if (this.configControls_ && this.configControls_.hasOwnProperty('onMap')) {
        let findContainedControls = controlNamesArr => {
          visibleControls = visibleControls.concat(controlNamesArr.map(name => {
            return this.configControls_.hasOwnProperty(name) && this.configControls_[name].hasOwnProperty('controlType')
              ? this.configControls_[name].controlType : name
          }))

          for (let controlName of controlNamesArr) {
            if (this.configControls_.hasOwnProperty(controlName)) {
              if (this.configControls_[controlName].hasOwnProperty('contains')) {
                findContainedControls(this.configControls_[controlName].contains)
              }
            }
          }
        }

        if (!this.getMap().get('mobile')) {
          findContainedControls(this.configControls_.onMap.filter(c => c !== 'mobileControls'))
        } else if (this.configControls_.hasOwnProperty('mobileControls') &&
            this.configControls_.mobileControls.hasOwnProperty('contains')) {
          findContainedControls(this.configControls_.mobileControls.contains)
        }
      }
      for (id in documentationLocalized) {
        if (documentationLocalized.hasOwnProperty(id) && documentationLocalized[ id ]) {
          imgData = documentationLocalized[ id ].img
          descrData = documentationLocalized[ id ].descr || ''
          joinWith = documentationLocalized[ id ].joinWith || ''

          if (visibleControls.includes(id)) {
            $row = $('<tr>')

            imgElements = `<td class="${this.className_}-img"><div class="${this.className_}-imgDiv">`
            if (imgData) {
              if ($.isArray(imgData)) {
                for (let j = 0, jj = imgData.length; j < jj; j++) {
                  imgData[ j ] = `<img class="${this.className_}-docuImg" src="images/doc/${imgData[ j ]}">`
                }
                imgElements += imgData.join(joinWith)
              } else {
                imgElements += `<img class="${this.className_}-docuImg" src="images/doc/${imgData}">`
              }
            }
            imgElements += '</div></td>'

            $row.append(imgElements)
            $td = $('<td>').addClass(this.className_ + '-descr')
            if ($.isArray(descrData)) {
              $td.append(descrData.join('<p>'))
            } else {
              $td.append(descrData)
            }
            $row.append($td)
          }
          $table.append($row)
        }
      }
      return $table
    }

    this.get$Element().append(makeDocumentationTable(documentationObject, this.language))
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    if (!this.loading_) {
      let oldValue = this.active_
      if (oldValue !== active) {
        this.active_ = active
        let changeEvent = {
          type: 'change:active',
          oldValue: oldValue
        }

        if (active === true) {
          if (!this.contentData_) {
            this.loading_ = true

            $.ajax(this.documentationFileName_, { dataType: 'text' })
              .fail(() => {
                let msg = "Wasn't able to load the documentation file " + this.documentationFileName_
                Debug.error(msg)
                throw new Error(msg)
              })
              .done(data => {
                this.contentData_ = data
                this.createContent_()

                finishAllImages(this.get$Element()).then(() => {
                  this.loading_ = false
                  this.dispatchEvent(changeEvent)
                })
              })
          } else {
            this.dispatchEvent(changeEvent)
          }
        } else {
          this.dispatchEvent(changeEvent)
        }
      }
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }
}
