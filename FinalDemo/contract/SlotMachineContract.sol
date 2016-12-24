pragma solidity ^0.4.6;

contract SlotContract {
    
    // 此合約的擁有者
    address private ownerAddress;
    
    uint one;
    uint two;
    uint three;
    
    //拉霸種類 和對應數字
    //enum  Kind {Cherry, BAR1, BAR2, BAR3, Seven1, Seven3, Money, Crystal, WILD}
    //            9       8     7     6     5       4       3      2        1
    
    //三條拉霸 對應GUI
    uint[] Kind1;
    uint[] Kind2;
    uint[] Kind3;

    //亂數種子
    uint private number = 777;

    //回傳事件
	event EndGameEvent(address from, uint256 bonus, uint256 timestamp);
    
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
    
    //取得拉霸條位置
    function getOne() constant returns (uint) {
        return one;
	}
	function getTwo() constant returns (uint) {
        return two;
	}
	function getThree() constant returns (uint) {
        return three;
	}

    //開始遊戲
    function playGame() payable {
        
        if(msg.value == 0) {
            throw;
        }
        
        uint bonus = 0;

        randomKind();
        
        //檢查輸贏
        
        //賭一條線 中間條
        if(msg.value >=10) {
            bonus += countBonus(Kind1[one], Kind2[two], Kind3[three]);
        }
        //賭兩條線 上橫條
        if(msg.value >=20) {
            bonus += countBonus(Kind1[one-1], Kind2[two-1], Kind3[three-1]);
        }
        //賭三條線 下橫條
        if(msg.value >=30) {
            bonus += countBonus(Kind1[one+1], Kind2[two+1], Kind3[three+1]);
        }
        //賭四條線 右上左下斜線
        if(msg.value >=40) {
            bonus += countBonus(Kind1[one+1], Kind2[two], Kind3[three-1]);
        }
        //賭五條線 左上右下斜線
        if(msg.value >=50) {
            bonus += countBonus(Kind1[one-1], Kind2[two], Kind3[three+1]);
        }
        
        if( !msg.sender.send(bonus) ) {
            throw;
        }
        
        EndGameEvent(msg.sender, bonus, now);
    }
    
    //計算獎金
    function countBonus(uint a, uint b, uint c) returns (uint) { 
    
        //中三個 基礎獎金乘5倍
        if(a == b && b == c) {
            return getMagnification(a) * 5;
        }
        
        //中兩個 基礎獎金
        else if(a == b) {
            return getMagnification(a);
        }
        else if(b == c) {
            return getMagnification(b);
        }
        else if(a == c) {
            return getMagnification(c);
        }
        
        //都沒中
        return 0;
    }
    
    //取得每種圖案的基礎獎金
    function getMagnification(uint kind) returns (uint) {
        
        if(kind == 9)
            return 2;
        else if(kind == 8)
            return 4;
        else if(kind == 7)
            return 6;
        else if(kind == 6)
            return 9;
        else if(kind == 5)
            return 15;
        else if(kind == 4)
            return 30;
        else if(kind == 3)
            return 50;
        else if(kind == 2)
            return 330;
        else if(kind == 1)
            return 8888;
            
        //不應該執行到這邊
        throw;
    }
    
    //產生隨機三個拉霸圖的位置
    function randomKind () {
        one = getRandom(45);
        two = getRandom(45);
        three = getRandom(45);
	}
	
	//取得1到range範圍的亂數
    function getRandom(uint range) returns (uint) {
        uint random = (uint(sha256(number))+uint(block.blockhash(block.number-1)))%range;
        number += random;
		return random + 1;
    }
	
	//版本號
    function version() constant returns (string){ 
        return "1.0.4";
    }
	
	//摧毀合約 取回賭場金錢
	function destroy() {
         if (msg.sender == ownerAddress) { 
             suicide(ownerAddress);
        }
    }
}