// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided
let img;

function preload() {
  img = loadImage("background.png");
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 255, 1);
  image(img, 0, 0, width, height);
  // YOUR CODE HERE
  //outline
  rectMode(CENTER);
  stroke(0);
  strokeWeight(12);
  rect(200, 200, 130, 160, 50, 75, 0);
  rectMode(CORNER);
  rect(135, 280, 55, 45, 0, 0, 10);
  rect(210, 280, 55, 45, 0, 0, 10);
  //outline
  noStroke();
  fill(122, 8, 59);
  rectMode(CENTER);
  rect(200, 200, 130, 160, 50, 75, 0);
  fill(199, 16, 20);
  rectMode(CORNER);
  rect(145, 120, 118, 140, 40, 75, 40, 90);
  fill(122, 8, 59);
  rectMode(CORNER);
  rect(135, 280, 55, 45, 0, 0, 10);
  rect(210, 280, 55, 45, 0, 0, 10);
  stroke(0);
  strokeWeight(5);
  fill(199, 16, 20);
  rectMode(CORNER);
  rect(95, 180, 37, 100, 15, 0, 0, 15);
  noStroke();
  fill(122, 8, 59);
  rectMode(CORNER);
  rect(97.5, 195, 32, 83, 20, 5, 0, 15);
  fill(79, 125, 161);
  stroke(0);
  strokeWeight(5);
  rectMode(CORNER);
  rect(170, 160, 110, 50, 20);
  noStroke();
  fill(150, 203, 221);
  rectMode(CORNER);
  rect(190, 163, 88, 33, 7, 15, 35);
  fill(255, 255, 255);
  rect(233, 165, 40, 13, 13);
  // YOUR CODE HERE
  helperGrid(); // do not edit or remove this line
}
