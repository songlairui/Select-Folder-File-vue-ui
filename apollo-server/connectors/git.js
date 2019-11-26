const execa = require('execa')
const path = require('path')
// Connectors
const cwd = require('./cwd')
// Utils
const { hasProjectGit } = require('@vue/cli-shared-utils')

async function commit (message, context) {
  if (!hasProjectGit(cwd.get())) return false

  await execa('git', ['add', '*'], {
    cwd: cwd.get()
  })
  await execa('git', ['commit', '-m', message.replace(/"/, '\\"')], {
    cwd: cwd.get()
  })
  return true
}

async function reset (context) {
  if (!hasProjectGit(cwd.get())) return false

  await execa('git', ['reset'], {
    cwd: cwd.get()
  })
  return true
}

async function getRoot (context) {
  if (!hasProjectGit(cwd.get())) return cwd.get()

  const { stdout } = await execa('git', [
    'rev-parse',
    '--show-toplevel'
  ], {
    cwd: cwd.get()
  })
  return stdout
}

async function resolveFile (file, context) {
  const root = await getRoot(context)
  return path.resolve(root, file)
}

module.exports = {
  commit,
  reset,
  getRoot,
  resolveFile
}
