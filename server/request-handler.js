

exports.stub = function (req,res) {
  console.log('stub', req.url);
  res.status(204).send();
};




