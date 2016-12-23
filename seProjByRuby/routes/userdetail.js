var express = require('express');
var router = express.Router();
//var LogDao = require('../model/log').LogDao;
/*
router.get('/', function(req, res) {
	LogDao.find(req.query.sid, req.query.unitId, function(reports) {
		res.render('showReports', {
			user: req.query.user,
			account: req.query.account,
			//log : reports
		})
	});
});
*/
module.exports = router;