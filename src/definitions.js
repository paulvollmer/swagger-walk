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
   * @param {function} fn - function to exectute for each definition element.
   */
  walk (fn) {
    if (this.data) {
      let index = 0
      for (var def in this.data) {
        if (this.data.hasOwnProperty(def)) {
          let defData = new Definition(this.data[def])
          fn(index, def, defData)
        }
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }
}

module.exports = Definitions
