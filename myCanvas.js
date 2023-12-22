const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width - 25;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) dy = -dy;

  x += dx;
  y += dy;

  console.log("x >>>>>>>> ", x);
}

setInterval(draw, 10);
