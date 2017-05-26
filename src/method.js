/**
 * Swagger method utility
 */
class Method {
  constructor (data) {
    this.data = data
  }

  /**
   *
   */
  hasDescription () {
    if (this.data.description === undefined) {
      return false
    }
    return true
  }

  /**
   *
   */
  hasSummary () {
    if (this.data.summary === undefined) {
      return false
    }
    return true
  }

  /**
   *
   */
  hasTags () {
    if (this.data.tags === undefined) {
      return false
    }
    return true
  }

  /**
   *
   */
  walkParameters() {

  }

  /**
   *
   */
  walkResponses() {

  }

}

module.exports = Method
