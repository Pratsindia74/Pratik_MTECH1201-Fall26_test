// Pratik B.
// Title: Interactive Pac-Man 2.0
// Concept: I am exploring uncertainty by making Pac-Man change color and size through user interaction.
// Instructions: Move the mouse to move Pac-Man and click the mouse to make Pac-Man bigger.


let pacSize = 100;
let eyeSize = 10;

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(0);
    if (mouseX < 300) {
    fill("yellow");
} else if (mouseX < 600) {
    fill("red");
} else {
    fill("blue");
}
    arc(mouseX, mouseY, pacSize, pacSize, 0.5, 5.8);

    fill("black");
    circle(mouseX + 10, mouseY - 20, eyeSize);
}

function mousePressed() {
    pacSize = random(50, 150);
}