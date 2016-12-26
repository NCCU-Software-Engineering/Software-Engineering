var Web3 = require("web3");

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;

var abiArray = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getThree","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getWinBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"},{"name":"c","type":"uint256"}],"name":"countBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"kind","type":"uint256"}],"name":"getMagnification","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"range","type":"uint256"}],"name":"getRandom","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"randomKind","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"bonus","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"EndGameEvent","type":"event"}];
var contractAddress = "0x776f935b0F79370e12e05A55e3FB9aB62703E1A4";
var contract = web3.eth.contract(abiArray).at(contractAddress);

function getOwnerAddress() {
	return contract.getOwnerAddress();
}
function getPlayerAddress() {
	return contract.getPlayerAddress();
}
function getOwnerMoney() {
	return contract.getOwnerMoney();
}
function getPlayerMoney() {
	return contract.getPlayerMoney();
}
function playGame(CoinTime) {
	contract.playGame({
		from: eth.coinbase,
		value: web3.toWei(CoinTime, 'ether'),
		gas: 3000000
	});
}
function getOne() {
	return contract.getOne();
}
function getTwo() {
	return contract.getTwo();
}
function getThree() {
	return contract.getThree();
}
function getWinBonus() {
    return contract.getWinBonus();
}

var arrow_left = document.getElementById("arrow_left");
var arrow_right = document.getElementById("arrow_right");
var btn_spin = document.getElementById("btn_spin");
var bet_line = document.getElementById("bet_line");
var total_bet = document.getElementById("total_bet");
var player_money = document.getElementById("player_money");

var l0 = document.getElementById("l0");
var l1 = document.getElementById("l1");
var l2 = document.getElementById("l2");

var m0 = document.getElementById("m0");
var m1 = document.getElementById("m1");
var m2 = document.getElementById("m2");

var r0 = document.getElementById("r0");
var r1 = document.getElementById("r1");
var r2 = document.getElementById("r2");

arrow_left.addEventListener("click", Coin_down);
arrow_right.addEventListener("click", Coin_up);
btn_spin.addEventListener("click", Start);


var CoinTime = 10;
var one, two, three;
var x = 2, change = 10; 
var isActive = false;

function Start(){
	
	if(!isActive) {
		console.log("Start");
		isActive = true;
		update();
		
		//開始遊戲
		console.log("playGame" + CoinTime);
		playGame(CoinTime);
		
		var lpic = [10];
		var mpic = [10];
		var rpic = [10];
		var i = 0;
		
		move();	
			
		//事件監聽(合約沒有)
		var event = contract.EndGameEvent({fromBlock :0,toBlock: 'latest' });
		event.watch(function(error,result){
			if(!error){
				console.log(result);
				//圖片停止
				one = getOne();
				two =  getTwo();
				three = getThree();
				console.log("one = " + one);
				console.log("two = " + two);
				console.log("three = " + three);
				console.log("winBonus = " + getWinBonus());
				update();
				//重新開始
				isActive = false;
				CoinTime = 10;
			}
		});
	}
}

function move() {
	
	if(isActive) {
		
		var temp;
		temp = l2.src;
		l2.src = l1.src;
		l1.src = l0.src;
		l0.src = temp;
		 
		temp = m2.src;
		m2.src = m1.src;
		m1.src = m0.src;
		m0.src = temp;
		 
		temp = r2.src;
		r2.src = r1.src;
		r1.src = r0.src;
		r0.src = temp;
		 
		setTimeout(move, 500);
	}
}

function Coin_up(){
	console.log("Coin_up");
	if(CoinTime < 50)
		CoinTime += 10;
	total_bet.innerHTML = CoinTime;
}
function Coin_down(){
	console.log("Coin_down");
	if(CoinTime > 10)
		CoinTime -= 10;
	total_bet.innerHTML = CoinTime;
}
function update(){
	bet_line.innerHTML = getWinBonus();
	player_money.innerHTML = web3.fromWei(eth.getBalance(getPlayerAddress()), 'ether').toFixed(4);
}



