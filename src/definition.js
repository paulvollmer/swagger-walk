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
   * @return {{index: number, prop: string, data: object}}
   */
  getProperty (name) {
    let tmpData = {index: null, prop: null, data: null}
    if (this.data.properties !== undefined) {
      let index = 0
      for (var prop in this.data.properties) {
        if (this.data.properties.hasOwnProperty(prop)) {
          if (prop === name) {
            tmpData.index = index
            tmpData.prop = prop
            tmpData.data = this.data.properties[prop]
            return tmpData
          }
        }
        index++
      }
    }
    return tmpData
  }
}

module.exports = Definition
