const { launch } = require('@vue/cli-shared-utils')
const path = require('path')
// Connectors
const cwd = require('./cwd')
const git = require('./git')

async function openInEditor (input, context) {
  let query
  if (input.gitPath) {
    query = await git.resolveFile(input.file, context)
  } else {
    query = path.resolve(cwd.get(), input.file)
  }
  if (input.line) {
    query += `:${input.line}`
    if (input.column) {
      query += `:${input.column}`
    }
  }
  console.info(`Opening file '${query}' in code editor...`)
  launch(query)
  return true
}

module.exports = {
  openInEditor
}
