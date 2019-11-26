const globby = require('globby')
const merge = require('lodash.merge')
const { GraphQLJSON } = require('graphql-type-json')
// Channels for subscriptions
const channels = require('./channels')
// Connectors
const cwd = require('./connectors/cwd')
const files = require('./connectors/files')

// Start ipc server
require('./util/ipc')

process.env.VUE_CLI_API_MODE = true

const resolvers = [{
  JSON: GraphQLJSON,

  DescribedEntity: {
    __resolveType (obj, context, info) {
      return null
    }
  },

  Query: {
    cwd: () => cwd.get(),
  },

  Mutation: {
    fileOpenInEditor: (root, { input }, context) => files.openInEditor(input, context),
  },

  Subscription: {
    cwdChanged: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(channels.CWD_CHANGED)
    }
  }
}]

// Load resolvers in './schema'
const paths = globby.sync(['./schema/*.js'], { cwd: __dirname, absolute: true })
paths.forEach(file => {
  const { resolvers: r } = require(file)
  r && resolvers.push(r)
})

module.exports = merge.apply(null, resolvers)
