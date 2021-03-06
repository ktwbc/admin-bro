const fs = require('fs')
const path = require('path')
const util = require('util')
const bundler = require('./bundler')

const tmpPath = '.adminbro'
const entryPath = path.join(tmpPath, '.entry.js')
const generateEntry = require('./generate-user-component-entry')

async function build(admin) {
  const entryFile = generateEntry(admin)

  try {
    await util.promisify(fs.mkdir)(tmpPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') { throw error }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile)

  return bundler({
    name: 'AdminBroCustom',
    input: entryPath,
  })
}

module.exports = build
