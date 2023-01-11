const models = require('./models.js');

module.exports = {

  getExpensesByUserSort: function(req,res) {
    // console.log('controllers BODY', req.body);
    models.getExpensesByUserSort(req.body.username, req.body.sort)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  getUser: function(req,res) {
    // console.log('controllers BODY', req.body);
    models.getUser(req.body.username)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  deleteExpenseById: function(req,res) {
    models.deleteExpenseById(req.body.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },

  deleteUserById: function(req,res) {
    models.deleteUserById(req.body.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },

  insertExpense: function(req,res) {
    models.insertExpense(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  insertUser: function(req,res) {
    console.log('INSERT USER CONTROOLLER');
    models.insertUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  },

  deleteUser: function(req,res) {
    models.deleteUser(req.body.id)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }









}//END EXPORT