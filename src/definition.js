/**
 * Swagger definition utility to walk through the properties
 */
class Definition {
  constructor (data) {
    this.data = data
  }

  /**
   * Check if the definition is the given type
   * @param {string} type - the type of the definition (number, string, object etc.)
   * @returns {boolean}
   */
  isType (type) {
    if (this.data.type === type) {
      return true
    }
    return false
  }

  /**
   * return the number of properties
   */
  totalProperties () {
    return Object.keys(this.data.properties).length
  }

  /**
   * walk through each property
   */
  walkProperties (fn) {
    if (this.data.properties !== undefined) {
      let index = 0
      for (var prop in this.data.properties) {
        if (this.data.properties.hasOwnProperty(prop)) {
          fn(index, prop, this.data.properties[prop])
        }
        index++
      }
    }
  }
}

module.exports = Definition
