var banker, player;
var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var img1 = document.getElementById("pic1");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var restart = document.getElementById("restart");

function owner(number,color){
	this.number = number;
	this.color = color;
}
function init(){
	win.style.display = "none";
	lose.style.display = "none";
	restart.style.visibility = "hidden";
	img1.style.display = "block";
	button1.style.visibility = "visible";
	button2.style.visibility = "visible";
	card1.src = "pic/reverse.png";
	card2.src = "pic/reverse.png";
}

function big(){
	img1.style.display = "none";
	button1.style.visibility = "hidden";
	button2.style.visibility = "hidden";
	
	showcard();
	
	if(banker.number < player.number){
		win.style.display = "block";
	}
	else if(banker.number > player.number){
		lose.style.display = "block";
	}
	else if(banker.number == player.number){
		if(banker.color > player.color)
			lose.style.display = "block";
		else if(banker.color < player.color)
			win.style.display = "block";
	}
	restart.style.visibility = "visible";
}

function small(){
	img1.style.display = "none";
	button1.style.visibility = "hidden";
	button2.style.visibility = "hidden";
	
	showcard();
	
	if(banker.number < player.number){
		lose.style.display = "block";
	}
	else if(banker.number > player.number){
		win.style.display = "block";
	}
	else if(banker.number == player.number){
		if(banker.color > player.color)
			win.style.display = "block";
		else if(banker.color < player.color)
			lose.style.display = "block";
	}
	restart.style.visibility = "visible";
}

function showcard(){
	var rand1,rand2;
	rand1 = Math.floor(Math.random() * 52);
	banker = new owner(rand1 % 13 + 1, Math.floor(rand1 / 13));
	rand2 = Math.floor(Math.random() * 52);
	player = new owner(rand2 % 13 + 1, Math.floor(rand2 / 13));
	card1.src = "pic/card" + rand1 + ".png";
	card2.src = "pic/card" + rand2 + ".png";
	if(rand1 == rand2){
		showcard();
	}
}
var start = function(){
	init();
}();
