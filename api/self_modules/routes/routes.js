let express = require('express');
let router = express.Router();

let dataController = require('../../controllers/dataController');

router.post('/connection', dataController.connectUser)

module.exports = router;