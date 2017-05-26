/**
 * Swagger tag utility
 */
class Tag {
  constructor (data) {
    /**
     * Store the tag data
     * @type {object}
     */
    this.data = data
  }

  /**
   * Check if the tag has a name property.
   * @returns {boolean}
   */
  hasName () {
    if (this.data.name === undefined) {
      return false
    }
    return true
  }

  /**
   * Check if the tag has a description property.
   * @returns {boolean}
   */
  hasDescription () {
    if (this.data.description === undefined) {
      return false
    }
    return true
  }
}

module.exports = Tag
