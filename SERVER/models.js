const db = require('./db.js');

module.exports = {
  getExpensesByUserSort: function(username, sort) { //sort (date as)
    console.log('getting expenses for user ', username);
    //handle SORT for insertion below in query
    var sortBy;
    if(sort === 'dateA') {sortBy = {due_date: 1}}
    else if(sort === 'dateD') {sortBy = {due_date: -1}}
    else if(sort === 'dateNext') {sortBy = {due_date: 1}}
    else if(sort === 'amountA') {sortBy = {amount: 1}}
    else if(sort === 'amountD') {sortBy = {amount: -1}}
    else {sortBy = {}}
    var todaysDate = new Date().getDate();
    // console.log('TodaysDate ', todaysDate);

    return new Promise((resolve,reject) => {
      db.expenses.find({username:username}).sort(sortBy).exec((err, results) => {
        if(err) { reject(err); return}
        // resolve(results);
        // return;
        if(sort === 'dateNext' && results.length) {
          // console.log('RESTULS (hanging) ->', results, todaysDate);
          for(var i = 0; i < results.length; i++) {
            // console.log('results dueDate vs todays,', results[i].due_date);

            if(results[i].due_date >= todaysDate) {
              var dateNextArr = results.slice(i).concat(results.slice(0,i));
              resolve(dateNextArr);
              return;
            }
          }//forLoop
            resolve(results);
            return;
        } else { //not dateNext
          resolve(results);
        }
      }); //end of find, sort, EXEC
    })//promise end
    },
  getUser: function(username) {
    console.log('USERNAME for user find', username);
    var usernameObj = username === 'all' ? {} : {username};
    return new Promise((resolve,reject) => {
      db.users.find(usernameObj).exec((err, results) => {
        if(err) { reject(err); return}
        resolve(results);
        return;
      }); //end of find, EXEC
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
          console.log('insert user Successful!');
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
    updateUserByUsername: function(username, data) {
      console.log('update user', username, ' with data ', data);
      return new Promise((resolve, reject) => {
        db.users.findOneAndUpdate({username:username}, {$inc : {total_expenses: data.deltaExpense}}).exec((err, response) => {
          err ? reject(err) : resolve(`updated user successfully:${username}\n${response}`)
        });
        // db.users.updateOne({username}, data, function(err, user) {
        //   err ? reject(err) : resolve(`deleted user successfully:${user}`)
        // })

      })//promise
    },
    updateExpenseByID: function(id, data) {
      console.log('update user id', id, ' with data ', data);
      return new Promise((resolve, reject) => {
        db.expenses.findOneAndUpdate({_id:id}, data).exec((err, response) => {
          err ? reject(err) : resolve(`updated expense successfully..?:\n${response}`)
        });

      })//promise
    }

}