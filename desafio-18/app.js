import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDef.js'
import resolvers from './resolvers.js'
import loader from './daos/dbLoader.js'

const app = express()
loader.start()
app.listen(8080, () => console.log('Server up!'))
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})
await apolloServer.start()
apolloServer.applyMiddleware({ app })

