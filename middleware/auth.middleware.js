const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {

        const token = req.headers.authorization.split(' ')[1];
        console.log("TOKEN IN MIDDLEWARE: ", token);
        // "Bearer TOKEN"
        if (!token) {
            res.status(401).json({message: 'Нет авторизации'});
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'), (err, verifiedJwt) => {
            if (err) {
                res.status(401).json({message: 'Unauthorized'})
            } else {
                console.log('decoded:', decoded)
            }

        });
        console.log("decoded:", decoded);


    } catch (e) {
        console.log("You caught an error");
        res.status(401).json({message: 'Нет авторизации'});
    }
}