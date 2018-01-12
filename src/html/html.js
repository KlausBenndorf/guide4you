/**
 * @module html
 * html helper functions
 */

import $ from 'jquery'
import {cssClasses} from '../globals'

/**
 * This function gets an $element inside a $context in fornt of all of them
 * @param {jQuery} $element
 * @param {jQuery} $context
 */
export function getInFront ($element, $context) {
  let highest = 0

  $context = $context || $(document)

  let foundAbsolute = false

  $element.parents().each((i, el) => {
    if (!$(el).is($context)) {
      if ($(el).css('position') === 'absolute') {
        foundAbsolute = true
        getInFront($(el), $context)
        getInFront($element, $(el))
      }
    }
  })

  if (!foundAbsolute) {
    $context
      .find('*:visible')
      .not((i, el) => el !== $element[0] && $(el).parents().is($element))
      .each(function () {
        let current = parseInt($(this).css('z-index'), 10)
        if (current && highest < current) {
          highest = current
        }
      })

    $element.css('z-index', highest + 1)
  }
}

/**
 * @param {jQuery} $element
 * @param {string} text
 */
export function addTooltip ($element, text) {
  $element
    .addClass(cssClasses.hasTooltip)
    .append($('<span role="tooltip">')
      .html(text))
}

/**
 * @param {jQuery} $element
 * @param {string} text
 */
export function changeTooltip ($element, text) {
  $element
    .find('[role=tooltip]')
    .html(text)
}
