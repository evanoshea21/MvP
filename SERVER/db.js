console.log('db page...');
//mongoDB connection and export
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/budgetApp'/*, {useNewUrlParser: true, useUnifiedTopology: true}*/);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!');
});


const Expense = mongoose.model('Expense', mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  due_date: { type: Number, required: true },
  pay_period: { type: String, required: true },
  amount: { type: Number, required: true },
  logo: {type: String}
}));
const User = mongoose.model('User', mongoose.Schema({
  username: { type: String, required: true }, //username
  monthly_income: { type: Number, required: true }, //user has to calculate if salary
  pay_period: { type: String, required: true }, //bi-weekly
  total_expenses: { type: Number }
}));
const Tests = mongoose.model('Tests', mongoose.Schema({
  name: {type: String}, //test
}));

module.exports.users = User;
module.exports.expenses = Expense;
module.exports.tests = Tests;