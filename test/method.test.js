const expect = require('expect')
const Method = require('../src/method')
const spec = require('./fixtures/swagger.json')

describe('Method', () => {
  let newMethod = new Method(spec.paths['/pet'].post)

  it('hasDescription', () => {
    expect(newMethod.hasDescription()).toBe(true)
  })

  it('hasSummary', () => {
    expect(newMethod.hasSummary()).toBe(true)
  })

  it('hasTags', () => {
    expect(newMethod.hasTags()).toBe(true)
  })

  it('walkParameters', () => {
    newMethod.walkParameters((index, name, data) => {
      expect(index).toBeA('number')
      expect(name).toBeA('string')
      expect(data).toBeAn('object')
    })
  })

  it('walkResponses', () => {
    newMethod.walkResponses((index, name, data) => {
      expect(index).toBeA('number')
      expect(name).toBeA('string')
      expect(data).toBeAn('object')
    })
  })
})
