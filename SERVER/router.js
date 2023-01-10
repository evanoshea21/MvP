
const router = require('express').Router();
const controllers = require('./controllers.js');

// router.get('/find', controllers.findById);

router.get('/expenses', controllers.getExpensesBySort);

router.post('/insert/expense', controllers.insertExpense);
router.post('/insert/user', controllers.insertUser);

router.delete('/expense', controllers.deleteExpenseById);
router.delete('/user', controllers.deleteUserById);

module.exports = router;