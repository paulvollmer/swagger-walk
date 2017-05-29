/**
 * Swagger Path
 */
class Path {
  constructor (data) {
    this.data = data
  }

  // hasMethod (name) {
  //
  // }

  /**
   * Return the number of methods
   * @return {number}
   */
  totalMethods () {
    return Object.keys(this.data).length
  }

  /**
   * Walk through all methods
   * @param {function} fn - function to exectute for each method element. taking three arguments:
   */
  walkMethods (fn) {
    if (this.data !== undefined) {
      let index = 0
      for (var method in this.data) {
        if (this.data.hasOwnProperty(method)) {
          fn(index, method, this.data[method])
        }
        index++
      }
    }
  }

  /**
   * Get a method by name
   * @param {string} name - The name of the method element
   * @return {object}
   */
  getMethod (name) {
    if (this.data !== undefined) {
      for (var method in this.data) {
        if (this.data.hasOwnProperty(method)) {
          if (method === name) {
            return this.data[method]
          }
        }
      }
    }
    return null
  }
}

module.exports = Path
