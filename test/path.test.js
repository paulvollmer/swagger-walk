const expect = require('expect')
const Path = require('../src/path')
const spec = require('./fixtures/swagger.json')

describe('Path', () => {
  let newPath = new Path(spec.paths['/pet'])

  it('getMethod', () => {
    expect(newPath.totalMethods()).toBeA('number')
    expect(newPath.totalMethods()).toBe(2)
  })

  it('walkMethods', () => {
    newPath.walkMethods((index, name, method) => {
      expect(index).toBeA('number')
      expect(name).toBeA('string')
      expect(method).toBeA('object')
    })
  })

  it('getMethod', () => {
    let methodPost = newPath.getMethod('post')
    expect(methodPost).toBeA('object')
    expect(methodPost.description).toBe('get pet')
  })

  //
  // it('hasName', () => {
  //   expect(newPath.hasName()).toBeA('boolean')
  //   expect(newPath.hasName()).toBe(true)
  // })
})
