function User(userAddress, userName) {
	this.userAddress = userAddress;
	this.userName = userName;
	//this.userPassword = userPassword;
}

// User Data Access Object
function UserDao() {
}
UserDao.prototype.find = function(userAddress, callback) {
	MySQL
			.query(
					'SELECT * FROM Gameuser WHERE userAddress = ?',
					[ userAddress ], function(err, rows) {
						if (err)
							throw err;
						if (rows.length === 1) {
							callback(new User(rows[0].userAddress,
									rows[0].userName));// 應該只能找到一筆，所以可以用[0]存取,
									//rows[0].userPassword));// 應該只能找到一筆，所以可以用[0]存取
						} else
							callback(undefined);

					});
}

module.exports.UserDao = new UserDao();// singleton
module.exports.User = User;