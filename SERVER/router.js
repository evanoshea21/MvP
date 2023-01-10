
const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/test/:id', controllers.test);
router.get('/getdata', controllers.testDB);

module.exports = router;