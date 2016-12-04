pragma solidity ^0.4.0;
contract games{
    
    address public banker;
    address public player;
    uint public bet_value;
    function games(){
        banker = msg.sender;
    }
    
    function bet(uint value) public {
        bet_value = value;
        player = msg.sender;
    }
    function getBanker() constant returns (address){
        return banker;
    }
    function getPlayer() constant returns (address){
        return player;
    }
    function getValue() constant returns (uint){
        return bet_value;
    }
}