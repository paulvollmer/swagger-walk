const expect = require('expect')
const Tag = require('../src/tag')
const spec = require('./fixtures/swagger.json')

describe('Tag', () => {
  let newTag = new Tag(spec.tags[0])

  it('hasName', () => {
    expect(newTag.hasName()).toBeA('boolean')
    expect(newTag.hasName()).toBe(true)
  })

  it('hasDescription', () => {
    expect(newTag.hasDescription()).toBeA('boolean')
    expect(newTag.hasDescription()).toBe(true)
  })
})
