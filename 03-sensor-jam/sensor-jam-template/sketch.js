let port; // Serial Communication port
let connectBtn;

let sensorVal = 50; 
let circleSize = 50;

let y; 
let speed = 5;
let gravity = 0.5;

let ballColor; // <-- new variable for color

let ceilingY;  // New variable for the ceiling's position
let minCeilingHeight; // Minimum distance between ceiling and ground

function preload() {
  bouncesound = loadSound("bounce.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); 

  // Initial vertical position (middle)
  y = height / 2;

  // Set initial color
  ballColor = color(255, 255, 255);

  // Set minimum ceiling height (the ball's diameter)
  minCeilingHeight = circleSize;

  // Connection button
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(100);

  // ----- CONTROL THE CEILING ----- 
  // Set the ceiling's position based on the mouse's vertical position
  ceilingY = constrain(mouseY, 0, height - minCeilingHeight); // The ceiling can't go below the minimum height

  // ----- BOUNCING MOTION -----
  y += speed;
  speed += gravity;

  // Bounce off bottom
  if (y + circleSize/2 > height) {
    y = height - circleSize/2;
    speed *= -1;
    bouncesound.play();

    // Change color
    ballColor = color(random(255), random(255), random(255));
  }

  // Bounce off the ceiling (controlled by the cursor)
  if (y - circleSize/2 < ceilingY) {
    y = ceilingY + circleSize/2;
    speed *= -1;
    bouncesound.play();

    // Change color
    ballColor = color(random(255), random(255), random(255));
  }

  // ----- DRAW CIRCLE ----- 
  fill(ballColor);
  noStroke();
  ellipse(width / 2, y, circleSize);

  // ----- RECEIVE DATA -----
  if (port.opened()) {
    let incoming = port.readUntil("\n");
    if (incoming[0]) {
      sensorVal = parseInt(incoming);
      circleSize = map(sensorVal, 0, 255, 20, 300); 
      minCeilingHeight = circleSize; // Update the minimum ceiling height with the ball's size
    }
  }

  // ----- DRAW CEILING ----- 
  fill(255, 0, 0, 150); // Red ceiling (semi-transparent)
  rect(0, ceilingY, width, 10); // Draw ceiling as a red line
}

// DO NOT REMOVE
function connectBtnClick(e) {
  if (!port.opened()) {
    port.open(9600);
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
