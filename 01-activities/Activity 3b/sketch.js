// DM2008 — Activity 3b
// (One Function Wonder, 15 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(40);
  // crest(mouseX, mouseY, 75);
  amogus(mouseX,mouseY,map(sin(frameCount*0.05),1,-1,0.4,0.7))  // crest(80, 300, 120);
  // crest(280, 120, 90);
  for (let x = 50; x < 400; x += 100) {
    for (let y = 50; y < 400; y += 100) {
        crest(x, y, 65);
    }
  }
  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
}

// Example starter function:
function crest(x, y, size) {
  noStroke();
  rectMode(CENTER);
  rect(x, y, size / 5, size * 0.75);
  push();
  translate(x, y);
  rotate(QUARTER_PI);
  square(10, 10, size / 2);
  pop();
  circle(x, y, size / 2);
}

function keyPressed() {
  if (key === "s") {
    save("activity3b-image0.jpg")
  }
}


function amogus(x,y,size){
  push()
  translate(x,y);
  scale(size)
  translate(-200,-200)
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
  pop()
}
