const JWT = require('jsonwebtoken');

const JWT_SECRET = "sjdkfhajskdfhaksjdfh";

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                message: 'Auth Failed',
                success: false
            });
        }

        JWT.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: 'Auth Failed',
                    success: false
                });
            } else {
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Internal Server Error',
            success: false
        });
    }
};