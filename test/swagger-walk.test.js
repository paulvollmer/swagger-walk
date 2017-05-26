const expect = require('expect')
const SwaggerWalk = require('../src/swagger-walk')
const spec = require('./fixtures/swagger.json')

describe('SwaggerWalk', () => {
  describe('loadSpec', () => {
    it('load a swagger specification from a http-server', done => {
      let walker = new SwaggerWalk()
      let source = 'http://petstore.swagger.io/v2/swagger.json'
      walker.loadSpec(source, (err) => {
        expect(err).toBe(null)
        expect(walker.specSource).toBe(source)
        expect(walker.spec.swagger).toBe('2.0')
        done()
      })
    })
    it.skip('load a swagger specification from a local file', done => {
      let walker = new SwaggerWalk()
      let source = './fixtures/swagger.json'
      walker.loadSpec(source, (err) => {
        expect(err).toBe(null)
        expect(walker.specSource).toBe(source)
        expect(walker.spec.swagger).toBe('2.0')
        done()
      })
    })
  })

  describe('setSpec', () => {
    it('set a swagger object to the walker', () => {
      let walker = new SwaggerWalk()
      walker.setSpec(spec)
      expect(walker.spec.swagger).toBe('2.0')
    })
  })

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

  describe.only('Definitions', () => {
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

        expect(data.isType('object')).toBeA('boolean')
        expect(data.isType('object')).toBe(true)

        expect(data.totalProperties()).toNotBe(0)
        data.walkProperties((index, name, data) => {
          // console.log(index, name)
        })
      })
    })
  })
})
