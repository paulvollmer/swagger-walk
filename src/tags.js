const Tag = require('./tag')

/**
 * Swagger Tags
 */
class Tags {
  constructor (data) {
    /**
     * Store the tags data
     * @type {array}
     */
    this.data = data || []
  }

  /**
   * Return the total number of tags
   * @return {number}
   */
  total () {
    if (this.data !== undefined) {
      return this.data.length
    }
    return 0
  }

  /**
   * Walk through all tags
   * @param {function} fn - function to exectute for each tag element.
   */
  walk (fn) {
    if (this.data !== undefined) {
      for (var i = 0; i < this.data.length; i++) {
        let tagData = new Tag(this.data[i])
        fn(i, tagData)
      }
    } else {
      fn(0, undefined)
    }
    return this
  }
}

module.exports = Tags
