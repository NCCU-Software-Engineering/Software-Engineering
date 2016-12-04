var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var abiArray = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bet","type":"uint256"}],"name":"setPlayerBet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"RandomCards","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isPlayerWin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"playGame","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"playerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
var contractAddress = "0x55ba98ee78381f8eb78fd1abc7cfcabb7a160090";
var contract = web3.eth.contract(abiArray).at(contractAddress);

function setBet(bet){
//	contract.bet(v, { from: web3.eth.coinbase} );
	contract.setPlayerBet(bet);
	return contract.getPlayerBet().toNumber();
	//web3.eth.sendTransaction({from: contract.getPlayer(), to: contract.getBanker.call(), value: web3.toWei(contract.getValue().toNumber(), "ether")});
}
function Win(){
	//web3.eth.sendTransaction({from: contract.getBanker(), to: contract.getPlayer.call(), value: web3.toWei(contract.getValue().toNumber() * 2, "ether")});
}
function getPlayerMoney(){
	return web3.fromWei(web3.eth.getBalance(contract.getPlayerMoney()).toNumber(),"ether");
}
function playGame(){
	
}
function getCard1(){
	return contract.ownerCard.number;
}
function getCard2(){
	return contract.playerCard.number;
}
function isPlayerWin(){
	return contract.isPlayerWin();
}

var banker, player;
var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var Comparison = document.getElementById("Comparison");

var button_big = document.getElementById("button_big");
var button_small = document.getElementById("button_small");
var button_start = document.getElementById("button_start");

var win = document.getElementById("win");
var lose = document.getElementById("lose");
var restart = document.getElementById("restart");

var frm = document.getElementById("frm1");
var bet = document.getElementById("bet");
var money = document.getElementById("money");


button_big.addEventListener("click", big);
button_small.addEventListener("click", small);
button_start.addEventListener("click", gamestart);

restart.addEventListener("click", init);

function owner(number,color){
	this.number = number;
	this.color = color;
}
function init(){
	win.style.display = "none";
	lose.style.display = "none";
	restart.style.visibility = "hidden";
	Comparison.style.display = "none";
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	card1.src = "pic/reverse.png";
	card2.src = "pic/reverse.png";
	frm.style.display = "block";
	bet.innerHTML = 0;
	money.innerHTML = getPlayerMoney();
}

function gamestart(){
	frm.style.display = "none";
	bet.innerHTML = Setbet(parseInt(frm.elements[0].value));
	money.innerHTML = getPlayerMoney();
	button_start.style.display = "block";
	button_big.style.visibility = "visible";
	button_small.style.visibility = "visible";
	playGame();
}


function big(){
	button_start.style.display = "none";
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	
	showcard();
	
	if(isPlayerWin()){
		win.style.display = "block";
		Win();
	}
	else {
		lose.style.display = "block";
	}
	restart.style.visibility = "visible";
	
/*	if(banker.number < player.number){
		win.style.display = "block";
		Win();
	}
	else if(banker.number > player.number){
		lose.style.display = "block";
	}
	else if(banker.number == player.number){
		if(banker.color > player.color)
			lose.style.display = "block";
		else if(banker.color < player.color){
			win.style.display = "block";
			Win();
		}
	}
*/
}

function small(){
	button_start.style.display = "none";
	button1.style.visibility = "hidden";
	button2.style.visibility = "hidden";
	
	showcard();
	
	if(!isPlayerWin()) {
		win.style.display = "block";
		Win();
	}
	else {
		lose.style.display = "block";
	}
	restart.style.visibility = "visible";
	
/*	if(banker.number < player.number){
		lose.style.display = "block";
	}
	else if(banker.number > player.number){
		win.style.display = "block";
		Win();
	}
	else if(banker.number == player.number){
		if(banker.color > player.color){
			win.style.display = "block";
			Win();
		}
		else if(banker.color < player.color)
			lose.style.display = "block";
	}
*/
}

function showcard(){
	var rand1,rand2;
	rand1 = Math.floor(Math.random() * 52);
	banker = new owner(rand1 % 13 + 1, Math.floor(rand1 / 13));
	rand2 = Math.floor(Math.random() * 52);
	player = new owner(rand2 % 13 + 1, Math.floor(rand2 / 13));
	card1.src = "poker/card" + rand1 + ".png";
	card2.src = "poker/card" + rand2 + ".png";
	if(rand1 == rand2){
		showcard();
	}
}
var start = function(){
	init();
}();