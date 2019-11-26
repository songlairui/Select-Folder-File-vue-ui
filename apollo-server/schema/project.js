const gql = require('graphql-tag')
// Connectors
const projects = require('../connectors/projects')

exports.types = gql`
extend type Query {
  projects: [Project]
  projectCurrent: Project
}

extend type Mutation {
  projectImport (input: ProjectImportInput!): Project!
  projectOpen (id: ID!): Project!
  projectRemove (id: ID!): Boolean!
  projectCwdReset: String
  projectSetFavorite (id: ID!, favorite: Int!): Project!
  projectRename (id: ID!, name: String!): Project!
  featureSetEnabled (id: ID!, enabled: Boolean): Feature
}

type Project {
  id: ID!
  name: String!
  type: ProjectType
  path: String!
  favorite: Int
  homepage: String
  openDate: JSON
}

enum ProjectType {
  vue
  unknown
}

input ProjectImportInput {
  path: String!
  force: Boolean
}

type Preset implements DescribedEntity {
  id: ID!
  name: String
  description: String
  link: String
  features: [String]
}

type Feature implements DescribedEntity {
  id: ID!
  name: String
  description: String
  link: String
  enabled: Boolean!
}
`

exports.resolvers = {
  Project: {
    type: (project, args, context) => projects.getType(project, context),
    homepage: (project, args, context) => projects.getHomepage(project, context)
  },

  Query: {
    projects: (root, args, context) => projects.list(context),
    projectCurrent: (root, args, context) => projects.getCurrent(context)
  },

  Mutation: {
    projectImport: (root, { input }, context) => projects.import(input, context),
    projectOpen: (root, { id }, context) => projects.open(id, context),
    projectRemove: (root, { id }, context) => projects.remove(id, context),
    projectCwdReset: (root, args, context) => projects.resetCwd(context),
    projectSetFavorite: (root, args, context) => projects.setFavorite(args, context),
    projectRename: (root, args, context) => projects.rename(args, context),
    featureSetEnabled: (root, args, context) => projects.setFeatureEnabled(args, context)
  }
}
