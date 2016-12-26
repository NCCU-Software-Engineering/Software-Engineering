var Web3 = require("web3");

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;

var abiArray = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getThree","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"},{"name":"c","type":"uint256"}],"name":"countBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"kind","type":"uint256"}],"name":"getMagnification","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOne","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"range","type":"uint256"}],"name":"getRandom","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"randomKind","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTwo","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"bonus","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"EndGameEvent","type":"event"}];
var contractAddress = "0x9314E439bF16392Aa3718AA6cFd46B2e4eC4911c";
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
function getBonus() {
    return contract.getBonus();
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
var one = -1, two = -1, three = -1;
var x = 2, change = 10; 
var isActive = false;

var lpic = [5, 6, 2, 9, 3, 8, 4, 9, 7, 1];
var mpic = [6, 2, 9, 5, 1, 3, 9, 7, 4, 8];
var rpic = [6, 2, 9, 7, 4, 8, 5, 9, 3, 1];

var position1 = 99999;
var position2 = 99999;
var position3 = 99999;

function Start(){
	
	if(!isActive) {
		console.log("Start");
		isActive = true;
		update();
		one = -1;
		two = -1;
		three = -1;
		
		//開始遊戲
		console.log("playGame:" + CoinTime);
		playGame(CoinTime);
		
		var i = 0;
		
		move1();
		move2();
		move3();
			
		//事件監聽(合約沒有)
		var number = web3.eth.blockNumber;
		console.log("number = " + number);
		var event = contract.EndGameEvent({from:web3.coinbase},{fromBlock :number,toBlock: 'latest' });
		event.watch(function(error,result){
			if(!error){
				event.stopWatching()
				console.log(result);
				//圖片停止
				one = getOne() - 1;
				two =  getTwo() - 1;
				three = getThree() - 1;
				console.log("one = " + one);
				console.log("two = " + two);
				console.log("three = " + three);
				console.log("winBonus = " + getBonus());
				update();
				//重新開始
				isActive = false;
				CoinTime = 10;
			}
		});
	}
}

function move1() {
	
	if((position1)%10 != one) {
		
		position1 --;
		
		l0.src = SetSrc(lpic[(position1-1)%10]);
		l1.src = SetSrc(lpic[(position1)%10]);
		l2.src = SetSrc(lpic[(position1+1)%10]);
		 
		setTimeout(move1, 300);
	}
}
function move2() {
	
	if((position2)%10 != two) {

		position2 --;
	
		m0.src = SetSrc(mpic[(position2-1)%10]);
		m1.src = SetSrc(mpic[(position2)%10]);
		m2.src = SetSrc(mpic[(position2+1)%10]);
		
		setTimeout(move2, 250);
	}
}
function move3() {
	
	if((position3)%10 != three) {
		
		position3 --;
		
		r0.src = SetSrc(rpic[(position3-1)%10]);
		r1.src = SetSrc(rpic[(position3)%10]);
		r2.src = SetSrc(rpic[(position3+1)%10]);
		 
		setTimeout(move3, 200);
	}
}

function SetSrc(i){
	return "images/game2/Slots/mark" + i + ".png";
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
	bet_line.innerHTML = getBonus();
	player_money.innerHTML = web3.fromWei(eth.getBalance(getPlayerAddress()), 'ether').toFixed(3);
}


