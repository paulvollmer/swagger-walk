const expect = require('expect')
const Definitions = require('../src/definitions')
const spec = require('./fixtures/swagger.json')

describe('Definitions', () => {
  let newDefs = new Definitions(spec.definitions)

  it('total', () => {
    let totalDefs = newDefs.total()
    expect(totalDefs).toBeA('number')
    expect(totalDefs).toBe(6)
  })

  it('walk', () => {
    newDefs.walk((index, name, definition) => {
      expect(index).toBeA('number')
      expect(name).toBeA('string')
      expect(definition).toBeAn('object')
    })
  })
})
