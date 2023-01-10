const models = require('./models.js');

module.exports = {

  test: function(req,res) {
    console.log('test Controller with req body id', req.params.id);
    res.status(200).send(req.params.id)
  },

  testDB: function(req,res) {
    models.testModelDB()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  }









}