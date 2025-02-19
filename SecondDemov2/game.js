
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

//var abiArray = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bet","type":"uint256"}],"name":"setPlayerBet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"RandomCards","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isPlayerWin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"playerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
var abiArray = [{"constant":false,"inputs":[],"name":"getBlocknum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bet","type":"uint256"}],"name":"setPlayerBet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"RandomCards","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isPlayerWin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"getArray","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"playerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}];
//var contractAddress = "0x95570ad35ea2464999b7de52312f832ae2306444";
var contractAddress = "0xb16b8132ec5e57439593d65a80af13b93288fc95";
var contract = web3.eth.contract(abiArray).at(contractAddress);

function isPlayerWin() {
	return contract.isPlayerWin();
}

function getOwnerMoney() {
	return contract.getOwnerMoney();
}
function getPlayerMoney() {
	return contract.getPlayerMoney();
}

function playGame() {
	contract.playGame();
}

function getOwnerCard() {
	return contract.getOwnerCard();
}
function getPlayerCard() {
	return contract.getPlayerCard();
}

var banker, player;
var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var win = document.getElementById("win");
var lose = document.getElementById("lose");

var button_big = document.getElementById("button_big");
var button_small = document.getElementById("button_small");
var button_start = document.getElementById("button_start");
var button_confirm = document.getElementById("button_confirm");

var frm = document.getElementById("frm1");

var money = document.getElementById("money");
var bet = document.getElementById("bet");

button_big.addEventListener("click", big);
button_small.addEventListener("click", small);
button_start.addEventListener("click", init);
button_confirm.addEventListener("click", conf);

function owner(number){
	this.number = number;
}
function init(){
	console.log("init");
	
	//win lose消失
	win.style.visibility = "hidden";
	lose.style.visibility = "hidden";
	
	//button_start隱藏
	button_start.style.visibility = "hidden";
	
	//button_big button_small隱藏
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	
	//卡片翻回背面
	card1.src = "pic/reverse.png";
	card2.src = "pic/reverse.png";
	
	//出現輸入賭金
	frm1.style.visibility = "visible";
	
	//bet monry初始化
	money.innerHTML = getPlayerMoney();
	bet.innerHTML = 0;
}
function conf() {
	console.log("conf");
	
	if(setBet()){	
		//隱藏輸入賭金
		frm1.style.visibility = "hidden";
		
		button_big.style.visibility = "visible";
		button_small.style.visibility = "visible";
	}
}

function setBet(){
	console.log("setBet");
	
	var tempBet = parseInt(frm.elements[0].value);
	
	if(contract.setPlayerBet(tempBet)) {
		bet.innerHTML = tempBet;
		return true;
	}
	return false;
}
function showCard() {
	console.log("showCard");
	
	card1.src = "pic/card" + getownerrCard() + ".png";
	card2.src = "pic/card" + getPlayerCard() + ".png";
	
}

function big(){
	
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	
	playGame();
	showCard();
	
	if(isPlayerWin()){
		winGame();
	}
	else {
		loseGame();
	}
	
	button_start.style.visibility = "visible";
}

function small(){

	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	
	playGame();
	showCard();
	
	if(!isPlayerWin()) {
		winGame();
	}
	else {
		loseGame();
	}
	button_start.style.visibility = "visible";
}

function winGame() {
	console.log("winGame");
	win.style.visibility = "visible";
	lose.style.visibility = "hidden";
}

function loseGame() {
	console.log("loseGame");
	win.style.visibility = "hidden";
	lose.style.visibility = "visible";
}
