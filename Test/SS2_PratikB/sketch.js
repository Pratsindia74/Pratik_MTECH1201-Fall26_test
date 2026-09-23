function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(0);
    fill("yellow");
    arc(mouseX, mouseY, 100, 100, 0.5, 5.8);

    fill("black");
    circle(mouseX + 10, mouseY - 20, 10);
}