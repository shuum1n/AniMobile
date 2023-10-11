if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require('axios')

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers
} = require('./schema/schemaUser.js');

const {
    typeDefs: productTypeDefs,
    resolvers: productResolvers
} = require('./schema/productSchema');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs],
    resolvers: [userResolvers, productResolvers],
    introspection: true
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 }
}).then(({ url }) =>
{
    console.log(`🚀 Server ready at ${url}`);
}) 
