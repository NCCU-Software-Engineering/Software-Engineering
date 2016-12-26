pragma solidity ^0.4.6;

contract SlotMachineContract {
    
    // 此合約的擁有者
    address private ownerAddress;
    mapping (address => uint) private bonusMaping;
    
    uint one;
    uint two;
    uint three;
    
    //拉霸種類 和對應數字
    //enum  Kind {Cherry, BAR1, BAR2, BAR3, Seven1, Seven3, Money, Crystal, WILD}
    //            9       8     7     6     5       4       3      2        1
    
    //三條拉霸 對應GUI
    uint[12] Kind1;
    uint[12] Kind2;
    uint[12] Kind3;

    //亂數種子
    uint private number = 777;

    //回傳事件
	event EndGameEvent(address from, uint256 bonus, uint256 timestamp);
    
    //建構子
    function SlotMachineContract() payable {
        ownerAddress = msg.sender;
        Kind1[0] = 1;
        Kind1[1] = 5;
        Kind1[2] = 6;
        Kind1[3] = 2;
        Kind1[4] = 9;
        Kind1[5] = 3;
        Kind1[6] = 8;
        Kind1[7] = 4;
        Kind1[8] = 9;
        Kind1[9] = 7;
        Kind1[10] = 1;
        Kind1[11] = 5;
        
        Kind2[0] = 8;
        Kind2[1] = 6;
        Kind2[2] = 2;
        Kind2[3] = 9;
        Kind2[4] = 5;
        Kind2[5] = 1;
        Kind2[6] = 3;
        Kind2[7] = 9;
        Kind2[8] = 7;
        Kind2[9] = 4;
        Kind2[10] = 8;
        Kind2[11] = 6;
        
        Kind3[0] = 1;
        Kind3[1] = 6;
        Kind3[2] = 2;
        Kind3[3] = 9;
        Kind3[4] = 7;
        Kind3[5] = 4;
        Kind3[6] = 8;
        Kind3[7] = 5;
        Kind3[8] = 9;
        Kind3[9] = 3;
        Kind3[10] = 1;
        Kind3[11] = 6;
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
	function getBonus() constant returns (uint) {
        return bonusMaping[msg.sender];
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
        if(msg.value >= 10000000000000000000) {
            bonus += countBonus(Kind1[one], Kind2[two], Kind3[three]);
        }
        //賭兩條線 上橫條
        if(msg.value >= 20000000000000000000) {
            bonus += countBonus(Kind1[one-1], Kind2[two-1], Kind3[three-1]);
        }
        //賭三條線 下橫條
        if(msg.value >= 30000000000000000000) {
            bonus += countBonus(Kind1[one+1], Kind2[two+1], Kind3[three+1]);
        }
        //賭四條線 右上左下斜線
        if(msg.value >= 40000000000000000000) {
            bonus += countBonus(Kind1[one+1], Kind2[two], Kind3[three-1]);
        }
        //賭五條線 左上右下斜線
        if(msg.value >= 50000000000000000000) {
            bonus += countBonus(Kind1[one-1], Kind2[two], Kind3[three+1]);
        }
        
        bonusMaping[msg.sender] = bonus;
        
        
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
            return 777;
            
        //不應該執行到這邊
        throw;
    }
    
    //產生隨機三個拉霸圖的位置
    function randomKind () {
        one = getRandom(10);
        two = getRandom(10);
        three = getRandom(10);
	}
	
	//取得1到range範圍的亂數
    function getRandom(uint range) returns (uint) {
        uint random = (uint(sha256(number))%777)+(uint(block.blockhash(block.number-1))%777);
        number += random;
        random = random % range;
		return random + 1;
    }
	
	//版本號
    function version() constant returns (string){ 
        return "1.0.5";
    }
	
	//摧毀合約 取回賭場金錢
	function destroy() {
         if (msg.sender == ownerAddress) { 
             suicide(ownerAddress);
        }
    }
}