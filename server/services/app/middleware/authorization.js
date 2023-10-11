const authorization = async (req, res, next) =>
{
    try
    {
        if (req.user.role !== "Admin")
        {
            throw { name: "Forbidden", message: "No access" };
        }
        next();
    } catch (error)
    {
        next(error)
    }
}

module.exports = authorization;