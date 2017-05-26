const request = require('request')

/**
 * SwaggerWalk utility
 */
class SwaggerWalk {
  constructor () {
    /**
     * stoe the swagger specification data
     * @type {object}
     */
    this.spec = {}
    /**
     * store the swagger source. can be an url or filepath
     * @type {string}
     */
    this.specSource = ''
  }

  /**
   * set an object as swagger specification
   * @param {object} spec - the swagger specification as an object
   * @returns {this}
   */
  setSpec (spec) {
    this.spec = spec
    return this
  }

  /**
   * load a swagger specification from an url or a filepath
   * @param {string} source - url of filepath to the swagger specification
   * @param {function} cb - the callback
   */
  loadSpec (source, cb) {
    let self = this
    request(source, function (err, res, body) {
      if (err) {
        cb(err)
      }
      // console.log('statusCode:', res && res.statusCode);
      if (res && res.statusCode !== 200) {
        cb(new Error('response failed'))
      }
      try {
        self.spec = JSON.parse(res.body)
      } catch (e) {
        cb(e)
      }

      self.specSource = source
      cb(null)
    })
  }

  // Tags

  walkTags (fn) {
    if (this.spec.tags !== undefined) {
      for (var i = 0; i < this.spec.tags.length; i++) {
        let tagData = new SwaggerTag(this.spec.tags[i])
        // tagData.name = this.spec.tags[i].name
        // tagData.description = this.spec.tags[i].description
        fn(i, tagData)
      }
    } else {
      fn(0, undefined)
    }
    return this
  }

  totalTags () {
    if (this.spec.tags !== undefined) {
      return this.spec.tags.length
    }
    return 0
  }

  // Paths

  walkPaths (fn) {
    if (this.spec.paths !== undefined) {
      let index = 0
      for (var path in this.spec.paths) {
        if (this.spec.paths.hasOwnProperty(path)) {
          fn(index, path, this.spec.paths[path])
        }
        index++
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }

  totalPaths () {
    return Object.keys(this.spec.paths).length
  }

  walkPathMethods (fn) {
    if (this.spec.paths !== undefined) {
      let index = 0
      for (var path in this.spec.paths) {
        if (this.spec.paths.hasOwnProperty(path)) {
          for (var method in this.spec.paths[path]) {
            if (this.spec.paths[path].hasOwnProperty(method)) {
              let methodData = new SwaggerMethod(this.spec.paths[path][method])
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

  // Definitions

  totalDefinitions () {
    return Object.keys(this.spec.definitions).length
  }

  walkDefinitions (fn) {
    if (this.spec.definitions) {
      let index = 0
      for (var def in this.spec.definitions) {
        if (this.spec.definitions.hasOwnProperty(def)) {
          fn(index, def, this.spec.definitions[def])
        }
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }
}

class SwaggerTag {
  constructor (data) {
    this.data = data
  }

  hasName () {
    if (this.data.name === undefined) {
      return false
    }
    return true
  }

  hasDescription () {
    return true
  }
}

class SwaggerMethod {
  constructor (data) {
    this.data = data
  }

  hasDescription () {
    if (this.data.description === undefined) {
      return false
    }
    return true
  }
  hasSummary () {
    if (this.data.summary === undefined) {
      return false
    }
    return true
  }

  hasTags () {
    if (this.data.tags === undefined) {
      return false
    }
    return true
  }
}

module.exports = SwaggerWalk
