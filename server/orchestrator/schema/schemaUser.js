const axios = require('axios');
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 13692,
    password: process.env.REDIS_PW
});


const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  type Query {
    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): String
    deleteUser(id: ID): String
  }
`

const resolvers = {
    Query: {
        users: async function ()
        {
            try
            {
                let result = await redis.get("users")
                if (!result)
                {
                    const { data } = await axios.get("http://user-service:4001/users")
                    result = data
                    await redis.set("users", JSON.stringify(data))
                }
                else
                {
                    result = JSON.parse(result)
                }
                await redis.del("users")
                return result
            }
            catch (error)
            {
                throw new Error(error.response.data.message)
            }
        },
        user: async function (_, args)
        {
            try
            {
                const { data } = await axios.get("http://user-service:4001/users/" + args._id)
                return data
            }
            catch (error)
            {
                throw new Error(error.response.data.message)
            }
        },
    },

    Mutation: {
        createUser: async function (_, args)
        {
            try
            {
                const { data } = await axios.post("http://user-service:4001/users", {
                    username: args.username,
                    email: args.email,
                    password: args.password,
                    phoneNumber: args.phoneNumber,
                    address: args.address
                })
                return "User created"
            } catch (error)
            {
                console.log(error)
                throw "Error user not created"
            }
        },
        deleteUser: async function (_, args)
        {
            try
            {
                const { data } = await axios.delete("http://user-service:4001/users/" + args.id)
                console.log('adsfsdfa');

                await redis.del("users")

                return "Success deleted";
            } catch (error)
            {
                console.log(error)
                throw "Failed deleted"
            }
        },
    }
}

module.exports = { typeDefs, resolvers }