// DM2008 — Activity 3b
// (Painting App, 50 min)

// 1) Palette + size
const palette = ["#FF2B01", "#0051FA", "#0EE71D", "#E917D1"];
let colorIndex = 0;
let sizeVal = 40;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushSquare, brushStreak, brushEraser];
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(240);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = palette[colorIndex];
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }
}

// 3) Brush functions (students can customize/extend)
function brushCircle(x, y, c, s) {
  noStroke();
  fill(c);
  ellipse(x, y, s);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  fill(c);
  rotate(random(0,180));
  rect(0, 0, s, s);
  pop();
}

function brushStreak(x, y, c, s) {
  fill(random(0,255),random(255),random(255));
  ellipse(x, y,random(sizeVal-35,sizeVal),random(sizeVal-35,sizeVal));
}

function brushEraser(x, y, c, s) {
  noStroke();
  fill(240);
  ellipse(x, y, s+10);
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case "1":
      currentBrush = 0; // circle
      break;
    case "2":
      currentBrush = 1; // square
      break;
    case "3":
      currentBrush = 2; // streak
      break;
    case "e":
      currentBrush = 3; // Eraser
      break;
  }
  if (key == "C" || key == "c") {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
  }
  if (key == "+" || key == "=") {
    sizeVal += 4;
  }
  if (key == "-" || key == "_") {
    sizeVal = max(4, sizeVal - 4);
  }
  if (key == "X" || key == "x") {
    background(240); // clear canvas
  }
  if (key == "s") {
    save("activity3c-image01.jpg")
  }

  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
}
