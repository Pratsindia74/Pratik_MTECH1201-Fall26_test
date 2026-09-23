// Pratik B.
// Title: Interactive Pac-Man
// Concept: I am exploring an interactive character that responds to the user's movement.
// Instructions: Move the mouse to move Pac-Man and click the mouse to make Pac-Man bigger.


let pacSize = 100;
let eyeSize = 10;
let moveAmount = 0;

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(0);
    fill("yellow");
    arc(mouseX, mouseY, pacSize, pacSize, 0.5, 5.8);
    moveAmount = moveAmount + 1;

    fill("black");
    circle(mouseX + 10, mouseY - 20, eyeSize);
}

function mousePressed() {
    pacSize = pacSize + 10;
}