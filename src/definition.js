/**
 * Swagger Definition
 */
class Definition {
  constructor (data) {
    this.data = data
  }

  /**
   * Check if the definition is the given type
   * @param {string} type - the type of the definition (number, string, object etc.)
   * @return {boolean}
   */
  isType (type) {
    if (this.data.type === type) {
      return true
    }
    return false
  }

  /**
   * Return the number of properties
   * @return {number}
   */
  totalProperties () {
    return Object.keys(this.data.properties).length
  }

  /**
   * Walk through all properties
   * @param {function} fn - function to exectute for each property element. taking three arguments:
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

  /**
   * Get a property by name
   * @param {string} name - The name of the property element
   * @return {object}
   */
  getProperty (name) {
    if (this.data.properties !== undefined) {
      for (var prop in this.data.properties) {
        if (this.data.properties.hasOwnProperty(prop)) {
          if (prop === name) {
            return this.data.properties[prop]
          }
        }
      }
    }
    return null
  }
}

module.exports = Definition
