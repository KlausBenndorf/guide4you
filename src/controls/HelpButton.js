import $ from 'jquery'

import Control from './Control'
import { checkFor, even, finishAllImages } from '../utilities'
import stripJsonComments from 'strip-json-comments/strip-json-comments'
import Debug from '../Debug'

import '../../less/helpbutton.less'

/**
 * @typedef {g4uControlOptions} HelpButtonOptions
 * @property {object} [configControls={}]
 * @property {string} fileName of the json with the helptexts
 */

/**
 * Shows a help button. Loads an json file with the helptexts and images from the server.
 */
export default class HelpButton extends Control {
  /**
   * @param {HelpButtonOptions} options
   */
  constructor (options) {
    options.element = $('<div>')[ 0 ]
    options.className = options.className || 'g4u-help'

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
    let languageSettings = this.getMap().get('localiser')

    let documentationArrays = JSON.parse(stripJsonComments(this.contentData_))

    if (checkFor(documentationArrays, languageSettings.getCurrentLang())) {
      this.language = languageSettings.getCurrentLang()
    } else if (checkFor(documentationArrays, languageSettings.getDefaultLang())) {
      this.language = languageSettings.getDefaultLang()
    } else {
      this.language = 'de'
    }

    let makeDocumentationTable = (documentation, language) => {
      let $table = $('<table>').addClass(this.className_ + '-table')
      let documentationLocalized = documentationArrays[ language ]
      let id
      let imgData
      let descrData
      let joinWith
      let imgElements
      let $row
      let $td
      let visibleControls = []

      function recursivelyFindVisibleControls (controls, arr) {
        for (let i = 0, ii = arr.length; i < ii; i++) {
          if (controls[arr[ i ]] && controls[arr[ i ]].contains) {
            for (let j = 0, jj = controls[arr[ i ]].contains.length; j < jj; j++) {
              if (visibleControls.indexOf(controls[arr[ i ]].contains[ j ]) === -1) {
                visibleControls.push(controls[arr[ i ]].contains[ j ])
              }
            }
            recursivelyFindVisibleControls(controls, controls[arr[ i ]].contains)
          }
        }
      }

      if (this.configControls_ && this.configControls_.onMap) {
        visibleControls = this.configControls_.onMap
        recursivelyFindVisibleControls(this.configControls_, visibleControls)
      }
      for (let i = 0, ii = documentationLocalized.length; i < ii; i++) {
        if (documentationLocalized[ i ]) {
          id = documentationLocalized[ i ].id
          imgData = documentationLocalized[ i ].img
          descrData = documentationLocalized[ i ].descr || ''
          joinWith = documentationLocalized[ i ].joinWith || ''

          if (visibleControls.indexOf(id) > -1) {
            $row = $('<tr>')
            if (even(i)) {
              $row.addClass('g4u-documentation-altCol')
            }

            imgElements = '<td class="g4u-documentation-img"><div class="g4u-documentation-imgDiv">'
            if (imgData) {
              if ($.isArray(imgData)) {
                for (let j = 0, jj = imgData.length; j < jj; j++) {
                  imgData[ j ] = '<img class="g4u-documentation-docuImg" src="images/doc/' + imgData[ j ] + '">'
                }
                imgElements += imgData.join(joinWith)
              } else {
                imgElements += '<img class="g4u-documentation-docuImg" src="images/doc/' + imgData + '">'
              }
            }
            imgElements += '</div></td>'

            $row.append(imgElements)
            $td = $('<td>').addClass('g4u-documentation-descr')
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

    this.get$Element().append(makeDocumentationTable(documentationArrays, this.language))
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
