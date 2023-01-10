
const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/test/:id', controllers.test);

module.exports = router;