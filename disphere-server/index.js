const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

//connect to mlab DB
//mongoose.connect('mongo "mongodb+srv://cluster0.qzs8d.mongodb.net/Cluster0" --username admin')

app.use('/graphql', graphqlHTTP({

    schema,

    graphql: true,

}));

app.listen(4000, () => {
  console.log('🚀  Server ready');
});
