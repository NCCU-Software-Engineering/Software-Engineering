var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;

var abiArray = ;
var contractAddress = "";
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

var CoinTime = 0;
var one, two, three;

function Start(){

	//開始遊戲
	playGame(CoinTime);
	CoinTime = 0;
	
	//圖片移動
	/*...*/
	
	//事件監聽(合約沒有)
	var event = contract.EndGameEvent({fromBlock :0,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			
			//圖片停止
			one = getOne();
			two =  getTwo();
			three = getThree();
			
			//重新開始
		}
	});
}

function Coin(){
	if(CoinTime < 50)
		CoinTime += 10;
}

function init(){
	//重置
}