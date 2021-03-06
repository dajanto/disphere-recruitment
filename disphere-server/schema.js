const { ApolloServer, gql } = require('apollo-server');
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLNonNull, GrapQLObjectType, GraphQLBoolean, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const cars = [
	{
		id: '1337',
		brand: 'VW',
		model: 'Polo',
		category: 2,
		color: 'RED',
		enginepower: 90,
		hasTrailHitch: false,
		drivers: [{id: '16',name:'Patrick Rothfuss',age:44}, {id: '17',name:'Brandon Sanderson',age:42}]
	},
	{
		id: '1338',
		brand: 'Lamborghini',
		model: 'Huracan',
		category: 3,
		color: 'BLUE',
		enginepower: 300,
		hasTrailHitch: true,
		drivers: [{id: '17',name:'Brandon Sanderson',age:42}]
	},
	{
		id: '1339',
		brand: 'FIAT',
		model: 'Panda',
		category: 1,
		color: 'GREEN',
		enginepower: 50,
		hasTrailHitch: false,
		drivers: [{id: '16',name:'Patrick Rothfuss',age:44}, {id: '18', name: 'Terry Pratchett', age: 66}]
	},
];

const drivers = [
	{
		id: '16',
		name: 'Patrick Rothfuss',
		age: 44,
		cars: [{id:1337},{id:1339}]
	},
	{
		id: '17',
		name: 'Brandon Sanderson',
		age: 42,
		cars: [{id:1337},{id:1338}]
	},
	{
		id: '18',
		name: 'Terry Pratchett',
		age: 66,
		cars: [{id:1339}]
	},
];

const CategoryType = new GraphQLEnumType({
	name: 'Category',
	values: {
		Kleinwagen: {
			value: 1,
		},
		Universal: {
			value: 2,
		},
		Supersportwagen: {
			value: 3,
		},
	}
});

const DriverType = new graphql.GraphQLObjectType({
	name: 'Driver',
	fields: () => ({ 
		id: {type: GraphQLID },
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		cars: {type: new GraphQLList(CarType)}
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
			args: { id: {type : GraphQLID}, category: {type: CategoryType} },

			resolve(parent, args) {

				if(args.id) {
					return cars.filter(car => car.id === args.id)	
				} 

				if(args.category) {
					return cars.filter(car => car.category === args.category)	
				}

				return cars
			},
		},

		car: {
			type: CarType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {

				return cars.find(cars, { id: args.id })
			}
		},

		driver: {

			type: DriverType,
			args: { id: { type: GraphQLID } },

			resolve(parent, args) {

				return cars.find(drivers, { id: args.id });
			}
		},

		drivers: {

			type: new GraphQLList(DriverType),
			args: { id: { type: GraphQLID }, car: { type: GraphQLID }},

			resolve(parent, args) {

				if(args.id) {
					return drivers.filter(driver => driver.id === args.id)	
				}

				if(args.car) {

					//let arr = [
					//	{ name:"string 1", value:"this", other: "that" },
					//	{ name:"string 2", value:"this", other: "that" }
					//];

					//let obj = arr.find(o => o.name === 'string 1');

					//console.log(obj.name);

					//console.log(drivers)
					//let carsofdriver = drivers.find(element => element.cars)
					//console.log(drivercars)
					//console.log(drivercars.cars)
					//
					//let result = [];
					//array1.forEach(element => 
					//	if(element.cars.includes(args.car))
					//	{
					//		result.push(element.id);
					//	});

					// TODO 

					let result;
					for (element of drivers) {

						console.log("element")
						console.log(element)
						console.log("element cars")
						console.log(element.cars)

						let ec = element.cars
						
						console.log(ec.includes(args.car))
						if(ec.includes(args.car)) {
							
							console.log("ja");

						} else {

							console.log("nein");
						}

						//let elementcarsobject = elementcars.find(o => o.id === args.car)

						//console.log("asdlkfjadsjlfkjlkadfjlkjlkdfljkfdlkjsa")
						//console.log(elementcarsobject.id)

						//if(true)
						//{
						//	result.push(elementcarsobject.id);
						//	//result.push(element.id);
						//} 
					}
					return result
				}
				return drivers
			}
		}
	}
})

module.exports = new GraphQLSchema({

	query: RootQuery

});
