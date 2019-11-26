const path = require('path')
const fs = require('fs')
const shortId = require('shortid')
const parseGitConfig = require('parse-git-config')
// Connectors
const cwd = require('./cwd')
const folders = require('./folders')
// Context
const getContext = require('../context')
// Utils
const { log } = require('../util/logger')
const { getHttpsGitURL } = require('../util/strings')


let lastProject = null
let currentProject = null
let features = []

function list (context) {
  let projects = context.db.get('projects').value()
  projects = autoClean(projects, context)
  return projects
}

function findOne (id, context) {
  return context.db.get('projects').find({ id }).value()
}

function findByPath (file, context) {
  return context.db.get('projects').find({ path: file }).value()
}

function autoClean (projects, context) {
  let result = []
  for (const project of projects) {
    if (fs.existsSync(project.path)) {
      result.push(project)
    }
  }
  if (result.length !== projects.length) {
    console.log(`Auto cleaned ${projects.length - result.length} projects (folder not found).`)
    context.db.set('projects', result).write()
  }
  return result
}

function getCurrent (context) {
  if (currentProject && !fs.existsSync(currentProject.path)) {
    log('Project folder not found', currentProject.id, currentProject.path)
    return null
  }
  return currentProject
}

function getLast (context) {
  return lastProject
}

async function updatePromptsFeatures () {
  await prompts.changeAnswers(answers => {
    answers.features = features.filter(
      f => f.enabled
    ).map(
      f => f.id
    )
  })
}

async function setFeatureEnabled ({ id, enabled, updatePrompts = true }, context) {
  const feature = features.find(f => f.id === id)
  if (feature) {
    feature.enabled = enabled
  } else {
    console.warn(`Feature '${id}' not found`)
  }
  if (updatePrompts) await updatePromptsFeatures()
  return feature
}

async function importProject (input, context) {
  if (!input.force && !fs.existsSync(path.join(input.path, 'node_modules'))) {
    throw new Error('NO_MODULES')
  }

  const project = {
    id: shortId.generate(),
    path: input.path,
    favorite: 0,
    type: folders.isVueProject(input.path) ? 'vue' : 'unknown'
  }
  const packageData = folders.readPackage(project.path, context)
  project.name = packageData.name
  context.db.get('projects').push(project).write()
  return open(project.id, context)
}

async function open (id, context) {
  const project = findOne(id, context)

  if (!project) {
    log('Project not found', id)
    return null
  }

  if (!fs.existsSync(project.path)) {
    log('Project folder not found', id, project.path)
    return null
  }

  lastProject = currentProject
  currentProject = project
  cwd.set(project.path, context)

  // Date
  context.db.get('projects').find({ id }).assign({
    openDate: Date.now()
  }).write()

  // Save for next time
  context.db.set('config.lastOpenProject', id).write()

  log('Project open', id, project.path)

  return project
}

async function remove (id, context) {
  if (currentProject && currentProject.id === id) {
    currentProject = null
  }
  context.db.get('projects').remove({ id }).write()
  if (context.db.get('config.lastOpenProject').value() === id) {
    context.db.set('config.lastOpenProject', undefined).write()
  }
  return true
}

function resetCwd (context) {
  if (currentProject) {
    cwd.set(currentProject.path, context)
  }
}

function setFavorite ({ id, favorite }, context) {
  context.db.get('projects').find({ id }).assign({ favorite }).write()
  return findOne(id, context)
}

function rename ({ id, name }, context) {
  context.db.get('projects').find({ id }).assign({ name }).write()
  return findOne(id, context)
}

function getType (project, context) {
  if (typeof project === 'string') {
    project = findByPath(project, context)
  }
  if (!project) return 'unknown'
  return !project.type ? 'vue' : project.type
}

function getHomepage (project, context) {
  const gitConfigPath = path.join(project.path, '.git', 'config')
  if (fs.existsSync(gitConfigPath)) {
    const gitConfig = parseGitConfig.sync({ path: gitConfigPath })
    const gitRemoteUrl = gitConfig['remote "origin"']
    if (gitRemoteUrl) {
      return getHttpsGitURL(gitRemoteUrl.url)
    }
  }

  const pkg = folders.readPackage(project.path, context)
  return pkg.homepage
}

// Open last project
async function autoOpenLastProject () {
  const context = getContext()
  const id = context.db.get('config.lastOpenProject').value()
  if (id) {
    try {
      await open(id, context)
    } catch (e) {
      log(`Project can't be auto-opened`, id)
    }
  }
}

autoOpenLastProject()

module.exports = {
  list,
  findOne,
  findByPath,
  getCurrent,
  getLast,
  setFeatureEnabled,
  import: importProject,
  open,
  remove,
  resetCwd,
  setFavorite,
  rename,
  getType,
  getHomepage
}
