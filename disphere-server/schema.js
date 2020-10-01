const { ApolloServer, gql } = require('apollo-server');
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLNonNull, GrapQLObjectType, GraphQLBoolean, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const cars = [
  {
	id: '1337',
    brand: 'VW',
	model: 'Polo',
	category: 1,
    color: 'RED',
    enginepower: 90,
    hasTrailHitch: false,
	drivers: [16,17]
  },
  {
    id: '1338',
    brand: 'Lamborghini',
    model: 'Huracan',
	category: 2,
    color: 'BLUE',
    enginepower: 300,
    hasTrailHitch: true,
    drivers: [17]
  },
  {
    id: '1339',
    brand: 'FIAT',
    model: 'Panda',
	category: 1,
    color: 'GREEN',
    enginepower: 50,
    hasTrailHitch: false,
    drivers: [16,18]
  },
];

const drivers = [
  {
	id: '16',
	name: 'Patrick Rothfuss',
	age: 44,
  },
  {
	id: '17',
	name: 'Brandon Sanderson',
	age: 42,
  },
  {
	id: '18',
	name: 'Terry Pratchett',
	age: 66,
  },
];
 
const CategoryType = new GraphQLEnumType({
  name: 'Category',
  values: {
    Kleinwagen: {
      value: 0,
    },
    Universal: {
      value: 1,
    },
    Supersportwagen: {
      value: 2,
    },
	}
});

  const DriverType = new graphql.GraphQLObjectType({
	name: 'Driver',
	fields: () => ({ 
		id: {type: GraphQLID },
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
	})
  });

  const CarType = new graphql.GraphQLObjectType({
	name: 'Car',
	fields: () => ({ 
		id: {type:GraphQLID},
		brand: {type:GraphQLString},
		model: {type:GraphQLString},
		category: {type:CategoryType},
		color: {type:GraphQLString},
		enginepower: {type:GraphQLInt},
		hasTrailHitch: {type:GraphQLBoolean},
		drivers: {type: new GraphQLList(DriverType)},
	})
  }); 
  
 const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        cars: {
            type: new GraphQLList(CarType),
			args: { id: { type: GraphQLID } },
            resolve(parent, args) {
				if(args.id) {
					return cars.filter(car => car.id === args.id)	
				}
				return cars
            }
        },

		car: {
		  type: CarType,
          args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(cars, { id: args.id })
				}
			},

        driver: {
            type: DriverType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(drivers, { id: args.id });
            }
        },

        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parent, args) {
                return drivers;
            }
        }
        }
        })

module.exports = new GraphQLSchema({

    query: RootQuery

});
