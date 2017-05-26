const request = require('request')
const Definition = require('./definition')
const Method = require('./method')
const Path = require('./path')
const Tag = require('./tag')

/**
 * SwaggerWalk utility to walk through paths, methods and definitions of a swagger specification.
 */
class SwaggerWalk {
  constructor () {
    /**
     * Store the swagger specification data
     * @type {object}
     */
    this.spec = {}
    /**
     * Store the swagger source. can be an url or filepath
     * @type {string}
     */
    this.specSource = ''
  }

  /**
   * Set an object as the swagger specification we want to walk.
   * @param {object} spec - the swagger specification as an object
   * @returns {this}
   */
  setSpec (spec) {
    this.spec = spec
    return this
  }

  /**
   * Load a swagger specification from an URL or a filepath.
   * TODO: read local fils
   * @param {string} source - URL or filepath to the swagger specification
   * @param {function} cb - The callback
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
        let tagData = new Tag(this.spec.tags[i])
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
          let pathData = new Path(this.spec.paths[path])
          fn(index, path, pathData)
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
              let methodData = new Method(this.spec.paths[path][method])
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
          let defData = new Definition(this.spec.definitions[def])
          fn(index, def, defData)
        }
      }
    } else {
      fn(0, undefined, undefined)
    }
    return this
  }
}

module.exports = SwaggerWalk
