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
   * @param {function(index: number, tag: Tag)} callback - function to exectute for each tag element.
   * @return {Tags}
   */
  walk (callback) {
    if (this.data !== undefined) {
      for (var i = 0; i < this.data.length; i++) {
        let tagData = new Tag(this.data[i])
        callback(i, tagData)
      }
    } else {
      callback()
    }
    return this
  }
}

module.exports = Tags
