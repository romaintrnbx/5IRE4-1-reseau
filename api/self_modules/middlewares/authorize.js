const jwt = require('jsonwebtoken');

module.exports = (req, res, callback) => {
    jwt.verify(req.headers.token, 'xxxx', (error, payload) => {
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