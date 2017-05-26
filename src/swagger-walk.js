/**
 * SwaggerWalk utility
 */
class SwaggerWalk {
  constructor () {
    this.spec = {}
  }

  setSpec (spec) {
    this.spec = spec
    return this
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
