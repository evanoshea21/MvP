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
  pay_dates: { type: String, required: true }, //bi-weekly has 2 days
  housing: { type: Number, required: true }, //bi-weekly
  rent_due: { type: Number }, //
  total_expenses: { type: Number, default: 0 }
}));
const Tests = mongoose.model('Tests', mongoose.Schema({
  name: {type: String}, //test
}));

// Expense.deleteMany({}, function(err) {});
// User.deleteMany({}, function(err) {});

// User.create({
//   username: 'Sample User',
//   monthly_income: 4000,
//   pay_period: 'bi-weekly',
//   pay_dates: '11, 14',
//   housing: 900,
//   rent_due: 1,
//   total_expenses: 2575.76,
// }, function(err) {console.log('inserted user?')});

// Expense.insertMany([
//   {
//     username: 'Sample User',
//     title: 'Rent',
//     category: 'Housing',
//     type: 'Essential',
//     due_date: 1,
//     pay_period: 'monthly',
//     amount: 1400,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Netflix',
//     category: 'Subscription',
//     type: 'Essential',
//     due_date: 10,
//     pay_period: 'monthly',
//     amount: 12.99,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Car insurance',
//     category: 'Auto',
//     type: 'Essential',
//     due_date: 14,
//     pay_period: 'monthly',
//     amount: 89,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Laptop Loan',
//     category: 'Debt Payment',
//     type: 'Liability',
//     due_date: 19,
//     pay_period: 'monthly',
//     amount: 48.55,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Hulu',
//     category: 'Subscription',
//     type: 'Non-Essential',
//     due_date: 23,
//     pay_period: 'monthly',
//     amount: 14.99,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Groceries',
//     category: 'Living Costs',
//     type: 'Essential',
//     due_date: 12,
//     pay_period: 'monthly',
//     amount: 490,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Roth IRA',
//     category: 'Savings/Investments',
//     type: 'Asset',
//     due_date: 3,
//     pay_period: 'monthly',
//     amount: 200,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Utilities',
//     category: 'Housing',
//     type: 'Essential',
//     due_date: 2,
//     pay_period: 'monthly',
//     amount: 85,
//     logo: 'image.jpeg',
//   },
//   {
//     username: 'Sample User',
//     title: 'Car Loan',
//     category: 'Auto',
//     type: 'Liability',
//     due_date: 9,
//     pay_period: 'monthly',
//     amount: 235.23,
//     logo: 'image.jpeg',
//   },
// ], function(err) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('INSERTED DOCS')
//   }
// });
// User.deleteMany({});



module.exports.users = User;
module.exports.expenses = Expense;
module.exports.tests = Tests;