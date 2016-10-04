import $ from 'jquery'

import {Control} from './Control'
import { addTooltip } from '../html/html'
import {cssClasses} from '../globals'

import '../../less/printbutton.less'

export class PrintButton extends Control {
  /**
   * @param {g4uControlOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-printbutton'
    options.element = $('<button>').get(0)

    super(options)

    this.get$Element().addClass(this.className_)
      .addClass(cssClasses.mainButton).html(this.getLocaliser().localiseUsingDictionary('PrintButton title'))

    addTooltip(this.get$Element(), this.getLocaliser().localiseUsingDictionary('PrintButton tipLabel'))

    this.get$Element().on('click', () => this.onClick_())
  }

  /**
   * @private
   */
  onClick_ () {
    let setDivSize = function (div, mapSize) {
      $(div).innerWidth(mapSize[ 0 ])
      $(div).innerHeight(mapSize[ 1 ])
    }

    //
    // Variant A: Create a new window and copy the canvas over there. This raises security issues in IE.
    //
    // Variant B: Apply a special css class to the body that hides everything except the map for @media print
    //    DOES NOT WORK
    //      -> doesn't work because hiding everything will hide the parents of the map, too
    //
    // Variant C: Create a new body and switching it with the old body for printing
    //      -> This heavily manipulates the existing DOM-Structure and it
    //        relies on the ol-viewport div being the only child of its parent.
    //        works in IE!
    //
    // Variant D: Convert everything to a pdf
    //    IMPLEMENTED IN MODULE
    //      -> jsPDF Print Module
    //
    // Variant E: Add a function to reproduce a map in its current state on another page
    //    NOT IMPLEMENTED
    //      -> some work, but maybe useful for other functions, too
    //

    let isMapCanvasTainted = function () { // Needs to be looked into
      try {
        let viewport = this.getMap().getViewport()
        let srcCanvas = viewport.getElementsByTagName('canvas')[ 0 ]
        srcCanvas.getContext('2d').getImageData(1, 1, 1, 1)
        return false
      } catch (e) {
        return true
      }
    }

    //
    // We check if we can use variant a, if we cant, we use variant c
    //

    if (!isMapCanvasTainted()) {
      //
      // Variant A: Creating a new window and copying the canvas over there. This raises security issues in IE.
      //

      // new window
      let newWindow = window.open('', '_blank')

      let jStyleDiv = $('<div>').append(
        $('style').clone()
      ).append(
        $('link[type="text/css"]').clone()
      )

      // copying the map
      let viewport = this.getMap().getViewport()
      let mapClone = viewport.parentNode.cloneNode(true)
      setDivSize(mapClone, this.getMap().getSize())
      let srcCanvas = viewport.getElementsByTagName('canvas')[ 0 ]
      let destCanvas = mapClone.getElementsByTagName('canvas')[ 0 ]
      let destContext = destCanvas.getContext('2d')
      destContext.drawImage(srcCanvas, 0, 0)
      let newdoc = newWindow.document

      // writing the document
      newdoc.open()
      newdoc.write('<!doctype html>')
      newdoc.write('<html>')
      newdoc.write('<head>')
      newdoc.write('<title>')
      newdoc.write(this.getLocaliser().localiseUsingDictionary('PrintButton windowTitle'))
      newdoc.write('</title>')
      newdoc.write(jStyleDiv.html())
      newdoc.write('<script type="text/javascript">')
      newdoc.write('window.onload = function () {\n')
      newdoc.write('\twindow.focus();\n')
      newdoc.write('\tsetTimeout( function () {\n') // we need to wait till the map is appended
      newdoc.write('\t\twindow.print();\n')
      newdoc.write('\t\twindow.close();\n')
      newdoc.write('\t}, 50);\n')
      newdoc.write('};')
      newdoc.write('</script>')
      newdoc.write('</head>')
      newdoc.write('</html>')
      newdoc.close()

      newWindow.onload = function () {
        newdoc.getElementsByTagName('body')[ 0 ].appendChild(mapClone)
      }

      newWindow.focus()
    } else {
      //
      // Variant C: Creating a new body and switching it with the old body for printing
      //

      let $mapViewport = $(this.getMap().getViewport())
      let $mapParent = $mapViewport.parent()
      let $mapContainer = $mapParent.clone().empty().append($mapViewport)
      setDivSize($mapContainer, this.getMap().getSize())
      let $oldbody = $('body')
      let $newbody = $('<body>').append($mapContainer)
      document.body = $newbody.get(0)
      window.print()
      document.body = $oldbody.get(0)
      $mapParent.append($mapViewport)
    }

    this.dispatchEvent('click')
  }
}
