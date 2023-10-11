const { User } = require('../models');
const { verifyToken } = require('../helpers/jwtHelper');

const authentication = async (req, res, next) =>
{
    try
    {
        const { access_token } = req.headers;

        if (!access_token)
        {
            throw { name: "Unauthorized", message: "Invalid token" };
        }
        const data = verifyToken(access_token);

        const user = await User.findOne({
            where: {
                email: data.email
            }
        });

        if (!user)
        {
            throw { name: "Unauthorized", message: "Invalid token" };
        }

        req.user = user;

        next();
    } catch (error)
    {
        next(error)
    }
}

module.exports = authentication;