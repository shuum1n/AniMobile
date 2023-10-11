const { User } = require('../models');
const { generateToken } = require('../helpers/jwtHelper');
const { comparePassword } = require('../helpers/bcryptHelper');
class AuthController
{
    static async register(req, res, next)
    {
        const { email, password } = req.body
        try
        {
            const newUser = await User.create({
                email, password,
                role: "User"
            });
            res.status(201).json({
                id: newUser.id,
                email: email
            })
        } catch (error)
        {
            next(error)
        }
    }
    static async login(req, res, next)
    {
        try
        {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user)
            {
                throw {
                    name: "InvalidCredentials",
                    message: "Invalid email/password"
                };
            }
            let pwCheck = comparePassword(password, user.password);
            if (!pwCheck)
            {
                throw {
                    name: "InvalidCredentials",
                    message: "Invalid email/password"
                };
            }
            let access_token = generateToken({
                email: user.email
            })
            res.status(200).json({
                access_token: access_token
            })
        } catch (error)
        {
            next(error)
        }
    }

    static async registerAdmin(req, res, next)
    {
        const { email, password } = req.body
        try
        {
            const newUser = await User.create({
                email, password,
                role: "Admin"
            });
            res.status(201).json({
                id: newUser.id,
                email: email
            })
        } catch (error)
        {
            next(error)
        }
    }
}

module.exports = AuthController