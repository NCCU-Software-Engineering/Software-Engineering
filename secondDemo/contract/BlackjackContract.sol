pragma solidity ^0.4.0;

//0x55ba98ee78381f8eb78fd1abc7cfcabb7a160090

contract BlackjackContract {
    
    address public ownerAddress;
    address public playerAddress;
    
    uint public ownerMoney;
    uint public playerMoney;
    uint public playerBet;

    Cards ownerCard;
    Cards playerCard;
    
    struct Cards {
        //0~51
        uint number;
        //1Clubs,2Diamonds,3Hearts,4Spades
//        uint suit;
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
    
    function getOwnerMoney() constant returns (uint) {?
        //???
        return 10;
    }
    function getPlayerMoney() constant returns (uint) {
        //???
        return 20;
    }
    
    function playGame(uint bet) {
        
        if (isOwner()) {
            throw;
        }
        if( playerBet > ownerMoney || 0 > playerBet ) {
            throw;
        }
        
        RandomCards();
        
        if( isPlayerWin() ) {
            //ownerMoney to playerMoney (playerBet)
        }
        else {
            //playerMoney to ownerMoney (playerBet)
        }
    }
    
    function RandomCards() {
        
        //???
        ownerCard.number = 2;
        playerCard.number = 1;
    }

    function isPlayerWin() returns (bool) {
        
        if(playerCard.number > ownerCard.number) {
            return true;
        }
        return false;
    }
}