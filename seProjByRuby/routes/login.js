var express = require('express');
var router = express.Router();
var UserDao = require('../model/user').UserDao;
var LogDao = require('../model/log').LogDao;

router.get('/', function(req, res) {
	// operations not supported
	toLoginPage(res, '');
});

router.post('/', function(req, res) {
	//toLoginPage(res, req.body.userAddress);

	if (!req.body.userAddress) { // user name empty
		toLoginPage(res, '帳號不可為空白');
		return;
	}

	UserDao.find(req.body.userAddress, function(User) {
	
	
		
		// no such id
		if (!User) {
			console.log('no such user:' + req.body.userAddress);
			toLoginPage(res, '無此帳號:' + req.body.userAddress);
			return;
		}
		
		// password incorrect
		if (User.userName !== req.body.userName) {
			console.log('Name incorrect');
			toLoginPage(res, '名稱錯誤');
			return;
		}
		// password incorrect
		/*if (User.userPassword !== req.body.userPassword) {
			console.log('password incorrect');
			toLoginPage(res, '密碼錯誤');
			return;
		}*/

		LogDao.findByAddress(req.body.userAddress, function(logs) {
			res.render('userdetail', {// login correct
				Address : User.userAddress,
				logs : logs
				//log: user.log,
				//timeStamp : user.timeStamp
			});
		}

		);

	});
});


function toLoginPage(res, msg) {
	res.render('login', {
		message : msg
	});
}
module.exports = router;