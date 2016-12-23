var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/game1', function(req, res, next) {
  res.render('index', { DEV: 'DEV' });
});



module.exports = router;

