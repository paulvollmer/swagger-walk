const Definition = require('../src/definition')

/**
 * Swagger Definitions
 */
class Definitions {
  constructor (data) {
    this.data = data || {}
  }

  /**
   * Return the total number of definitions
   * @return {number}
   */
  total () {
    return Object.keys(this.data).length
  }

  /**
   * Walk through all definitions
   * @param {function(index: number, name: string, definition: Definition)} callback - function to exectute for each definition element.
   * @return {Definitions}
   */
  walk (callback) {
    if (this.data) {
      let index = 0
      for (var def in this.data) {
        if (this.data.hasOwnProperty(def)) {
          let defData = new Definition(this.data[def])
          callback(index, def, defData)
        }
      }
    } else {
      callback()
    }
    return this
  }
}

module.exports = Definitions
