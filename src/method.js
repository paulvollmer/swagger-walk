/**
 * Swagger method utility
 */
class Method {
  constructor (data) {
    this.data = data
  }

  /**
   * Check if the method has a description
   * @return {boolean}
   */
  hasDescription () {
    if (this.data.description === undefined) {
      return false
    }
    return true
  }

  /**
   * Check if the method has a summaty
   * @return {boolean}
   */
  hasSummary () {
    if (this.data.summary === undefined) {
      return false
    }
    return true
  }

  /**
   * Check if the method has tags
   * @return {boolean}
   */
  hasTags () {
    if (this.data.tags === undefined) {
      return false
    }
    return true
  }

  /**
   * Walk through all parameters
   * @param {function} fn - function to exectute for each parameter element. taking three arguments:
   */
  walkParameters (fn) {
    if (this.data.parameters !== undefined) {
      let index = 0
      for (var param in this.data.parameters) {
        if (this.data.parameters.hasOwnProperty(param)) {
          fn(index, param, this.data.parameters[param])
        }
        index++
      }
    }
  }

  /**
   * Walk through all responses
   * @param {function} fn - function to exectute for each response element. taking three arguments:
   */
  walkResponses (fn) {
    if (this.data.responses !== undefined) {
      let index = 0
      for (var res in this.data.responses) {
        if (this.data.responses.hasOwnProperty(res)) {
          fn(index, res, this.data.responses[res])
        }
        index++
      }
    }
  }
}

module.exports = Method
