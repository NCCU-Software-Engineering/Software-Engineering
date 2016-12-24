var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;

var abiArray = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"big","type":"bool"}],"name":"playGame","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwnerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"RandomCards","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerMoney","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPlayerCard","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"setPlayerBet","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"big","type":"bool"}],"name":"isPlayerWin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"SetPlayerBetEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"EndGameEvent","type":"event"}];
var contractAddress = "0x68adE4E9a7EF2F340360Ada0dE892e2006C31B16";
var contract = web3.eth.contract(abiArray).at(contractAddress);

function getOwnerAddress() {
	return contract.getOwnerAddress();
}
function getPlayerAddress() {
	return contract.getPlayerAddress();
}

function isPlayerWin(big) {
	return contract.isPlayerWin(big);
}

function getOwnerMoney() {
	return contract.getOwnerMoney();
}
function getPlayerMoney() {
	return contract.getPlayerMoney();
}

function playGame(big) {
	contract.playGame(big, {
		from: eth.coinbase,
		gas: 3000000
	});
}

function getOwnerCard() {
	return contract.getOwnerCard();
}
function getPlayerCard() {
	return contract.getPlayerCard();
}

function getPlayerBet() {
	return contract.getPlayerBet();
}
function setPlayerBet(bet) {
	contract.setPlayerBet({
		from: eth.coinbase,
		value: web3.toWei(bet, 'ether'),
		gas: 3000000
	});
}

function version() {
	return contract.version();
}

var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var comparison = document.getElementById("comparison");

var button_big = document.getElementById("button_big");
var button_small = document.getElementById("button_small");
var button_start = document.getElementById("button_start");
var button_confirm = document.getElementById("button_confirm");

var frm = document.getElementById("frm1");

var bankerMoney = document.getElementById("bankerMoney");
var yourMoney = document.getElementById("yourMoney");
var bet = document.getElementById("bet");

button_big.addEventListener("click", big);
button_small.addEventListener("click", small);
button_start.addEventListener("click", init);
button_confirm.addEventListener("click", conf);

function init(){
	
	console.log("init");
	
	console.log("OwnerAddress = " + getOwnerAddress());
	console.log("PlayerAddress = " + getPlayerAddress());
	
	console.log("getOwnerCard = " + getOwnerCard());
	console.log("getPlayerCard = " + getPlayerCard());
	
	console.log("version = " + version());
	
	//comparison出現
	comparison.style.visibility = "visible";
	
	//win lose消失
	win.style.visibility = "hidden";
	lose.style.visibility = "hidden";
	
	//button_start隱藏
	button_start.style.visibility = "hidden";
	
	//button_big button_small隱藏
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	
	//出現輸入賭金
	frm1.style.visibility = "visible";
	
	//刷新數值
	update();
}
function conf() {
	console.log("conf");
	
	//卡片翻回背面
	card1.src = "images/game1/reverse.png";
	card2.src = "images/game1/reverse.png";
	
	var tempBet = parseInt(frm.elements[0].value);

	console.log("setPlayerBet = " + tempBet);
	setPlayerBet(tempBet);
	frm1.style.visibility = "hidden";
	
	var event = contract.SetPlayerBetEvent({fromBlock :0,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			console.log("setPlayerBet success");
			button_big.style.visibility = "visible";
			button_small.style.visibility = "visible";
			update();
		}
	});
}

function big(){
	console.log("big");
	
	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	comparison.style.visibility = "hidden";
	
	playGame(true);
	
	var event = contract.EndGameEvent({fromBlock :0,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			update();
			showCard();
			
			if(isPlayerWin(true)){
				console.log("win big");
				winGame();
			}
			else {
				console.log("lose big");
				loseGame();
			}
			button_start.style.visibility = "visible";
		}
		else {
			console.log("error");
		}
	});
}

function small(){
	console.log("small");

	button_big.style.visibility = "hidden";
	button_small.style.visibility = "hidden";
	comparison.style.visibility = "hidden";
	
	playGame(false);
	
	var event = contract.EndGameEvent({fromBlock :0,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			update();
			showCard();
			
			if(isPlayerWin(false)) {
				console.log("win small");
				winGame();
			}
			else {
				console.log("lose small");
				loseGame();
			}
			button_start.style.visibility = "visible";
		}
		else {
			console.log("error");
		}
	});
}

function showCard() {
	console.log("showCard");
	
	card1.src = "images/poker/card" + getOwnerCard() + ".png";
	card2.src = "images/poker/card" + getPlayerCard() + ".png";
}

function winGame() {
	console.log("winGame");
	win.style.visibility = "visible";
	lose.style.visibility = "hidden";
	update();
}

function loseGame() {
	console.log("loseGame");
	win.style.visibility = "hidden";
	lose.style.visibility = "visible";
	update();
}
function update() {
	
	bankerMoney.innerHTML = web3.fromWei(getOwnerMoney(), 'ether');
	yourMoney.innerHTML = web3.fromWei(eth.getBalance(getPlayerAddress()), 'ether');
	
	bet.innerHTML = web3.fromWei(getPlayerBet(), 'ether');
}
