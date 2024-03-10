const jwt = require('jsonwebtoken');

console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
console.log('Headers:', req.headers);

module.exports = (req, res, callback) => {
    jwt.verify(req.headers.token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            console.error('Erreur de vérification du JWT :', error);
            res.status(500).send(error + '. Please contact the webmaster');
        } else {
            req.body.user_id = payload.user_id;
            req.body.user_role = payload.user_role;
            callback();
        }
    });
}