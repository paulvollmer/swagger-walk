const expect = require('expect')
const Tags = require('../src/tags')
const spec = require('./fixtures/swagger.json')

describe('Tags', () => {
  let newTags = new Tags(spec.tags)

  it('total', () => {
    let totalTags = newTags.total()
    expect(totalTags).toBeA('number')
    expect(totalTags).toBe(3)
  })

  it('walk', () => {
    newTags.walk((index, tag) => {
      expect(index).toBeA('number')
      expect(tag).toBeAn('object')
      expect(tag.hasName()).toBe(true)
      expect(tag.hasDescription()).toBe(true)
    })
  })
})
