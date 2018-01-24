
var express = require('express');
var router = express.Router();
//连接数据库
var models = require('../model');

router.route('/add').post(function(req, res) {
  var pet = models.Pet.forge({
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
      userId: req.body.userId
  });
  pet.save().then(function(model){
      res.json({message:'done', data: pet});
  }).catch(function(err){
      res.json({message: 'error', data: err});
  });
});
router.route('/findall').get(function(req, res) {
  models.Pet.forge().fetchAll().then(function(pets) {
      res.json({message: 'done', data: pets});
  }).catch(function(err) {
      res.json({message: 'error', data: err});
  });
});
router.route('/find/:petId').get(function(req, res) {
  models.Pet
  .forge({ petId: req.params.petId})
  .fetch({withRelated: ['user']})
  .then(function(pet) {
      res.json({message: 'done', data: pet});
  })
  .catch(function(err) {
      res.json({message: 'error', data: err});
  });
});
module.exports = router;
