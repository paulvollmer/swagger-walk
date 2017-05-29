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
        expect(walker.specSource).toBeA('string')
        expect(walker.specSource).toBe(source)
        expect(walker.spec.swagger).toBeA('string')
        expect(walker.spec.swagger).toBe('2.0')
        done()
      })
    })
    it.skip('load a swagger specification from a local file', done => {
      let walker = new SwaggerWalk()
      let source = './fixtures/swagger.json'
      walker.loadSpec(source, (err) => {
        expect(err).toBe(null)
        expect(walker.specSource).toBeA('string')
        expect(walker.specSource).toBe(source)
        expect(walker.spec.swagger).toBeA('string')
        expect(walker.spec.swagger).toBe('2.0')
        done()
      })
    })
  })

  describe('setSpec', () => {
    it('set a swagger object to the walker', () => {
      let walker = new SwaggerWalk()
      walker.setSpec(spec)
      expect(walker.spec.swagger).toBeA('string')
      expect(walker.spec.swagger).toBe('2.0')
    })
  })

  let walker = new SwaggerWalk()
  walker.setSpec(spec)

  describe('tags', () => {
    it('total', () => {
      let totalTags = walker.tags.total()
      expect(totalTags).toBeA('number')
      expect(totalTags).toBe(3)
    })

    it('walk', () => {
      walker.tags.walk((index, tag) => {
        expect(index).toBeA('number')
        expect(tag).toBeAn('object')
        expect(tag.hasName()).toBe(true)
        expect(tag.hasDescription()).toBe(true)
      })
    })
  })

  describe('paths', () => {
    it('total', () => {
      let totalPaths = walker.paths.total()
      expect(totalPaths).toBeA('number')
      expect(totalPaths).toBe(14)
    })

    it('walk', () => {
      walker.paths.walk((index, path, methods) => {
        // console.log(index, path)
        expect(index).toBeA('number')
        expect(path).toBeA('string')
        expect(methods).toBeAn('object')
        // expect(methods.total()).toBeA('number')
      })
    })

    it('walkMethods', () => {
      walker.paths.walkMethods((index, path, method, data) => {
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

  describe('definitions', () => {
    it('total', () => {
      let totalDefinitions = walker.definitions.total()
      expect(totalDefinitions).toBeA('number')
      expect(totalDefinitions).toBe(6)
    })

    it('walk', () => {
      walker.definitions.walk((index, name, definition) => {
        // console.log(index, definition)
        expect(index).toBeA('number')
        expect(name).toBeA('string')
        expect(definition).toBeAn('object')

        expect(definition.isType('object')).toBeA('boolean')
        expect(definition.isType('object')).toBe(true)

        expect(definition.totalProperties()).toNotBe(0)
        // data.walkProperties((index, name, data) => {
        //   // console.log(index, name)
        // })

        // let tmpProp = data.getProperties('pet')
        // console.log(tmpProp.index, tmpProp.name, tmpProp.data)
      })
    })
  })
})
