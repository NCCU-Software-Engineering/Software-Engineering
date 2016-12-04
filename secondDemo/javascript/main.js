var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var abiArray =
var contractAddress =
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
var button_restart = document.getElementById("button_restart");
var button_confirm = document.getElementById("button_confirm");

var frm = document.getElementById("frm1");

var money = document.getElementById("money");
var bet = document.getElementById("bet");

button_big.addEventListener("click", big);
button_small.addEventListener("click", small);
button_restart.addEventListener("click", init);
button_confirm.addEventListener("click", conf);

function owner(number){
	this.number = number;
}
function init(){
	//win lose消失
	win.style.visibility = "hidden";
	lose.style.visibility = "hidden";
	
	//button_restart隱藏
	button_restart.style.visibility = "hidden";
	
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
	if(setBet()){	
		//隱藏輸入賭金
		frm1.style.visibility = "hidden";
		
		button_big.style.visibility = "visible";
		button_small.style.visibility = "visible";
	}
}

function setBet(){
	
	var tempBet = parseInt(frm.elements[0].value);
	
	if(contract.setPlayerBet(tempBet)) {
		bet.innerHTML = tempBet;
		return true;
	}
	return false;
}
function showCard() {
	
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
	
	button_restart.style.visibility = "visible";
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
	button_restart.style.visibility = "visible";
}

function winGame() {
	win.style.visibility = "visible";
	lose.style.visibility = "hidden";
}

function loseGame() {
	win.style.visibility = "hidden";
	lose.style.visibility = "visible";
}
