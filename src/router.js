const express = require('express');
const router = express.Router();
const huntedController = require('./controllers/huntedsController');


router.get('/hunteds', huntedController.getAllHunteds)


module.exports = router;