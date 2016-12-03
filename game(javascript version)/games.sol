/*new contract*/
// 0x0119db42323c89f96d25f2e7e3b9db10c81a0704
pragma solidity ^0.4.0;
contract games{
    
    address public banker;
    mapping (address => uint) public player_bet;
    function games(){
        banker = msg.sender;
    }
    function bet(uint value) public {
        player_bet[msg.sender] = value;
    }
    function getBanker() constant returns (address){
        return banker;
    }
    function getPlayer() constant returns (address){
        return msg.sender;
    }
    function getValue() constant returns (uint){
        return player_bet[msg.sender];
    }
}

/*old contract*/
// 0x6c00548dada6a8c9a77f667ddc69c1a12949833b
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