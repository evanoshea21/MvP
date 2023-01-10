const db = require('./db.js');

module.exports = {
  getExpensesByUserSort: function(username, sort) { //sort (date as)
    //handle SORT for insertion below in query
    var sortBy;
    if(sort === 'dateA') {sortBy = {due_date: 1}}
    else if(sort === 'dateD') {sortBy = {due_date: -1}}
    else if(sort === 'dateNext') {sortBy = {due_date: 1}}
    else if(sort === 'amountA') {sortBy = {amount: 1}}
    else if(sort === 'amountD') {sortBy = {amount: -1}}
    else {sortBy = {}}
    // console.log('SORTBY ', sortBy);
    var todaysDate = new Date().getDate();
    // console.log('TodayDate ',todaysDate);

    return new Promise((resolve,reject) => {
      db.expenses.find({username}).sort(sortBy).exec((err, results) => {
        if(err) { reject(err); return}
        if(sort === 'dateNext') {

          for(var i = 0; i < results.length; i++) {
            if(results[i].due_date >= todaysDate) {
              console.log('FIRST date next', results[i]);
              var dateNextArr = results.slice(i).concat(results.slice(0,i));
              resolve(dateNextArr);
              return;
            }
          }//forLoop
        } else { //not dateNext
          resolve(results);
        }
      }); //end of find, sort, EXEC
    })//promise end
    },

  deleteExpenseById: function(id) {
    return new Promise((resolve,reject) => {
      db.expenses.deleteOne({_id: id}, function(err, results) {
        err ? reject(err) :resolve(results);
        return;
      })
    })
    },
  deleteUserById: function(id) {
    return new Promise((resolve,reject) => {
      db.users.deleteOne({_id: id}, function(err, results) {
        err ? reject(err) :resolve(results);
        return;
      })
    })
    },

    insertExpense: function(data) {
      return new Promise((resolve, reject) => {

        db.expenses.create({...data}, function(err, res) {
          if(err) { reject(err); return}
          resolve(res);
        })//create document

      })//promise end
    },

    insertUser: function(data) {
      console.log('INSERT USER:', data);
      return new Promise((resolve, reject) => {

        db.users.create({...data}, function(err, res) {
          if(err) { reject(err); return}
          resolve(res);
        })//create document

      })//promise end
    },

    deleteUser: function(_id) {
      console.log('delete user with id', _id);
      return new Promise((resolve, reject) => {
        db.users.deleteOne({_id}, function(err, user) {
          err ? reject(err) : resolve(`deleted user successfully:${user}`)
        })

      })//promise
    },

}