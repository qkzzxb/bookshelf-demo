let express = require('express');
var _ = require('lodash');
let router = express.Router();
let md5 = require('../utils/md5');
const { Booking, Room } = require('../model/models.js');
router.get('/',(req, res, next) => {
  Room.collection()
  // .query('where', 'build_id', '=', req.query.build_id)
  .fetch({
    withRelated: ['bookings'] 
  })
  .then(data => {
    res.json({code: 200, data: data, msg:'OK!'});
  })
  .catch(err => {
    res.json({code: -100, msg: err});
  })
});
module.exports = router;
