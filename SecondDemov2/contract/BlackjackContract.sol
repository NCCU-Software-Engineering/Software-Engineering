pragma solidity ^0.4.2;

contract BlackjackContract {
    
    address public ownerAddress;
//  address public playerAddress; == msg.sender
    
    uint public playerBet;

    uint ownerCard;
    uint playerCard;
    uint number=0;
    uint random=0;
    bool[52] isused;
    
    function BlackjackContract() {
        ownerAddress = msg.sender;
        playerBet = 0;
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
        return playerBet;
    }
    
    function getOwnerCard() constant returns (uint){
        return ownerCard;
    }
    function getPlayerCard() constant returns (uint){
        return playerCard;
    }
    
    function setPlayerBet(uint bet) {
        
        //賭金不能比賭場錢多 或 賭金不能小於1 或 比他自己的錢多
        if( bet>this.balance || 1>bet ) {
            throw;
        }
        //設定賭金
        playerBet = bet;
    }
    
    function playGame() {
        
        if (isOwner()) {
            throw;
        }

        RandomCards();
        
        if( isPlayerWin() ) {
            //ownerMoney to playerMoney (playerBet)
            //msg.sender.send(playerBet);
        }
        else {
            //playerMoney to ownerMoney (playerBet)
        }
    }

    function RandomCards() public returns (uint){
        uint cards=0;
        for (uint i=0;i<52;i++){
            if (isused[i]){cards++;}
        }
        if (cards==52){
            throw;
        }
        
        number++;
        random=(uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        while(isused[random]){
        random=(uint(sha256(number))+uint(block.blockhash(block.number-1)))%52;
        }
        isused[random]=true;
        //待完成
        ownerCard = 2;
        playerCard = 3;
        return random;
    }
    
    /*
    function getArray(uint num) returns (bool){
        return isused[num];
    }
    function getNum() returns (uint){
        return number;
    }
    
    function getBlocknum() returns (uint){
        return block.number;
    }
    */
    function isPlayerWin() returns (bool) {
        
        if(playerCard > ownerCard) {
            return true;
        }
        return false;
    }
}