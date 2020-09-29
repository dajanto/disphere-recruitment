
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  type Car {
    brand: String
	model: String
    color: String
    enginepower: Int
    hasTrailHitch: Boolean
  }

  type Query {
    cars: [Car]
  }
`;

// Array instead of DB
const cars = [
  {
    brand: 'VW',
	model: 'Polo',
    color: 'RED',
    enginepower: 90,
    hasTrailHitch: false,
  },
  {
    brand: 'Lamborghini',
	model: 'Huracan',
    color: 'BLUE',
    enginepower: 300,
    hasTrailHitch: true,
  },
  {
    brand: 'Fiat',
	model: 'Panda',
    color: 'GREEN',
    enginepower: 50,
    hasTrailHitch: false,
  },
];

const resolvers = {
  Query: {
    cars: () => cars,
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
