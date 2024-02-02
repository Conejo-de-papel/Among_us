const WHITE  = "#FFFFFF";
const BLACK  = "#000000";
const BLUE   = "#0000FF";
const enemyW  = 60;
const enemies = [];
const cursorScale = 1.8; // Scale factor for the cursor size
let corpsW;
let spaceImage;
let ufoCursor;

function preload() {
  // Загрузка изображения космоса
  spaceImage = loadImage('space.jpeg');
	ufoCursor = loadImage('nlo.png');
}
function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); 
	textSize(14);
	frameRate(24);
	noSmooth();

	noFill();
	stroke(WHITE); strokeWeight(1); strokeCap(PROJECT);

	// Enemies
	const pX = enemyW * 4.2;
	const pY = enemyW * 2.2;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	corpsW = cols*pX;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(r%2==0) x += pX/2;
			const vX = (r%2==0) ? 8.3:2;
			const enemy = new MyEnemy(x, y, vX, enemyW);
			enemies.push(enemy);
		}
	}
	cursor('none');
}

function draw(){
	background(spaceImage);

	for(let enemy of enemies){
		enemy.draw();
		if(enemy.isHit(mouseX, mouseY)) enemy.dead();
	}
  // Set the UFO cursor size
  const cursorSize = enemyW * cursorScale;
  const cursorX = mouseX - cursorSize / 2;
  const cursorY = mouseY - cursorSize / 2;

  // Draw the UFO cursor at the mouse position
  image(ufoCursor, cursorX, cursorY, cursorSize, cursorSize);
	
	
}

function getColor(){
  const COLORS = ["#f57a33", "#FFFF00", "#8AC926", "#0000FF", "#3f0a6b","#59ffe6","#A9A9A9","#FFFFFF"];
  const randomColor = COLORS[floor(random() * COLORS.length)];
  return randomColor;
  
}

class MyEnemy{

	constructor(x, y, vX, dia) {
		this._x = x;
		this._y = y;
		this._vX = vX;
		this._dia = dia;
		this._col = getColor();

		this._ijike = (random() < 0.33);
		this._dead = false;
	}

	isHit(x, y) {
		const dX = x - this._x;
		const dY = y - this._y;
		if (x < this._x - this._dia) return false;
		if (y < this._y - this._dia) return false;
		if (this._x + this._dia < x) return false;
		if (this._y + this._dia < y) return false;
		this.dead(); // Dead
		return false;
	}

	dead() {
		if (!this._ijike) return;
		if (this._dead) return;
		this._dead = true;
	}

	draw() {
		this._x += this._vX;
  if (corpsW - enemyW / 2 < this._x) {
    this._x -= corpsW;
    this._dead = false; // Alive
  }

  if (this._dead) return;

  push();
  translate(this._x, this._y);

  const rad = this._dia / 8; // Размер врага уменьшен в 4 раза

  fill(this._col);
  stroke(this._col);
  strokeWeight(2);

  if (this._ijike == false) {

strokeWeight(1);
			fill(this._col);
			rect(20, 30, 12.5, 30, 20);
			strokeWeight(0);
			fill(97, 114, 95);
			rect(21, 35, 12.5, 25, 5);
			strokeWeight(1);
			noFill();
			rect(20, 30, 12.5, 30, 20);

			strokeWeight(1);
			fill(this._col);
			rect(27.5, 12.5, 37.5, 55, 32.5, 37.5, 2.5, 2.5);

			fill(this._col);
			rect(27.5, 62.5, 12.5, 20, 2.5, 2.5, 37.5, 37.5);
			fill(this._col);
			rect(57.5, 62.5, 12.5, 20, 2.5, 2.5, 37.5, 37.5);

			strokeWeight(0);
			fill(this._col);
			rect(31.25, 12.5, 33.75, 50, 25);

			strokeWeight(1);
			noFill();
			rect(27.5, 12.5, 37.5, 55, 32.5, 37.5, 2.5, 2.5);

			strokeWeight(0);
			fill(160, 210, 220);
			rect(40, 27.5, 32.5, 15, 20);

			fill(224, 240, 240);
			rect(47, 27.5, 25, 10, 20);
			fill(255, 255, 255);
			rect(55, 27.5, 15, 5, 20);

			strokeWeight(1);
			noFill();
			rect(40, 27.5, 32.5, 15, 20);

			strokeWeight(0);
			fill(this._col);
			rect(28.75, 57.5, 10.975, 13.75);
			rect(42.75, 59.375, 10.975, 13.75);
			rect(30, 59.375, 25, 5);

		} else {
			noStroke();
			// Among Us style enemy
			strokeWeight(1);
			fill(255, 0, 0);
			rect(20, 30, 12.5, 30, 20);
			strokeWeight(0);
			fill(97, 114, 95);
			rect(21, 35, 12.5, 25, 5);
			strokeWeight(1);
			noFill();
			rect(20, 30, 12.5, 30, 20);

			strokeWeight(1);
			fill(255, 0, 0);
			rect(27.5, 12.5, 37.5, 55, 32.5, 37.5, 2.5, 2.5);

			fill(255, 0, 0);
			rect(27.5, 62.5, 12.5, 20, 2.5, 2.5, 37.5, 37.5);
			fill(255, 0, 0);
			rect(57.5, 62.5, 12.5, 20, 2.5, 2.5, 37.5, 37.5);

			strokeWeight(0);
			fill(255, 0, 0);
			rect(31.25, 12.5, 33.75, 50, 25);

			strokeWeight(1);
			noFill();
			rect(27.5, 12.5, 37.5, 55, 32.5, 37.5, 2.5, 2.5);

			strokeWeight(0);
			fill(160, 210, 220);
			rect(40, 27.5, 32.5, 15, 20);

			fill(224, 240, 240);
			rect(47, 27.5, 25, 10, 20);
			fill(255, 255, 255);
			rect(55, 27.5, 15, 5, 20);

			strokeWeight(1);
			noFill();
			rect(40, 27.5, 32.5, 15, 20);

			strokeWeight(0);
			fill(255, 0, 0);
			rect(28.75, 57.5, 10.975, 13.75);
			rect(42.75, 59.375, 10.975, 13.75);
			rect(30, 59.375, 25, 5);
		}

		pop();
	}
}
