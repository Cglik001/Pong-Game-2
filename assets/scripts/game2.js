const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

const hardBtn = document.getElementById("hardBtn")
const normalBtn = document.getElementById("normalBtn")

let maxPoints = 10; //array of [3,5,10] for each i create drowpdown element
let scoreOne = 0;
let scoreTwo = 0;


//key movement
window.addEventListener("keypress", doKeyDown, false);

function doKeyDown(e){
  const key = e.key;
  if(key == "w" && playerOne.y - playerOne.gravity > 0){
    playerOne.y -= playerOne.gravity * 4;
  }
  else if ( key == "s" && playerOne.y + playerOne.height + playerOne.gravity < canvas.height){
    playerOne.y += playerOne.gravity * 4;
  }

  if(key == "i" && playerTwo.y - playerTwo.gravity > 0){
  playerTwo.y -= playerTwo.gravity * 4;
  }

  else if ( key == "k" && playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height){
  playerTwo.y += playerTwo.gravity * 4;
  }


}

class Element {
  constructor(options){
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.color = options.color
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}
// draw net
const net = new Element ({
  x: canvas.width/2 - 50,
  y: 0,
  width: 4,
  height: canvas.height,
  color: "#ffff"
})

//first paddle
const playerOne = new Element({
  x:10,
  y: 155,
  width: 15,
  height: 90,
  color: "#fff",
  gravity: 2,
})

//second paddle

const playerTwo = new Element({
  x:625,
  y:155,
  width: 15,
  height: 90,
  color: "#fff",
  gravity: 2,
})

//cpu
const cpu = new Element( {
  x:625,
  y:155,
  width: 15,
  height: 90,
  color: "#fff",
  gravity: 2,
})

//ball

const ball = new Element({
  x:650/2,
  y:400/2,
  width: 15,
  height: 15,
  color: "#20C20E",
  speed: 2,
  gravity: 2
})


function drawRect(x,y,width,height, color) {
  context.fillStyle = color;
  context.fillRect(x,y,width,height);
  context.fill();
}

function drawNet() {
  context.strokeStyle = "#fff";
  context.lineWidth = 5;
  context.setLineDash([20,10]);
  context.beginPath();
  context.moveTo(canvas.width/2, 0);
  context.lineTo(canvas.width/2, canvas.height);
  context.stroke();
}

function render(){
  context.clearRect(0,0, canvas.width, canvas.height)
  drawElement(playerOne);
  drawElement(playerTwo);
  drawNet(net);
  displayScoreOne();
  displayScoreTwo();
  drawElement(ball);
  gameWinner()
}

/*function start(){
  init();
  loop = setInterval(update, fps)
}*/

/*function init(){
  ball.init()
  player1.init()
  player2.init()
}*/

function update(){
  ballBounce();
  paddleCollision();
  window.requestAnimationFrame(update)
}
update();



//player one score text

function displayScoreOne(){
  context.font = "48px Arial Bold "
  context.fillStyle = "#fff"
  context.fillText(scoreOne, canvas.width/2 - 60, 50)
}

//player two score text
function displayScoreTwo(){
  context.font = "48px Arial Bold "
  context.fillStyle = "#fff"
  context.fillText(scoreTwo, canvas.width/2 + 30, 50)
}


//draw elements
function drawElement(element){
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height)
}


////drawElement(playerOne);

//make ball bounce
function ballBounce(){
  if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity + ball.height >= canvas.height ){
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  paddleCollision();
  ballwallPoints();
}

//detect paddle collision

function paddleCollision(){
  //fazer a bolinha voltar quando bater no paddle
 if (
     (
      (
        ball.y + (ball.width + ball.height) > playerOne.y
        && ball.y - (ball.width + ball.height) <= playerOne.y + playerOne.height
        )
      && (ball.x  === playerOne.x + playerOne.width && ball.speed < 0)) ||
      (ball.y + ball.width + ball.height > playerTwo.y
        && ball.y + ball.height <= playerTwo.y + playerTwo.height + playerTwo.width
        )
      && (ball.x + ball.height >= playerTwo.x && ball.speed > 0)) {
      console.log("hit")
     ball.speed = ball.speed * -1;
  }

  //fazer o player 1 pontuar quando bater fora do paddle do player 2
  //fazer o player 2 pontuar quando bater fora do paddle do player 1
  render();
}

function resetBallPosition() {
      ball.speed = ball.speed * -1;
     // ball.x = 100 + ball.speed;
     // ball.y += ball.gravity
      ball.x = (650/2) + ball.speed
      ball.y = (400/2) + ball.gravity

}


function ballwallPoints() {
  paddleCollision()
  if (ball.x < (playerOne.x - 10)){
      console.log("linha 128", ball, playerOne)
      scoreTwo += 1;
      resetBallPosition()
    }
  else if (ball.x > (playerTwo.x + (ball.width - 5))){
      scoreOne += 1;
      resetBallPosition()
    }



   render();
}


//draw elements



function hardGame(){
  paddleCollision();
  ballBounce();
  ballwallPoints();
  ball.speed = 6 * -1;
  playerOne.gravity = 6;
  playerTwo.gravity = 6;
}

function normalGame() {
  ballBounce();
  render();
  paddleCollision();
  ballwallPoints();
  ball.speed = 2;
  playerOne.gravity = 2;
  playerTwo.gravity = 2;

}

function resetGame() {
  let scoreOne = 0;
  let scoreTwo = 0;
  playerOne.y = 155;
  playerTwo.y = 155;
  resetBallPosition();
}


function enableButtons() {
  hardBtn.removeAttribute('disabled')
  normalBtn.removeAttribute('disabled')
}

function disableButtons() {
    hardBtn.setAttribute('disabled', true)
    normalBtn.setAttribute('disabled', true)
}



function gameWinner() {
  if(scoreOne === maxPoints) {
      alert('player One Wins!')
  }
  else if (scoreTwo === maxPoints ) {
       alert('Player Two Wins!')
    }
  //gameOver()
}

/*function startGame(){
  let startDiv = document.getElementById("start")
  let gameCanvas = document.getElementById("pongGame")
  let gameOver = document.getElementById("game-over");
  let buttons = document.getElementyBy("buttons-position")
  startDiv.style.display = "none";
  gameCanvas.style.display = "block";
  gameOver.style.display = "none";
  start();
}

function gameOver() {
  let startDiv = document.getElementById("start")
  let gameCanvas = document.getElementById("pongGame")
  let gameOver = document.getElementById("game-over");
  let buttons = document.getElementyBy("buttons-position")
  startDiv.style.display = "none";
  gameCanvas.style.display = "none";
  gameOver.style.display = "block";
  resetGame() ;
  clearInterval(loop)

}
*/







 hardBtn.addEventListener('click', hardGame)
 normalBtn.addEventListener('click', normalGame)
