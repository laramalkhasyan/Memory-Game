let cardarr = ["pear.png","orange.jpg", "banana.jpg", "greenpear.jpg", "watermelon.jpg"];

const backimg = "firstpic.jpg";
let level = 1;
let isclicked = 0;
let firstClick, secondClick;
let isClickable = true;
let score = 0;
let time = 0;
let timerInterval;
let isCompleted = false;


function shuffle(array){
	// let array = [];
	// for(let i=0; i<oldarray.length;i++){
	// 	array[i]=oldarray[i];
	// }

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;		
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


function addpics(level){
	let w = window.innerWidth;
	
	let width = document.querySelector(".card").offsetWidth;
	document.querySelector(".card").style.width = ((level+2))*150+((level+2))*30 +"px";
	console.log(width);
	let node = document.getElementsByClassName("card");
	for(let i = 0; i<(level+2)*(level +1 );i++){
		let pic= document.createElement("img");	
		let index;
		if(i >= (level+2)*(level +1 )/2) {
		 index =i-((level+2)*(level +1 )/2);	
		} else {
			index=i
		}
		 
		pic.setAttribute("data-num",index);
		pic.setAttribute("data-opened", 0);	
		pic.src = backimg;
		node[0].appendChild(pic);

	}
			

}

function findaMatch(f,s){
	if(f == s){
		isClickable = true;
		score += 1;
		document.getElementById("score").innerHTML = "SCORE:" + score;
		let im = document.getElementsByTagName("img");
		im[f].setAttribute("data-opened",1);
		let count = 0;
		
		for (let i = 0 ; i<im.length/2; i++){
			if (im[i].getAttribute("data-opened") == 0){
				count++;
			}
		}
		if(count == 0){
			isClickable = false;
			isCompleted = true;
			nextlevel();
		}
		return true;
	}
	return false;

}

function clickcard(event){
	if(!isClickable) return;

	if (isclicked == 0){
		firstClick = event.currentTarget;
		isclicked++;
		firstClick.src = cardarr[firstClick.dataset.num];
		return 
	}
	else if(isclicked == 1){
		isClickable = false;

		secondClick = event.currentTarget;
		isclicked++;
		secondClick.src = cardarr[secondClick.dataset.num];
		isclicked = 0;
		if(!(findaMatch(firstClick.dataset.num,secondClick.dataset.num))) {
			setTimeout(() =>{
				firstClick.src=backimg;
				secondClick.src = backimg;
				isClickable = true;	 
			},1000);
		}
		return
	}
} 


function timer() {
  let minute = 2;
  let sec = 59;
  timerInterval = setInterval(function() {
    document.getElementById("timer").innerHTML ="TIME: " + minute + ":" + sec;
    sec--;
    if (sec < 0) {
      minute--;
      sec = 59;
      if (minute < 0) {
        stop(timerInterval)
      }
    }
  }, 1000);
  
}


function stop(timer) {
  clearInterval(timer);
}



function nextlevel(event){

	stop(timerInterval);// let node = document.getElementsByClassName("card");
	let doc = document.getElementsByTagName("img");
	for(let j = doc.length -1; j >= 0; j--){
		doc[j].remove();
	}
	level++;
	isClickable = true;
	start();	

}


function start(){
	addpics(level);
	shuffle(cardarr);
	timer();
	let doc = document.getElementsByTagName("img");
	for(let i = 0; i<doc.length; i++) {
		doc[i].addEventListener("click",clickcard);
	}
	// let nex = document.getElementsByTagName("button")
	// nex[0].addEventListener("click",nextlevel);
	// if(isCompleted){
	// 	let nex = document.getElementsByTagName("button")
	// 	nex[0].removeEventListener("click",nextlevel);
	// }
	
}

start();