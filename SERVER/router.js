
const router = require('express').Router();
const controllers = require('./controllers.js');

// router.get('/find', controllers.findById);

router.post('/expenses', controllers.getExpensesByUserSort);
router.post('/user', controllers.getUser);

router.post('/insert/expense', controllers.insertExpense);
router.post('/insert/user', controllers.insertUser);

router.delete('/expense', controllers.deleteExpenseById);
router.delete('/user', controllers.deleteUserById);

module.exports = router;