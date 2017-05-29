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
   * @param {function(index: number, name: string, path: Path)} callback - function to exectute for each path element.
   * @return {Paths}
   */
  walk (callback) {
    if (this.data !== undefined) {
      let index = 0
      for (var path in this.data) {
        if (this.data.hasOwnProperty(path)) {
          let pathData = new Path(this.data[path])
          callback(index, path, pathData)
        }
        index++
      }
    } else {
      callback()
    }
    return this
  }

  /**
   * Walk through all paths methods
   * @param {function(index: number, name: string, methodName: string, method: Path)} callback - function to exectute for each paths method element.
   * @return {Paths}
   */
  walkMethods (callback) {
    if (this.data !== undefined) {
      let index = 0
      for (var path in this.data) {
        if (this.data.hasOwnProperty(path)) {
          for (var method in this.data[path]) {
            if (this.data[path].hasOwnProperty(method)) {
              let methodData = new Method(this.data[path][method])
              callback(index, path, method, methodData)
            }
          }
        }
        index++
      }
    } else {
      callback()
    }
    return this
  }
}

module.exports = Paths
