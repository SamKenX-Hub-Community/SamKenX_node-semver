const { test } = require('tap')
const Comparator = require('../../classes/comparator')

test('comparator testing', t => {
  const c = new Comparator('>=1.2.3')
  t.ok(c.test('1.2.4'))
  const c2 = new Comparator(c)
  t.ok(c2.test('1.2.4'))
  const c3 = new Comparator(c, true)
  t.ok(c3.test('1.2.4'))
  // test an invalid version, should not throw
  const c4 = new Comparator(c)
  t.notOk(c4.test('not a version string'))
  t.end()
})

test('tostrings', (t) => {
  t.equal(new Comparator('>= v1.2.3').toString(), '>=1.2.3')
  t.end()
})
