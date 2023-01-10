
module.exports = {
  test: function(req,res) {
    console.log('test Controller with req body id', req.params.id);
    res.status(200).send(req.params.id)
  }
}