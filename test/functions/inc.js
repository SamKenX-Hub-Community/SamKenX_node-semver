const { test } = require('tap')
const inc = require('../../functions/inc')
const parse = require('../../functions/parse')

test('increment versions test', (t) => {
//  [version, inc, result, identifier]
//  inc(version, inc) -> result
  [['1.2.3', 'major', '2.0.0'],
    ['1.2.3', 'minor', '1.3.0'],
    ['1.2.3', 'patch', '1.2.4'],
    ['1.2.3tag', 'major', '2.0.0', true],
    ['1.2.3-tag', 'major', '2.0.0'],
    ['1.2.3', 'fake', null],
    ['1.2.0-0', 'patch', '1.2.0'],
    ['fake', 'major', null],
    ['1.2.3-4', 'major', '2.0.0'],
    ['1.2.3-4', 'minor', '1.3.0'],
    ['1.2.3-4', 'patch', '1.2.3'],
    ['1.2.3-alpha.0.beta', 'major', '2.0.0'],
    ['1.2.3-alpha.0.beta', 'minor', '1.3.0'],
    ['1.2.3-alpha.0.beta', 'patch', '1.2.3'],
    ['1.2.4', 'prerelease', '1.2.5-0'],
    ['1.2.3-0', 'prerelease', '1.2.3-1'],
    ['1.2.3-alpha.0', 'prerelease', '1.2.3-alpha.1'],
    ['1.2.3-alpha.1', 'prerelease', '1.2.3-alpha.2'],
    ['1.2.3-alpha.2', 'prerelease', '1.2.3-alpha.3'],
    ['1.2.3-alpha.0.beta', 'prerelease', '1.2.3-alpha.1.beta'],
    ['1.2.3-alpha.1.beta', 'prerelease', '1.2.3-alpha.2.beta'],
    ['1.2.3-alpha.2.beta', 'prerelease', '1.2.3-alpha.3.beta'],
    ['1.2.3-alpha.10.0.beta', 'prerelease', '1.2.3-alpha.10.1.beta'],
    ['1.2.3-alpha.10.1.beta', 'prerelease', '1.2.3-alpha.10.2.beta'],
    ['1.2.3-alpha.10.2.beta', 'prerelease', '1.2.3-alpha.10.3.beta'],
    ['1.2.3-alpha.10.beta.0', 'prerelease', '1.2.3-alpha.10.beta.1'],
    ['1.2.3-alpha.10.beta.1', 'prerelease', '1.2.3-alpha.10.beta.2'],
    ['1.2.3-alpha.10.beta.2', 'prerelease', '1.2.3-alpha.10.beta.3'],
    ['1.2.3-alpha.9.beta', 'prerelease', '1.2.3-alpha.10.beta'],
    ['1.2.3-alpha.10.beta', 'prerelease', '1.2.3-alpha.11.beta'],
    ['1.2.3-alpha.11.beta', 'prerelease', '1.2.3-alpha.12.beta'],
    ['1.2.0', 'prepatch', '1.2.1-0'],
    ['1.2.0-1', 'prepatch', '1.2.1-0'],
    ['1.2.0', 'preminor', '1.3.0-0'],
    ['1.2.3-1', 'preminor', '1.3.0-0'],
    ['1.2.0', 'premajor', '2.0.0-0'],
    ['1.2.3-1', 'premajor', '2.0.0-0'],
    ['1.2.0-1', 'minor', '1.2.0'],
    ['1.0.0-1', 'major', '1.0.0'],

    ['1.2.3', 'major', '2.0.0', false, 'dev'],
    ['1.2.3', 'minor', '1.3.0', false, 'dev'],
    ['1.2.3', 'patch', '1.2.4', false, 'dev'],
    ['1.2.3tag', 'major', '2.0.0', true, 'dev'],
    ['1.2.3-tag', 'major', '2.0.0', false, 'dev'],
    ['1.2.3', 'fake', null, false, 'dev'],
    ['1.2.0-0', 'patch', '1.2.0', false, 'dev'],
    ['fake', 'major', null, false, 'dev'],
    ['1.2.3-4', 'major', '2.0.0', false, 'dev'],
    ['1.2.3-4', 'minor', '1.3.0', false, 'dev'],
    ['1.2.3-4', 'patch', '1.2.3', false, 'dev'],
    ['1.2.3-alpha.0.beta', 'major', '2.0.0', false, 'dev'],
    ['1.2.3-alpha.0.beta', 'minor', '1.3.0', false, 'dev'],
    ['1.2.3-alpha.0.beta', 'patch', '1.2.3', false, 'dev'],
    ['1.2.4', 'prerelease', '1.2.5-dev.0', false, 'dev'],
    ['1.2.3-0', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.0', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.0', 'prerelease', '1.2.3-alpha.1', false, 'alpha'],
    ['1.2.3-alpha.0.beta', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.0.beta', 'prerelease', '1.2.3-alpha.1.beta', false, 'alpha'],
    ['1.2.3-alpha.10.0.beta', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.10.0.beta', 'prerelease', '1.2.3-alpha.10.1.beta', false, 'alpha'],
    ['1.2.3-alpha.10.1.beta', 'prerelease', '1.2.3-alpha.10.2.beta', false, 'alpha'],
    ['1.2.3-alpha.10.2.beta', 'prerelease', '1.2.3-alpha.10.3.beta', false, 'alpha'],
    ['1.2.3-alpha.10.beta.0', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.10.beta.0', 'prerelease', '1.2.3-alpha.10.beta.1', false, 'alpha'],
    ['1.2.3-alpha.10.beta.1', 'prerelease', '1.2.3-alpha.10.beta.2', false, 'alpha'],
    ['1.2.3-alpha.10.beta.2', 'prerelease', '1.2.3-alpha.10.beta.3', false, 'alpha'],
    ['1.2.3-alpha.9.beta', 'prerelease', '1.2.3-dev.0', false, 'dev'],
    ['1.2.3-alpha.9.beta', 'prerelease', '1.2.3-alpha.10.beta', false, 'alpha'],
    ['1.2.3-alpha.10.beta', 'prerelease', '1.2.3-alpha.11.beta', false, 'alpha'],
    ['1.2.3-alpha.11.beta', 'prerelease', '1.2.3-alpha.12.beta', false, 'alpha'],
    ['1.2.0', 'prepatch', '1.2.1-dev.0', false, 'dev'],
    ['1.2.0-1', 'prepatch', '1.2.1-dev.0', false, 'dev'],
    ['1.2.0', 'preminor', '1.3.0-dev.0', false, 'dev'],
    ['1.2.3-1', 'preminor', '1.3.0-dev.0', false, 'dev'],
    ['1.2.0', 'premajor', '2.0.0-dev.0', false, 'dev'],
    ['1.2.3-1', 'premajor', '2.0.0-dev.0', false, 'dev'],
    ['1.2.0-1', 'minor', '1.2.0', false, 'dev'],
    ['1.0.0-1', 'major', '1.0.0', 'dev'],
    ['1.2.3-dev.bar', 'prerelease', '1.2.3-dev.0', false, 'dev']

  ].forEach((v) => {
    const pre = v[0]
    const what = v[1]
    const wanted = v[2]
    const loose = v[3]
    const id = v[4]
    const found = inc(pre, what, loose, id)
    const cmd = `inc(${pre}, ${what}, ${id})`
    t.equal(found, wanted, `${cmd} === ${wanted}`)

    const parsed = parse(pre, loose)
    if (wanted) {
      parsed.inc(what, id)
      t.equal(parsed.version, wanted, `${cmd} object version updated`)
      t.equal(parsed.raw, wanted, `${cmd} object raw field updated`)
    } else if (parsed) {
      t.throws(() => {
        parsed.inc(what, id)
      })
    } else {
      t.equal(parsed, null)
    }
  })

  t.end()
})
