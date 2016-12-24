pragma solidity ^0.4.2;

contract SlotContract {
    
    // 此合約的擁有者
    address private ownerAddress;
 
    // 每位玩家的賭金
    mapping (address => uint) private playerBets;
    
    //拉霸種類
    enum  Kind {JP, Box, BAR, Seven, Jocker, Spade, Heart, Diamond, Club}
    Kind[3] kind;
    
    //亂數種子
    uint private number = 777;

    //回傳事件
    event SetPlayerBetEvent(address from, uint256 value, uint256 timestamp);
	event WinGameEvent(address from, uint256 value, uint256 timestamp);
    
    //建構子
    function SlotContract() payable {
        ownerAddress = msg.sender;
    }
    
    //Owner
    function isOwner() returns (bool) {
        return (msg.sender == ownerAddress);
    }
    function getOwnerAddress() constant returns (address) {
        return ownerAddress;
    }
    function getOwnerMoney() constant returns (uint) {
        return this.balance;
    }
    
    //Player
    function getPlayerAddress() constant returns (address) {
        return msg.sender;
    }
    function getPlayerMoney() constant returns (uint) {
        return msg.sender.balance;
    }
    function setPlayerBet() payable {
		playerBets[msg.sender] += msg.value;
		
		SetPlayerBetEvent(msg.sender, msg.value, now);
    }
    
    //開始遊戲
    function playGame() {
        
        if(playerBets[msg.sender]==0) {
            throw;
        }

        randomKind();
        
        //檢查輸贏
        if(kind[0]==kind[1] && kind[1]==kind[2]) {
            payPlayer(kind[0], true);
        }
        else if(kind[0]==kind[1]) {
            payPlayer(kind[0], false);
        }
        else if(kind[1]==kind[2]) {
            payPlayer(kind[1], false);
        }
        else if(kind[0]==kind[2]) {
            payPlayer(kind[0], false);
        }
    }
    function payPlayer(Kind winKind, bool triple){
        
        uint value;
        
        if(winKind == Kind.Club)
            value = 2;
        else if(winKind == Kind.Diamond)
            value = 4;
        else if(winKind == Kind.Heart)
            value = 6;
        else if(winKind == Kind.Spade)
            value = 9;
        else if(winKind == Kind.Jocker)
            value = 15;
        else if(winKind == Kind.Seven)
            value = 30;
        else if(winKind == Kind.BAR)
            value = 50;
        else if(winKind == Kind.Box)
            value = 330;
        else if(winKind == Kind.JP)
            value = 8888;

        if(triple)
            value *= 5;
        
        if( !msg.sender.send(value) ) {
            throw;
        }
        
        playerBets[msg.sender] -= 10;
    }
    
    //產生隨機三個拉霸圖
    function randomKind () {
        kind[0] = probability();
        kind[1] = probability();
        kind[2] = probability();
	}
	
	//根據機率產生拉霸圖
    function probability() private returns (Kind) {
        
        uint random = getRandom(45);
        
        if(27 <= random && random <= 45)//27~45
            return Kind.Club;
        if(29 <= random && random <= 36)//29~36
            return Kind.Diamond;            
        if(22 <= random && random <= 28)//22~28
            return Kind.Heart;
        if(16 <= random && random <= 21)//16~21
            return Kind.Spade;   
        if(11 <= random && random <= 15)//11~15
            return Kind.Jocker;
        if(7  <= random && random <= 10)//7~10
            return Kind.Seven;    
        if(4  <= random && random <=  6)//4~6
            return Kind.BAR;    
        if(2  <= random && random <=  3)//2~3
            return Kind.Box;    
        if(random == 1)//1
            return Kind.JP;
	}
	
    function getRandom(uint range) returns (uint) {
        uint random = (number+uint(block.blockhash(block.number-1)))%range;
        number += random;
		return random + 1;
	}
	
	function getKind(uint i) constant returns (uint) {
        
        if(kind[i] == Kind.Club)
            return 9;
        else if(kind[i] == Kind.Diamond)
            return 8;
        else if(kind[i] == Kind.Heart)
            return 7;
        else if(kind[i] == Kind.Spade)
            return 6;
        else if(kind[i] == Kind.Jocker)
            return 5;
        else if(kind[i] == Kind.Seven)
            return 4;
        else if(kind[i] == Kind.BAR)
            return 3;
        else if(kind[i] == Kind.Box)
            return 2;
        else if(kind[i] == Kind.JP)
            return 1;
    }   
	   
	function destroy() {
         if (msg.sender == ownerAddress) { 
             suicide(ownerAddress);
        }
    }
}