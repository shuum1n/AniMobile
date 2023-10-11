const axios = require('axios');
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 13692,
    password: process.env.REDIS_PW
});


const typeDefs = `#graphql
  type Category {
    id: Int,
    name: String
  }

  type Images {
    id: Int,
    ProductId: Int,
    imgUrl: String
  } 

  type Product {
    id: ID,
    name: String,
    slug: String,
    description: String,
    price: Int,
    mainImg: String,
    CategoryId: Int,
    userMongoId: String,
    Category: Category,
    Images: [Images]
    user: User
  }


  type Query {
    products:[Product]
    product(slug: String): Product
  }

  type Mutation {
    createProduct(name: String, description: String, price: Int, mainImg: String, CategoryId: Int, userMongoId: String, image1: String, image2: String, image3: String): String
    deleteProduct(id: ID): String
    updateProduct(id: ID, name: String, description: String, mainImg: String, CategoryId: Int, price: Int): String
  }
`

const resolvers = {
    Query: {
        products: async function ()
        {
            try
            {
                await redis.del("products")
                let result = await redis.get("products")
                if (!result)
                {
                    const { data } = await axios.get("http://app-service:4002/products")
                    const res = await Promise.all(data.map(async (product) =>
                    {
                        try
                        {
                            const { data: user } = await axios.get("http://user-service:4001/users/" + product.userMongoId)
                            return {
                                ...product,
                                user: user
                            };
                        }
                        catch (error)
                        {
                            return {
                                ...product,
                                user: null
                            };
                        }
                    }));
                    await redis.set("products", JSON.stringify(res))
                    result = res
                }
                else
                {
                    result = JSON.parse(result)
                }
                return result;
            }
            catch (error)
            {
                console.log(error);
                throw error
            }
        },
        product: async function (_, args)
        {
            try
            {
                const { data } = await axios("http://app-service:4002/products/" + args.slug);
                try
                {
                    const { data: dataUser } = await axios.get("http://user-service:4001/users/" + data.userMongoId)
                    data.user = dataUser
                } catch (error)
                {
                    data.user = null
                }
                console.log(data)
                return data;
            } catch (error)
            {
                console.log(error)
                throw error
            }
        }
    },

    Mutation: {
        createProduct: async function (_, args)
        {
            try
            {
                const { data } = await axios.post("http://app-service:4002/products", {
                    name: args.name,
                    description: args.description,
                    mainImg: args.mainImg,
                    price: args.price,
                    CategoryId: args.CategoryId,
                    userMongoId: args.userMongoId,
                    image1: args.image1,
                    image2: args.image2,
                    image3: args.image3
                })
                await redis.del("products")
                return "Success create data"
            } catch (error)
            {
                console.log(error)
                throw error;
            }
        },
        deleteProduct: async function (_, args)
        {
            try
            {
                const { data } = await axios.delete("http://app-service:4002/products/" + args.id)
                await redis.del("products")
                return "Delete product success"
            } catch (error)
            {
                console.log(error)
                throw error
            }
        },
        updateProduct: async function (_, args)
        {
            try
            {
                const { data } = await axios.put("http://app-service:4002/products/" + args.id, {
                    id: args.id,
                    name: args.name,
                    description: args.description,
                    mainImg: args.mainImg,
                    price: args.price,
                    CategoryId: args.CategoryId,
                })

                await redis.del("products")

                return "Edit success";
            } catch (error)
            {
                console.log(error)
                throw error;
            }
        },
    }
}

module.exports = { typeDefs, resolvers }