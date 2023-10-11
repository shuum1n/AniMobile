
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL
let db = null;

async function connect()
{
    try
    {
        const client = new MongoClient(uri)
        await client.connect()
        
        const database = client.db("challenge-2")
        db = database;
        return database
    } catch (error)
    {
        console.log(error)
        return error;
    }
}

function getDatabase()
{
    return db;
}

module.exports = {
    connect,
    getDatabase
}

