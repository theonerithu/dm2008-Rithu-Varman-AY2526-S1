// DM2008
// Activity 1b (Ryoji Ikeda)

let x;
let a;
let b;

function setup() {
  createCanvas(800, 800);
  noStroke();
  fill(0);
  a = 10;
}

function draw() {
  a = random(5, 10);
  b = random(10, 60);
  background(b, a);

  x = random(width);
  let w = map(mouseX, 0, 800, 5, 40);
  fill(random(0, 50), random(50, 100), random(100, 150));
  rect(x, 0, w, height / 5, 1);

  x = random(width);
  fill(random(100, 150), random(150, 200), random(0, 50));
  rect(x, height / 5, w, height / 5, 1);

  x = random(width);
  fill(random(200, 250), random(50, 100), random(0, 50));
  rect(x, (height / 5) * 2, w, height / 5, 1);

  x = random(width);
  fill(random(150, 200), random(0, 50), random(150, 200));
  rect(x, (height / 5) * 3, w, height / 5, 1);

  x = random(width);
  fill(random(0, 50), random(200, 255), random(200, 255));
  rect(x, (height / 5) * 4, w, height / 5, 1);
  let fr = map(mouseY, 0, 800, 10, 120);
  frameRate(fr);
}

function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
}
