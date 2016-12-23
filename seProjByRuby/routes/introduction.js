var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/introduction', function(req, res, next) {
  res.render('index', { DEV: 'DEV' });
});



module.exports = router;

