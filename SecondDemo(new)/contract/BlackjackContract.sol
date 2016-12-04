pragma solidity ^0.4.2;

contract BlackjackContract {
    
	// 此合約的擁有者
    address private ownerAddress;
	
    // 每位玩家的賭金
    mapping (address => uint) private playerBets;
	
	// 雙方卡片
    uint ownerCard;
    uint playerCard;
	
	uint number=0;
    uint random=0;
    bool[52] isused;
	
	// 事件們，用於通知前端 web3.js
	event SetPlayerBetEvent(address from, uint256 value, uint256 timestamp);
	event WinGameEvent(address from, uint256 value, uint256 timestamp);
    
	// 建構子
    function BlackjackContract() {
        ownerAddress = msg.sender;
        playerBets[msg.sender] = 0;
    }
    function isOwner() returns (bool) {
        return (msg.sender == ownerAddress);
    }
    
    function getOwnerAddress() constant returns (address) {
        return ownerAddress;
    }
    function getPlayerAddress() constant returns (address) {
        return msg.sender;
    }
    
    function getOwnerMoney() constant returns (uint) {
        return this.balance;
    }
    function getPlayerMoney() constant returns (uint) {
        return msg.sender.balance;
    }
    
    function getPlayerBet() constant returns (uint){
        return playerBets[msg.sender];
    }
    
    function getOwnerCard() constant returns (uint){
        return ownerCard;
    }
    function getPlayerCard() constant returns (uint){
        return playerCard;
    }
    
    function setPlayerBet() payable {
        
		playerBets[msg.sender] += msg.value;
		
		SetPlayerBetEvent(msg.sender, msg.value, now);
    }
    
    function playGame() {
        
//        if (isOwner()) {
//           throw;
//        }

        RandomCards();
        
        if( isPlayerWin() ) {
			WinGameEvent(msg.sender, playerBets[msg.sender], now);
        }
        else {
            //playerMoney to ownerMoney (playerBet)
        }
		playerBets[msg.sender] = 0;
    }

    function RandomCards() {

        ownerCard = Random();
        playerCard = Random();
    }

	function Random() returns (uint) {
	
        uint cards=0;
        for (uint i=0;i<52;i++){
            if (isused[i]){cards++;}
        }
        if (cards==52){
            throw;
        }
        
        random=(uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        while(isused[random]){
        number++;
        random=(uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        
        }
        isused[random]=true;
		return random;
	}
	
    function isPlayerWin() returns (bool) {
        
        if(playerCard > ownerCard) {
            return true;
        }
        return false;
    }
}