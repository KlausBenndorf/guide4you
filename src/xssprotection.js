/**
 * @module xssprotection
 */

/**
 * Filters text from user input
 * @param {string} text
 * @returns {string}
 */
export function filterText (text) {
  if (text) {
    // escaping following guidelines from owasp.org
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  } else {
    return text
  }
}

/**
 * Restores the text
 * @param {string} text
 * @returns {string}
 */
export function restoreText (text) {
  if (text) {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
  } else {
    return text
  }
}
