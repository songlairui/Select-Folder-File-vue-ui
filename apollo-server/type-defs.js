const gql = require('graphql-tag')
const globby = require('globby')

const typeDefs = [gql`
scalar JSON

enum PackageManager {
  npm
  yarn
  pnpm
}

interface DescribedEntity {
  name: String
  description: String
  link: String
}

type Version {
  current: String
  latest: String
  wanted: String
  range: String
  localPath: String
}

type GitHubStats {
  stars: Int
}

input OpenInEditorInput {
  file: String!
  line: Int
  column: Int
  gitPath: Boolean
}

type Query {
  cwd: String!
}

type Mutation {
  fileOpenInEditor (input: OpenInEditorInput!): Boolean
}

type Subscription {
  cwdChanged: String!
}
`]

// Load types in './schema'
const paths = globby.sync(['./schema/*.js'], { cwd: __dirname, absolute: true })
paths.forEach(file => {
  const { types } = require(file)
  types && typeDefs.push(types)
})

module.exports = typeDefs
