const errorHandler = (err, req, res, next) =>
{
    const { name } = err;
    if (name)
    {
        if (Array.isArray(err.errors))
        {
            err.message = err.errors.map(x => x.message)
        }
        else
        {
            err.message = [err.message]
        }
        switch (name)
        {
            case "SequelizeValidationError": {
                res.status(400).json({ message: err.message[0] });
                break;
            }
            case "SequelizeUniqueConstraintError": {
                res.status(400).json({ message: err.message[0] });
                break;
            }
            case "BadRequest": {
                res.status(400).json({ message: err.message[0] });
                break;
            }
            case "InvalidCredentials": {
                res.status(401).json({ message: err.message[0] });
                break;
            }
            case "Unauthorized": {
                res.status(401).json({ message: err.message[0] });
                break;
            }
            case "JsonWebTokenError": {
                res.status(401).json({ message: "Invalid token" });
                break;
            }
            case "Forbidden": {
                res.status(403).json({ message: err.message[0] });
                break;
            }
            case "NotFound": {
                res.status(404).json({ message: err.message[0] });
                break;
            }
            default: {
                console.log(err)
                res.status(500).json({ message: "Internal Server Error" });
                break;
            }
        }
    }
}

module.exports = errorHandler;