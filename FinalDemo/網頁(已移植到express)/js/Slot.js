var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;

var abiArray;
var contractAddress;
var contract = web3.eth.contract(abiArray).at(contractAddress);
var CoinTime = 0;

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
function playGame() {
	contract.playGame({
		from: eth.coinbase,
		gas: 3000000
	});
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
function Coin(){
	CoinTime += 1;
	if(CoinTime == 5)
		Start();
}
function Start(){
	setPlayerBet(bet * CoinTime);
	//�}�l�C��
	playGame(CoinTime);
	CoinTime = 0;
	//�Ϥ�����
	/*...*/
	//�ƥ��ť(�X���S��)
	var event = contract.PlayGameEvent({fromBlock :0,toBlock: 'latest' });
	event.watch(function(error,result){
		if(!error){
			console.log(result);
			//�Ϥ�����
			//���s�}�l
		}
	});
}
function init(){
	//���m
}