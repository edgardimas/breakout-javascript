import { drawBricks, collisionDetection } from "./brick.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const brickRowCount = 3;
const brickColumnCount = 5;
let score = 0;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width - 25;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
/**
 * in the "addEventListener" method in JavaScript, the first argument represents the type of event
 * for which you want to listen. The event types are specified as strings.
 *
 * for example:
 * "keydown" is a string representing the event that occurs when a key on the keyboard is pressed down
 * "keyup" is a string representing the event that occurs when a key on the keyboard is released after being pressed.
 */

function drawBall() {
  ctx.beginPath(); // Start a new path
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // Create an arc (circle)
  // Parameters for arc();
  // 50, 50 => X and Y coordinates of the arc's center
  // 10 => Radius of the arc
  // 0 => Start angle in radians (here, it;s 0 radians, which is the right-most point of the circle )
  /// Math.PI * 2 => End angle in radians (here, it's a full circle, 2 * π radians)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawBall();
  drawPaddle();
  drawBricks();
  let newDy = collisionDetection(x, y, dx, dy);
  if (newDy) {
    console.log(newDy);
    dy = newDy;
    score++;
    console.log(
      "score ",
      score,
      "brickRowCount: ",
      brickRowCount,
      "brickColumnCount ",
      brickColumnCount
    );
    if (score === brickRowCount * brickColumnCount) {
      alert("You win, congratulations");
      document.location.reload();
      clearInterval(interval);
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }
  x += dx;
  y += dy;

  if (rightPressed) paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  else if (leftPressed) paddleX = Math.max(paddleX - 7, 0);
}

setInterval(draw, 10);
