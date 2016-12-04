pragma solidity ^0.4.0;

//0x55ba98ee78381f8eb78fd1abc7cfcabb7a160090

contract BlackjackContract {
    
    address public ownerAddress;
//  address public playerAddress; == msg.sender
    
    uint public playerBet;

    Cards ownerCard;
    Cards playerCard;
    
    struct Cards {
        //0~51
        uint number;
    }
    
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
            msg.sender.send(playerBet);
        }
        else {
            //playerMoney to ownerMoney (playerBet)
        }
    }
    
    function RandomCards() {
        
        //待完成
        ownerCard.number = 2;
        playerCard.number = 3;
    }

    function isPlayerWin() returns (bool) {
        
        if(playerCard.number > ownerCard.number) {
            return true;
        }
        return false;
    }
}