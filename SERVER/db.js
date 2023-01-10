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
  name: 'string',
  size: 'string'
}));

module.exports.db = Expense;