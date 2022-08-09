window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;
let box_fac = 0.25;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;
let cur_dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function up_click(){
	if(dir!="down") dir = "up";
}

function left_click(){
	if(dir!="right") dir = "left";
}

function right_click(){
	if(dir!="left") dir = "right";
}

function down_click(){
	if(dir!="up") dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "red";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}
// Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной строны
if (snake.x < box*box_fac) {
	snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width-box*box_fac) {
	snake.x = 0;
  }
  // Делаем то же самое для движения по вертикали
  if (snake.y < box*box_fac) {
	snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height-box*box_fac) {
	snake.y = 0;
  }
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop();

	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
		clearInterval(game);

	if(snakeX%box==0 && snakeY%box==0) cur_dir = dir;

	if(cur_dir == "left") snakeX -= box_fac*box;
	if(cur_dir == "right") snakeX += box_fac*box;
	if(cur_dir == "up") snakeY -= box_fac*box;
	if(cur_dir == "down") snakeY += box_fac*box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 50);
