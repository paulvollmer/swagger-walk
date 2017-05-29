const Path = require('./path')
const Method = require('./method')

/**
 * Swagger Paths
 */
class Paths {
  constructor (data) {
    this.data = data || {}
  }

  /**
   * Return the total number of paths
   * @return {number}
   */
  total () {
    return Object.keys(this.data).length
  }

  /**
   * Walk through all paths
   * @param {function} fn - function to exectute for each path element.
   */
  walk (fn) {
    if (this.data !== undefined) {
      let index = 0
      for (var path in this.data) {
        if (this.data.hasOwnProperty(path)) {
          let pathData = new Path(this.data[path])
          fn(index, path, pathData)
        }
        index++
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }

  /**
   * Walk through all paths methods
   * @param {function} fn - function to exectute for each paths method element.
   */
  walkMethods (fn) {
    if (this.data !== undefined) {
      let index = 0
      for (var path in this.data) {
        if (this.data.hasOwnProperty(path)) {
          for (var method in this.data[path]) {
            if (this.data[path].hasOwnProperty(method)) {
              let methodData = new Method(this.data[path][method])
              fn(index, path, method, methodData)
            }
          }
        }
        index++
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }
}

module.exports = Paths
