const db = require('./db.js');

module.exports = {
  testModelDB: function() {

    return new Promise((resolve,reject) => {
      db.tests.find()
      .then((data) => {
        resolve(data);
      })
      .catch(err => {
        console.log('error in DB', err);
        reject(err);
      })
    })
    },

}