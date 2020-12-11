const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    accounts:String!
  }
`

const resolvers = {
  Query: {
    accounts: () => ` This is the API of Human Resources APP `
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
