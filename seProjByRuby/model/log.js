function Log(userAddress, userName,gamelog,timeStamp) {
	this.userAddress = userAddress;
	this.userName = userName;
	this.gamelog = gamelog;
	this.timeStamp = timeStamp;
}

function LogDao() {

}

// 
LogDao.prototype.findByAddress = function(userAddress, callback) {
	MySQL
			.query(
					'SELECT userAddress , userName, gamelog,timeStamp FROM  Gamelog WHERE userAddress = ? ;',
					[ userAddress ], function(err, rows) {
						if (err)
							throw err;
						var results = [];
						rows.forEach(function(element) {
							results.push(new Log(
									element.userAddress,
									element.userName, 
									element.gamelog,
									element.timeStamp));
						});
						console.log(results);
						callback(results); // 回傳courseList
					})
}

module.exports.LogDao = new LogDao(); // singleton
module.exports.Log = Log; // constructor
