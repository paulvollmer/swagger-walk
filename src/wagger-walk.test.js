const expect = require('expect')
const SwaggerWalk = require('./swagger-walk')
const spec = require('./fixtures/swagger.json')

describe('SwaggerWalk', () => {
  let walker = new SwaggerWalk()
  walker.setSpec(spec)

  describe('Tags', () => {
    it('totalTags', () => {
      let totalTags = walker.totalTags()
      expect(totalTags).toBeA('number')
      expect(totalTags).toBe(3)
    })

    it('walkTags', () => {
      walker.walkTags((index, tag) => {
        expect(index).toBeA('number')
        expect(tag).toBeAn('object')

        expect(tag.hasName()).toBe(true)
        expect(tag.hasDescription()).toBe(true)
      })
    })
  })

  describe('Paths', () => {
    it('totalPaths', () => {
      let totalPaths = walker.totalPaths()
      expect(totalPaths).toBeA('number')
      expect(totalPaths).toBe(14)
    })

    it('walkPaths', () => {
      walker.walkPaths((index, path, methods) => {
        // console.log(index, path)
        expect(index).toBeA('number')
        expect(path).toBeA('string')
        expect(methods).toBeAn('object')

        // expect(methods.total()).toBeA('number')
      })
    })

    it('walkPathMethods', () => {
      walker.walkPathMethods((index, path, method, data) => {
        // console.log(index, path, method)
        expect(index).toBeA('number')
        expect(path).toBeA('string')
        expect(method).toBeA('string')
        expect(data).toBeAn('object')

        // expect(methods.hasName()).toBe(true)
        expect(data.hasDescription()).toBe(true)

        // data.hasParameters()
        // data.hasResponses()
      })
    })
  })

  describe('Definitions', () => {
    it('totalDefinitions', () => {
      let totalDefinitions = walker.totalDefinitions()
      expect(totalDefinitions).toBeA('number')
      expect(totalDefinitions).toBe(6)
    })

    it('walkDefinitions', () => {
      walker.walkDefinitions((index, definition, data) => {
        // console.log(index, definition)
        expect(index).toBeA('number')
        expect(definition).toBeA('string')
        expect(data).toBeAn('object')
      })
    })
  })
})
