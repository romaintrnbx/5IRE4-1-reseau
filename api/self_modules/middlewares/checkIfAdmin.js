module.exports = (req, res, callback) => {
    if (req.body.user_role !== "admin") {
        res.status(403).send('Seul un Admin a accès à cette commande')
    } else {
        callback();
    }
}