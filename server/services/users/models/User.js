const { getDatabase } = require('../config/mongodb');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

class User
{
    static collection()
    {
        return getDatabase().collection('users');
    }

    static findAll()
    {
        return User.collection().find().toArray();
    }

    static findById(id)
    {
        return User.collection().findOne({ _id: new ObjectId(id) });
    }

    static createOne({ username, email, password, phoneNumber, address })
    {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        console.log(getDatabase().collection('users'))
        return User.collection().insertOne({ username, email, password: hash, phoneNumber, address });
    }

    static deleteById(id)
    {
        return User.collection().deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = User