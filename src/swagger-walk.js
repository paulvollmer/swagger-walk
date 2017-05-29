const request = require('request')
const Definitions = require('./definitions')
const Paths = require('./paths')
const Tags = require('./tags')

/**
 * SwaggerWalk utility to walk through paths, methods and definitions of a swagger specification.
 */
class SwaggerWalk {
  constructor () {
    /**
     * Store the swagger specification raw data
     * @type {object}
     */
    this.spec = {}
    /**
     * Store the swagger source. can be an url or filepath
     * @type {string}
     */
    this.specSource = ''

    this.tags = new Tags()
    this.paths = new Paths()
    this.definitions = new Definitions()
  }

  /**
   * Set an object as the swagger specification we want to walk.
   * @param {object} spec - the swagger specification as an object
   * @returns {this}
   */
  setSpec (spec) {
    this.spec = spec
    this.tags = new Tags(spec.tags)
    this.paths = new Paths(spec.paths)
    this.definitions = new Definitions(spec.definitions)
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
      if (res && res.statusCode !== 200) {
        cb(new Error('response failed'))
      }
      try {
        self.setSpec(JSON.parse(res.body))
      } catch (e) {
        cb(e)
      }
      self.specSource = source
      cb(null)
    })
  }
}

module.exports = SwaggerWalk
