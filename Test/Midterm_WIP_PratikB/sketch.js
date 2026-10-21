// Pratik B.
// Title: 13 Seconds to Die – A Kayako Horror Puzzle
// Concept: A horror puzzle game where the player must rearrange nine pieces to complete Kayako's face before the 13-second timer ends.
/// Instructions: Click and drag the puzzle pieces to complete Kayako's face within 13 seconds. Refresh the browser to play again.
let ghostPhoto;
let gameOverPhoto;
let horrorMusic;
let laughterMusic;
let tileSize = 200;
let tiles = [3, 0, 8, 6, 1, 5, 7, 4, 2];
let emptyPosition = 8;
let draggedTile = -1;
let timeLimit = 13;
let startTime;
let shakeStart = -1;
let hasWon = false;
async function setup() {
createCanvas(600, 660);
ghostPhoto = await loadImage("assets/kayako.png");
gameOverPhoto = await loadImage("assets/gameover.png");
horrorMusic = new Audio("assets/horror13.m4a");
laughterMusic = new Audio("assets/horror3.mp4");
startTime = -1;
}
function draw() {
background(0);
let elapsedSeconds = startTime === -1 ? 0 : floor((millis() - startTime) / 1000);
let timeLeft = min(timeLimit, elapsedSeconds);
// image(ghostPhoto, 0, 0, 200, 200, 0, 0, 200, 200);
stroke(255);
strokeWeight(3);
noFill();

for (let row = 0; row < 3; row++) {
for (let col = 0; col < 3; col++) {
    let position = row * 3 + col;
    let tileNumber = tiles[position];
    let sourceCol = tileNumber % 3;
    let sourceRow = floor(tileNumber / 3);
    let sourceWidth = ghostPhoto.width / 3;
    let sourceHeight = ghostPhoto.height / 3;
    let sourceX = sourceCol * sourceWidth;
    let sourceY = sourceRow * sourceHeight;
    image(ghostPhoto, col * tileSize, row * tileSize, tileSize, tileSize, sourceX, sourceY, sourceWidth, sourceHeight);
     rect(col * tileSize, row * tileSize, tileSize, tileSize);
  }
}
if (timeLeft >= 10) {
  fill(255, 0, 0);
} else {
  fill(0, 100, 255);

}

textSize(32);
text(timeLeft, 280, 640);
fill(255, 0, 0);
textSize(20);
text("13 SECONDS TO DIE", 20, 635);
if (hasWon) {
  fill(0, 255, 0);
  textSize(24);
  fill(255, 0, 0);
textSize(20);

  text("CONGRATULATIONS!", 140, 300);
  text("THIS TIME YOU ESCAPED DEATH", 110, 340);
}
if (timeLeft === 13 && !hasWon) {
  if (shakeStart === -1) {
  shakeStart = millis();
  laughterMusic.play();
  }
  if (millis() - shakeStart >= 3000) {
     laughterMusic.pause();
 }
 
let shakeX = 0;
if (millis() - shakeStart < 2000) {
  shakeX = random(-10, 10);
}
image(gameOverPhoto, shakeX, 0, 600, 600);

}
}
function mousePressed() {
  if (hasWon || millis() - startTime >= 13000) return;
  let clickedCol = floor(mouseX / tileSize);
  if (startTime === -1) {
  startTime = millis();
}
  if (horrorMusic.paused) {
  horrorMusic.play();
}
  let clickedRow = floor(mouseY / tileSize);
  let clickedPosition = clickedRow * 3 + clickedCol;
  draggedTile = clickedPosition;
}

function mouseReleased() {
  if (hasWon || startTime === -1 || millis() - startTime >= 13000) return;
  let dropCol = floor(mouseX / tileSize);
  let dropRow = floor(mouseY / tileSize);
  let dropPosition = dropRow * 3 + dropCol;
  if (dropCol < 0 || dropCol > 2 || dropRow < 0 || dropRow > 2) return;
  let destinationTile = tiles[dropPosition];
  tiles[dropPosition] = tiles[draggedTile];
  tiles[draggedTile] = destinationTile;
  let puzzleSolved = tiles.every((tile, position) => tile === position);
  if (puzzleSolved) {
  hasWon = true;
}
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
tiles = [3, 0, 8, 6, 1, 5, 7, 4, 2];
  }
hasWon = false;
startTime = -1;
shakeStart = -1;
horrorMusic.pause();
horrorMusic.currentTime = 0;
}