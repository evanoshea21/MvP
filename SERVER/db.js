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
  title: String,
  size: String
}));
const User = mongoose.model('User', mongoose.Schema({
  name: String,
  income: Number
}));
const Tests = mongoose.model('Tests', mongoose.Schema({
  name: String,
  income: Number
}));

module.exports.tests = Tests;
module.exports.users = User;
module.exports.expenses = Expense;