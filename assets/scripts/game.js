let maxScore = 5;
let scoreOne = 0;
let scoreTwo = 0;

const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;


class Element {
  constructor(options){
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.offset = options.offset
    this.color = options.color
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

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

const ball = new Element({
  x:650/2,
  y:400/2,
  width: 15,
  height: 15,
  color: "#20C20E",
  speed: 2,
  gravity: 2
})



function render() {
  context.clearRect(0,0, canvas.width, canvas.height)
  drawElement(playerOne.x, playerOne.y, playerOne.width, playerOne.height, playerOne.color);
  drawElement(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height, playerTwo.color);
  drawNet();
  drawElement(ball.x, ball.y, ball.width, ball.height, ball.color);
  displayScoreOne();
  displayScoreTwo();

}

function drawElement(element){
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height)
}

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
