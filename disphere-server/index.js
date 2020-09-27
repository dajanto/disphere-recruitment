const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Car {
    brand: String
	model: String
    color: AllowedColors
    enginepower: Int
    hasTrailHitch: Boolean
  }

  enum AllowedColors {
		RED
		GREEN
		BLUE
	}

// Query entry points
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
    hasTrailHitch: false
  },
  {
    brand: 'Lamborghini',
	model: 'Huracan',
    color: 'BLUE',
    enginepower: 300,
    hasTrailHitch: true
  },
  {
    brand: 'Fiat',
	model: 'Panda',
    color: 'GREEN',
    enginepower: 50,
    hasTrailHitch: false
  },
];


// Array of Resolvers for ApolloServer Constructor
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

