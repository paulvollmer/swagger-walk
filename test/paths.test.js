const expect = require('expect')
const Paths = require('../src/paths')
const spec = require('./fixtures/swagger.json')

describe('Paths', () => {
  let newPaths = new Paths(spec.paths)

  it('total', () => {
    let totalPaths = newPaths.total()
    expect(totalPaths).toBeA('number')
    expect(totalPaths).toBe(14)
  })

  it('walk', () => {
    newPaths.walk((index, path, methods) => {
        // console.log(index, path)
      expect(index).toBeA('number')
      expect(path).toBeA('string')
      expect(methods).toBeAn('object')
        // expect(methods.total()).toBeA('number')
    })
  })

  it('walkPathMethods', () => {
    newPaths.walkMethods((index, path, method, data) => {
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
