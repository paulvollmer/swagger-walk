const expect = require('expect')
const Definition = require('../src/definition')
const spec = require('./fixtures/swagger.json')

describe('Definition', () => {
  let newDef = new Definition(spec.definitions['Order'])

  it('isType', () => {
    expect(newDef.isType('object')).toBeA('boolean')
    expect(newDef.isType('object')).toBe(true)
  })

  it('totalProperties', () => {
    expect(newDef.totalProperties()).toBeA('number')
    expect(newDef.totalProperties()).toBe(6)
  })

  it('walkProperty', () => {
    newDef.walkProperties((index, name, data) => {
      expect(index).toBeA('number')
      expect(name).toBeA('string')
      expect(data).toBeA('object')
    })
  })

  it('getProperty', () => {
    let tmp = newDef.getProperty('id')
    expect(tmp).toBeA('object')
    expect(tmp.type).toBe('integer')
    expect(tmp.format).toBe('int64')
  })
})
