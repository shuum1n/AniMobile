const User = require('../models/User');

class Controller
{
    static async findAll(req, res)
    {
        try
        {
            let users = await User.findAll();

            res.status(200).json(users);
        } catch (error)
        {
            console.log(error)
            res.status(500).json(error);
        }
    }

    static async findById(req, res)
    {
        try
        {
            let user = await User.findById(req.params.id);
            res.status(200).json(user)
        } catch (error)
        {
            console.log(error)
            res.status(500).json(error);
        }
    }

    static async createOne(req, res)
    {
        try
        {
            let { username, email, password, phoneNumber, address } = req.body;
            console.log(req.body)
            if (!username || !email || !password || !phoneNumber || !address)
            {
                throw ({ msg: "Invalid fields" })
            }

            let user = await User.createOne(req.body);
            res.status(201).json(user)
        } catch (error)
        {
            console.log(error)
            res.status(500).json(error);

        }
    }

    static async deleteUser(req, res)
    {
        try
        {
            // console.log('asdfasd');
            const { id } = req.params;
            console.log(id);
            const result = await User.deleteById(id);
            res.status(200).json(result)
        } catch (error)
        {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = Controller