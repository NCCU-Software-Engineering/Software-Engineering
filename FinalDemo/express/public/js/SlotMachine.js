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
function playGame(coin) {
	contract.playGame({
		from: eth.coinbase,
		value: web3.toWei(coin, 'ether'),
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
var money = document.getElementById("player_money");

var arrow_left = document.getElementById("arrow_left");
var arrow_right = document.getElementById("arrow_right");

var btn_spin = document.getElementById("btn_spin");
var bet = document.getElementById("bet");
var total_bet = document.getElementById("total_bet");

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


var CoinTime = 0;
var linebet = 0;
var one, two, three;
var kind1 = [7,1,5,2,6,1,3,8,3,7,1];
var kind2 = [3,4,8,2,7,6,4,5,1,3,4];
var kind3 = [7,4,2,5,8,1,6,8,3,7,4];
var x = 5,y = 8,z = 8;
var stop = false;
bet.innerHTML = 10;
function Start(){
	console.log("Start");
	
	playGame(CoinTime * 10);
	CoinTime = 0;
	linebet = 0;
	
	var lpic = [10];
	var mpic = [10];
	var rpic = [10];
	var i = 0;
	move1();
	move2();
	move3();
	//??????(?X???S??)
	var number = web3.eth.blockNumber;
	console.log(number);
	var event = contract.EndGameEvent({from:web3.coinbase},{fromBlock :number,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			//???????
			one = getOne();
			two =  getTwo();
			three = getThree();
			stop = true;
			console.log(one);
			console.log(one-1);
			l2.src = "images/game2/Slots/mark"+kind1[one+1]+".png";
			l1.src = "images/game2/Slots/mark"+kind1[one]+".png";
			l0.src = "images/game2/Slots/mark"+kind1[one-1]+".png";;
	
			m2.src = "images/game2/Slots/mark"+kind2[two+1]+".png";
			m1.src = "images/game2/Slots/mark"+kind2[two]+".png";
			m0.src = "images/game2/Slots/mark"+kind2[two-1]+".png";

			r2.src = "images/game2/Slots/mark"+kind3[three+1]+".png";
			r1.src = "images/game2/Slots/mark"+kind3[three]+".png";
			r0.src = "images/game2/Slots/mark"+kind3[three-1]+".png";
			
			console.log("one = " + one);
			console.log("two = " + two);
			console.log("three = " + three);
			console.log("winBonus = " + getWinBonus());
			//???s?}?l
			event.stopWatching();
		}
	});
}
function move1() {
	if(stop){
		return;
	}
	l2.src = "images/game2/Slots/mark"+kind1[x+1]+".png";
	l1.src = "images/game2/Slots/mark"+kind1[x]+".png";
	l0.src = "images/game2/Slots/mark"+kind1[x-1]+".png";
	x--;
	if(x == 1)
		x = 10;
	setTimeout(move1,100);
}
function move2(){
	if(stop)
		return;
	m2.src = "images/game2/Slots/mark"+kind2[y+1]+".png";
	m1.src = "images/game2/Slots/mark"+kind2[y]+".png";
	m0.src = "images/game2/Slots/mark"+kind2[y-1]+".png";
	y--;
	if(y == 1)
		y = 10;
	setTimeout(move2,100);
}
function move3(){
	if(stop)
		return;
	r2.src = "images/game2/Slots/mark"+kind3[z+1]+".png";
	r1.src = "images/game2/Slots/mark"+kind3[z]+".png";
	r0.src = "images/game2/Slots/mark"+kind3[z-1]+".png";
	z--;
	if(z == 1)
		z = 10;
	setTimeout(move3,100);
}
function Coin_up(){
	console.log("Coin_up2");
	if(CoinTime < 5)
		CoinTime += 1;
	total_bet.innerHTML = CoinTime * 10;
}
function Coin_down(){
	console.log("Coin_down2");
	if(CoinTime > 0)
		CoinTime -= 1;
	total_bet.innerHTML = CoinTime * 10;
}
function update(){
	money.innerHTML = web3.fromWei(eth.getBalance(getPlayerAddress()), 'ether').toFixed(0);
}
update();