let ghostPhoto;
let tileSize = 200;
let tiles = [3, 0, 2, 6, 1, 5, 7, 4, 8];
let emptyPosition = 8;
async function setup() {
createCanvas(600, 600);
ghostPhoto = await loadImage("assets/kayako.png");
}
function draw() {
background(0);
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
    let sourceX = sourceCol * tileSize;
    let sourceY = sourceRow * tileSize;
    image(ghostPhoto, col * tileSize, row * tileSize, tileSize, tileSize, sourceX, sourceY, tileSize, tileSize);
     rect(col * tileSize, row * tileSize, tileSize, tileSize);
  }
}
fill(0);
nrect((emptyPosition % 3) * tileSize, floor(emptyPosition / 3) * tileSize, tileSize, tileSize);
}

function mousePressed() {
let clickedCol = floor(mouseX / tileSize);
  let clickedRow = floor(mouseY / tileSize);
  let clickedPosition = clickedRow * 3 + clickedCol;
  console.log(clickedPosition);
  let emptyRow = floor(emptyPosition / 3);
  let emptyCol = emptyPosition % 3;
  let distance = abs(clickedRow - emptyRow) + abs(clickedCol - emptyCol);
if (distance === 1) {
  console.log("Neighbor tile clicked!");
  let oldEmpty = emptyPosition;
  tiles[oldEmpty] = tiles[clickedPosition];
  tiles[clickedPosition] = 8;
  emptyPosition = clickedPosition;
}
}

