// Pratik B.
// Title: 13 Seconds to Die – A Kayako Horror Puzzle
// Concept: A horror puzzle game where the player must rearrange nine pieces to complete Kayako's face before the 13-second timer ends.
/// Instructions: Click and drag the puzzle pieces to complete Kayako's face within 13 seconds. Refresh the browser to play again.
let ghostPhoto;
let gameOverPhoto;
let instructionsPhoto;
let entrancePhoto;
let horrorMusic;
let level2Music;
let level2VictorySound;
let laughterMusic;
let level2LaughterMusic;
let frontMusic;
let gameState = "enter";
let currentLevel = 1;
let tileSize = 200;
let level2Columns = 4;
let level2TileSize = 150;
let level2Rows = 3;
let tiles = [3, 0, 8, 6, 1, 5, 7, 4, 2];
let level2Tiles = [5, 2, 9, 0, 7, 11, 3, 8, 1, 10, 4, 6];
let emptyPosition = 8;
let draggedTile = -1;
let timeLimit = 13;
let level2TimeMultiplier = 2;
let startTime;
let shakeStart = -1;
let hasWon = false;
let level2Photo;
let level2IntroPhoto;
let level2GameOverPhoto;
async function setup() {
createCanvas(600, 660);
noCursor();
ghostPhoto = await loadImage("assets/kayako.png");
level2Photo = await loadImage("assets/kayako2.jpeg");
level2IntroPhoto = await loadImage("assets/hauntedenterlevel2.png");
level2GameOverPhoto = await loadImage("assets/kayakoreturnslevel2gameover.png");
gameOverPhoto = await loadImage("assets/gameover.png");
instructionsPhoto = await loadImage("assets/instructions.png");
entrancePhoto = await loadImage("assets/entrance.png");
horrorMusic = new Audio("assets/horror13.m4a");
level2Music = new Audio("assets/horrorintro2.m4a");
level2Music.loop = true;
level2VictorySound = new Audio("assets/winningsound2.mov");
laughterMusic = new Audio("assets/horror3.mp4");
level2LaughterMusic = new Audio("assets/horrorlaf4loser.m4a");
frontMusic = new Audio("assets/kayakofrontmusic.mp4");
frontMusic.loop = true;
frontMusic.volume = 1;
startTime = -1;
}
function draw() {
background(0);
if (gameState === "enter") {
 image(entrancePhoto, 0, 0, 600, 660);
 textSize(20);
 text("👻", mouseX, mouseY);
 return;
}
if (gameState === "instructions") {
  image(instructionsPhoto, 0, 0, 600, 660);
  textSize(30);
  text("👻", mouseX, mouseY);
  return;
}
if (gameState === "level2Instructions") {
  image(level2IntroPhoto, 0, 0, 600, 660);
  textSize(20);
text("👻", mouseX, mouseY);
  return;
}
let elapsedSeconds = startTime === -1 ? 0 : floor((millis() - startTime) / (1000 * (currentLevel === 2 ? level2TimeMultiplier : 1)));
let timeLeft = min(timeLimit, elapsedSeconds);
// image(ghostPhoto, 0, 0, 200, 200, 0, 0, 200, 200);
stroke(255);
strokeWeight(3);
noFill();
if (currentLevel === 1) {
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
    let isHovered = mouseX >= col * tileSize && mouseX < (col + 1) * tileSize &&
                    mouseY >= row * tileSize && mouseY < (row + 1) * tileSize;
    let hoverSize = isHovered ? 210 : 200;
    image(ghostPhoto, col * tileSize, row * tileSize, hoverSize, hoverSize, sourceX, sourceY, sourceWidth, sourceHeight);
     rect(col * tileSize, row * tileSize, tileSize, tileSize);
   }
 }
}
if (currentLevel === 2) {
for (let row = 0; row < level2Rows; row++) {
for (let col = 0; col < level2Columns; col++) {
     let position = row * level2Columns + col;
     let tileNumber = tiles[position];
     let sourceCol = tileNumber % level2Columns;
     let sourceRow = floor(tileNumber / level2Columns);
     let sourceWidth = level2Photo.width / level2Columns;
     let sourceHeight = level2Photo.height / level2Rows;
     let sourceX = sourceCol * sourceWidth;
     let sourceY = sourceRow * sourceHeight;
     let isHovered = mouseX >= col * level2TileSize && mouseX < (col + 1) * level2TileSize &&
                     mouseY >= row * level2TileSize && mouseY < (row + 1) * level2TileSize;
     let hoverSize = isHovered ? level2TileSize + 10 : level2TileSize;
     image(level2Photo, col * level2TileSize, row * level2TileSize, hoverSize, hoverSize, sourceX, sourceY, sourceWidth, sourceHeight);
    }
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
  if (currentLevel === 2) level2Music.pause();
  if (shakeStart === -1) {
  shakeStart = millis();
  (currentLevel === 2 ? level2LaughterMusic : laughterMusic).play();
  }
  if (millis() - shakeStart >= 3000) {
     (currentLevel === 2 ? level2LaughterMusic : laughterMusic).pause();
 }
 
let shakeX = 0;
if (millis() - shakeStart < 2000) {
  shakeX = random(-10, 10);
}
  image(currentLevel === 2 ? level2GameOverPhoto : gameOverPhoto, shakeX, 0, 600, 600);
}
textSize(currentLevel === 2 ? 20 : (mouseX >= 0 && mouseX < 600 && mouseY >= 0 && mouseY < 600 ? 80 : 20));
text("👻", mouseX, mouseY);
}

function mousePressed() {
  if (currentLevel === 2 && timeLimit === 13 && !hasWon &&
   startTime !== -1 && millis() - startTime >= 26000 &&
   mouseX > 210 && mouseX < 390 && mouseY > 460 && mouseY < 515) {
   tiles = [...level2Tiles];
   startTime = millis();
   shakeStart = -1;
   level2LaughterMusic.pause();
   level2Music.currentTime = 0;
   level2Music.play();
   return;
}
  if (currentLevel === 2 && !hasWon &&
    startTime !== -1 && millis() - startTime >= 26000 &&
    mouseX > 210 && mouseX < 390 && mouseY > 520 && mouseY < 590) {
  gameState = "enter";
  currentLevel = 1;
  hasWon = false;
  startTime = -1;
  shakeStart = -1;
  draggedTile = -1;
  tiles = [3, 0, 8, 6, 1, 5, 7, 4, 2];
  level2LaughterMusic.pause();
  level2Music.pause();
  frontMusic.currentTime = 0;
  frontMusic.play();
  return;
}
if (gameState === "level2Instructions") {
    gameState = "playing";
    currentLevel = 2;
    tiles = [...level2Tiles];
    startTime = millis();
    hasWon = false;
    horrorMusic.pause();
    level2Music.currentTime = 0;
    level2Music.play();
    return;
  }
  if (gameState === "enter") {
  gameState = "instructions";
  frontMusic.play();
  return;
}
  if (gameState === "instructions" && frontMusic.paused) {
  frontMusic.play();
  console.log("Front music play requested");
}
if (gameState === "instructions" && mouseX > 180 && mouseX < 420 && mouseY > 490 && mouseY < 590) {
if (gameState === "instructions") {
  gameState = "playing";
  frontMusic.pause();
  startTime = millis();
  hasWon = false;
  horrorMusic.play();
}
  return;
} 
if (hasWon || millis() - startTime >= timeLimit * 1000 * (currentLevel === 2 ? level2TimeMultiplier : 1)) return;
let activeTileSize = currentLevel === 2 ? level2TileSize : tileSize;
let clickedCol = floor(mouseX / activeTileSize);
let clickedRow = floor(mouseY / activeTileSize);
  if (startTime === -1) {
  startTime = millis();
}
  if (currentLevel === 1 && horrorMusic.paused) {
  horrorMusic.play();
}
  let clickedPosition = clickedRow * (currentLevel === 2 ? level2Columns : 3) + clickedCol;
  draggedTile = clickedPosition;
  console.log("Selected tile:", draggedTile);
}

function mouseReleased() {
  console.log("Mouse released at:", mouseX, mouseY);
  console.log("Dragged tile before check:", draggedTile);
  if (draggedTile === -1) return;
  
  if (hasWon || startTime === -1 || millis() - startTime >= timeLimit * 1000 * (currentLevel === 2 ? level2TimeMultiplier : 1)) return;
  let activeTileSize = currentLevel === 2 ? level2TileSize : tileSize;
  let dropCol = floor(mouseX / activeTileSize);
  let dropRow = floor(mouseY / activeTileSize);
  let dropPosition = dropRow * (currentLevel === 2 ? level2Columns : 3) + dropCol;
  if (dropCol < 0 || dropCol >= (currentLevel === 2 ? level2Columns : 3) || dropRow < 0 || dropRow > 2) return;
  let destinationTile = tiles[dropPosition];
  tiles[dropPosition] = tiles[draggedTile];
  tiles[draggedTile] = destinationTile;
  console.log("Swapped:", draggedTile, "with", dropPosition);
  draggedTile = -1;
  let puzzleSolved = tiles.every((tile, position) => tile === position);
  if (puzzleSolved) {
  hasWon = true;
  if (currentLevel === 2) level2Music.pause();
  if (currentLevel === 2) level2VictorySound.play();
  if (currentLevel === 1) gameState = "level2Instructions";
  if (currentLevel === 1) level2Music.play();
}
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
tiles = [3, 0, 8, 6, 1, 5, 7, 4, 2];
hasWon = false;
startTime = -1;
shakeStart = -1;
horrorMusic.pause();
horrorMusic.currentTime = 0;
  }
}