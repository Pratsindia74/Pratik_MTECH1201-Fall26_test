/*
Name: Pratik Bagchi
Title: The Gallop of Time — A Muybridge Motion Experiment
Assignment: Short Study #5 — Responsive Patterns
Instructions: Interact with the moving horses to explore
different speeds and the magic of early motion pictures.
*/
let horse;
let horseX = 0;
let horse2X = 0;
let filmX = 0; // Top filmstrip
let film2X = 0; // Middle filmstrip
let film3X = 0;  // Bottom filmstrip
let vintageMusic;
let projectorSound;
let cameraSound;
let horse3X = 0;
async function setup() {
  horse = await loadImage("assets/Muybridgeracehorseanimated.gif");
  createCanvas(1200, 500);
  vintageMusic = new Audio("assets/oldmusic.m4a");
  vintageMusic.loop = true;
  vintageMusic.volume = 0.1;
  projectorSound = new Audio("assets/oldprojectorstaticsound.m4a");
  projectorSound.loop = true;
  projectorSound.volume = 0.20;

  cameraSound = new Audio("assets/vintagemoviecamsound.m4a");
  cameraSound.loop = true;
  cameraSound.volume = 0.15;
}

function draw() {
  background(194, 159, 112);
  stroke(100);
  line(0, 165, width, 165);
  line(0, 330, width, 330);
  fill(255);
  noStroke();

// TOP filmstrip — fast, moving left
for (let x = 10; x < width; x = x + 35) {
  rect((x - filmX + width) % width, 8, 20, 12);
  rect((x - filmX + width) % width, 145, 20, 12);
}

// MIDDLE filmstrip — medium, moving left
for (let x = 10; x < width; x = x + 35) {
  rect((x - film2X + width) % width, 173, 20, 12);
  rect((x - film2X + width) % width, 310, 20, 12);
}
// BOTTOM filmstrip — slow, moving right
for (let x = 10; x < width; x = x + 35) {
  rect((x + film3X) % width, 338, 20, 12);
  rect((x + film3X) % width, 480, 20, 12);
}

for (let x = 10; x < width; x = x + 35) {
  rect((x - film2X + width) % width, 145, 20, 12);
  rect((x - film2X + width) % width, 173, 20, 12);
  rect((x - film3X + width) % width, 310, 20, 12);
  rect((x - film3X + width) % width, 338, 20, 12);
  rect((x - film3X + width) % width, 480, 20, 12);
}
  filmX = (filmX + 4) % width;
  film2X = (film2X + 3) % width;
  film3X = (film3X + 1) % width;
  blendMode(MULTIPLY);
  image(horse, horseX, 35, 240, 110);
  image(horse, horse2X, 200, 240, 110);
  image(horse, horse3X, 365, 240, 110);
  blendMode(BLEND);
  horseX = horseX + 4;

if (horseX >= 1200) {
    horseX = -240;
  }
  horse2X = horse2X + 2;

if (horse2X >= 1200) {
    horse2X = -240;
  }
  horse3X = horse3X + 1;

if (horse3X >= 1200) {
    horse3X = -240;
  }
}
function mousePressed() {
  if (vintageMusic.paused) {
    vintageMusic.play();
    projectorSound.play();
    cameraSound.play();
  }
}
