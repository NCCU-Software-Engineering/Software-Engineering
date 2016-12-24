pragma solidity ^0.4.2;

contract CardGameContract {
    
	// 此合約的擁有者
    address private ownerAddress;
	
    // 每位玩家的賭金
    mapping (address => uint) private playerBets;
	
	// 雙方卡片
    uint ownerCard;
    uint playerCard;
	
	uint number = 777;
	
	// 事件們，用於通知前端 web3.js
	event SetPlayerBetEvent(address from, uint256 value, uint256 timestamp);
	event EndGameEvent(address from, uint256 value, uint256 timestamp);
    
	// 建構子
    function CardGameContract() {
        ownerAddress = msg.sender;
    }
    function isOwner() returns (bool) {
        return (msg.sender == ownerAddress);
    }
    
    //取得Address
    function getOwnerAddress() constant returns (address) {
        return ownerAddress;
    }
    function getPlayerAddress() constant returns (address) {
        return msg.sender;
    }
    
    //取得錢包金額
    function getOwnerMoney() constant returns (uint) {
        return this.balance;
    }
    function getPlayerMoney() constant returns (uint) {
        return msg.sender.balance;
    }
    
    //取得玩家賭金
    function getPlayerBet() constant returns (uint){
        return playerBets[msg.sender];
    }
    
    //取得雙方卡片
    function getOwnerCard() constant returns (uint){
        return ownerCard;
    }
    function getPlayerCard() constant returns (uint){
        return playerCard;
    }
    
    //玩家設定賭金
    function setPlayerBet() payable {

		playerBets[msg.sender] += msg.value;
		
		SetPlayerBetEvent(msg.sender, msg.value, now);
    }
    
    //開始遊戲
    function playGame(bool big) {
        
//        if (isOwner()) {
//           throw;
//        }

        RandomCards();
        
        //贏
        if( isPlayerWin(big) ) {
		    if( !msg.sender.send(playerBets[msg.sender]*2) ) {
                throw;
            }
        }
        playerBets[msg.sender] = 0;
		
		EndGameEvent(msg.sender, playerBets[msg.sender], now);
    }
    
    //產生隨機兩張牌 確保牌不一樣
    function RandomCards() {

        ownerCard = (uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        number += ownerCard;
        
        playerCard = (uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        number += playerCard;
        
//	    while ( ownerCard == playerCard ) {
//           playerCard = (uint(block.blockhash(block.number+number)))%52;
//            number += playerCard;
//	    }	
	}

	//判斷輸贏
    function isPlayerWin(bool big) constant returns (bool) {
        
        if(big) {
            if(playerCard > ownerCard) {
                return true;
            }
            return false;
        }
        else {
            if(playerCard < ownerCard) {
                return true;
            }
            return false;
        }
    }
    
    //版本號
    function version() constant returns (string){ 
        return "2.0.0";
    }
    
    //摧毀合約 取回賭場金錢
    function destroy() { // so funds not locked in contract forever
         if (msg.sender == ownerAddress) { 
             suicide(ownerAddress); // send funds to organizer
        }
    }
}