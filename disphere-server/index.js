const express = require('express');
const { ApolloServer } = require ('apollo-server-express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('🚀  Server ready');
});
