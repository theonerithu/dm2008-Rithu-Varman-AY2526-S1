// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0; // ellipse x-position
let size = 50; // ellipse size (you can change this in your if/else)
let bgColor; // background color set by switch(key)
let f = 0;
let shape;
let a;
let bg1;
let bg2;
let bgi;

function preload() {
  bg1 = loadImage("1.png");
  bg2 = loadImage("2.png");
  bg3 = loadImage("3.png");
  bg0 = loadImage("0.png");
}
function setup() {
  createCanvas(400, 400,);
  bgColor = color(220);
  shape = rect;
  a = 0;
  bgi = bg0;
}

function draw() {
  background(bgColor);
  image(bgi, 0, 0, width, height);
  fill(f);
  rectMode(CENTER);
  shape(x, height / 2, size);
  size = map(mouseY, 0, 400, 15, 200)
  x += map(mouseX, 0, 400, 0, 10);
  if (x > width + size / 2) {
    x = 0;
  }
  noStroke();
  fill(255, 255, 0, a);

  // Update start and stop angles.
  let biteSize = PI / 16;
  let startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
  let endAngle = TWO_PI - startAngle;

  // Draw the arc.
  arc(x, height / 2, size, size, startAngle, endAngle, PIE);
}

// --- Mode switching with number keys: 1, 2, 3 ---
function keyPressed() {
  switch (key) {
    case "1":
      a = 0;
      bgColor = color(200, 100, 100); // red
      bgi = bg1;
      f = color(30, 47, 95);
      shape = ellipse;
      break;
    case "2":
      a = 0;
      bgColor = color(100, 200, 100); // green
      bgi = bg2;
      f = color(random(0,100),random(1,99),random(3,98));
      shape = rect;
      break;
    case "3":
      bgColor = color(100, 100, 200); // blue
      bgi = bg3;
      shape = point;
      f = 0;
      size = 1;
      a = 255;
      break;
    case "s":
        saveCanvas("activity2a-image", "jpg");
      break;
    default:
      bgColor = color(220); // grey
      shape = square;
      f = 0;
      a = 0;
      bg= 0;
      bgi = bg0;
      break;
  }
}
