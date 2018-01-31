
var express = require('express');
var router = express.Router();
//连接数据库
var models = require('../model');
router.route('/add').post((req, res) => {
  var user = models.User.forge({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    hobby: req.body.hobby
  });
  user.save()
  .then((model) => {
    res.json({ message: 'done', data: model });
  })
  .catch((err) => {
    res.json({ message: 'error', data: err });
  });
});
router.route('/find/:userId').get((req, res) => {
  models.User
  .forge({userId: req.params.userId})
  .fetch({withRelated: ['pets']})
  .then((user) => {
    res.json({ message: 'done', data: user });
  })
  .catch((err) => {
    res.json({ message: 'error', data: err });
  }); 
 
});
router.route('/co').post((req, res) => {
  models.User.forge().count()
  .then((resp) => {
    res.json({ message: 'done', data:resp });
  })
  .catch((err) => {
    res.json({ message: 'error', data: err });
  });
 
})
module.exports = router;
