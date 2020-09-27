const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type car {
    brand: String
	model: String
    color: AllowedColor
    enginepower: Int
    hasTrailHitch: Boolean
  }

  enum AllowedColor {
		RED
		GREEN
		BLUE
	}

  type Query {
	favoriteColor: AllowedColor
    cars: [car]
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

