const expect = require('expect')
const Definition = require('../src/definition')
const spec = require('./fixtures/swagger.json')

describe('Definition', () => {
  it('new', () => {
    let newDef = new Definition(spec.definitions['Order'])

    expect(newDef.isType('object')).toBe(true)
    expect(newDef.totalProperties()).toBe(6)

    let tmp = newDef.getProperty('id')
    expect(tmp.index).toBe(0)
    expect(tmp.prop).toBe('id')
    expect(tmp.data.type).toBe('integer')
    expect(tmp.data.format).toBe('int64')
  })
})
