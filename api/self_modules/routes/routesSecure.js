let express = require('express');
let router = express.Router();

let dataController = require('../../controllers/dataController');

let checkIfAdmin = require('../middlewares/checkIfAdmin');

router.get('/user', dataController.fetchDataUser)
router.get('/admin', checkIfAdmin, dataController.getVictory)
router.get('/blog', dataController.fetchBlogMessages)
router.post('/blog', dataController.createBlogmessage)

module.exports = router;