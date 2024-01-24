//Game Sound
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../sound/food.mp3");
const gameOverSound = new Audio("../sound/gameOver.mp3");
const moveSound = new Audio("../sound/move.mp3");
const hiscoreDiv = document.getElementById("hiscore");
let board = document.getElementById("board");
let scorediv = document.getElementById("score")
let speed = 5; //for fps
let score = 0;
let lastPrintTime = 0; //for fps
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 5, y: 4 };

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //control fps of game
  if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPrintTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
    //if snake bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
        {
            return true
        }        
    }
    //if you bump into the wall
    if(snakeArr[0].x >= 18 ||  snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0 ){
        return true
    }
    return false;
}

function gameEngine() {
  // Part 1 : Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scorediv.innerHTML = "Score : " + score;
  }

  // Updating the score & Regeneration of food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    //sound play
    foodSound.play();
    //update score & reRender score 
    score += 1
    scorediv.innerHTML = "Score : "+ score
    //check & update highest score
    let hiscore = localStorage.getItem("hiscore");
    hiscore = JSON.parse(hiscore)
    console.log(hiscore,"hiscore")
    if(score > hiscore){
        localStorage.setItem("hiscore",JSON.stringify(score))
        hiscoreDiv.innerHTML = "Highest Score : " + score;
    }
    //adding one more element to the first position of the snake
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    const a = 2;
    const b = 16;
    //regeration of food upadating the foor object
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
    console.log({ ...snakeArr[i] });
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2 : Render the snake and food 

  //2.1 display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    var snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.setAttribute("id", "head");
    }
    snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  //2.2 display food
  var foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}


//render the highest score from local storage
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    let hiscoreVal = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreVal))
}else
{
    hiscoreDiv.innerHTML = "Highest Score : " + hiscore;
}

//Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow up");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("Arrow down");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("Arrow left");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("Arrow right");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
