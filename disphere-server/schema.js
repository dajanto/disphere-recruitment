const { ApolloServer, gql } = require('apollo-server');
const graphql = require('graphql');
const { GrapQLObjectType, GraphQLBoolean, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const cars = [
  {
	id: '1337',
    brand: 'VW',
	model: 'Polo',
    color: 'RED',
    enginepower: 90,
    hasTrailHitch: false,
  },
  {
	id: '1338',
    brand: 'Lamborghini',
	model: 'Huracan',
    color: 'BLUE',
    enginepower: 300,
    hasTrailHitch: true,
  },
  {
	id: '1339',
    brand: 'Fiat',
	model: 'Panda',
    color: 'GREEN',
    enginepower: 50,
    hasTrailHitch: false,
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

  const DriverType = new graphql.GraphQLObjectType({
	name: 'Driver',
	fields: () => ({ 
		id: {type:GraphQLID},
		name: {type:GraphQLString},
		age: {type:GraphQLInt} ,
	})
  });

  const CarType = new graphql.GraphQLObjectType({

	name: 'Car',
	fields: () => ({ 
		id: {type:GraphQLID},
		brand: {type:GraphQLString},
		model: {type:GraphQLString},
		color: {type:GraphQLString},
		enginepower: {type:GraphQLInt},
		hasTrailHitch: {type:GraphQLBoolean},
		drivers: {type: new GraphQLList(Driver),
		resolve(parent,args) {
			return _.filter(drivers,{driver,parent})
		}
		}
	})
  });

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                // code to get Data from db/ other source
                console.log(typeof(args.id));
                return _.find(cars, { id: args.id });
            }
        },
        driver: {
            type: DriverType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(drivers, { id: args.id });
            }
        },
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return cars
            }
        },
        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parents, args) {
                return drivers;
            }
        }

module.exports = new GraphQLSchema({

    query: RootQuery
});
