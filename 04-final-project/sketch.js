let handsfree;
let webcam;
let gameStarted = false;
let startTime;
let eyeBlinkHistory = [];
const historyLen = 320;
let runningAvg = 0;
let blinkActivation = 0;
let blinkCount = 0; // Count number of blinks to trigger randomization

// Message system
let message = "System online."; 
let messageTimer = 0; 
let messageDuration = 5000; // How long (ms) each message stays visible

// Store all sliders and dials in an array
let sliders = [];
let dials = [];

// Flashing start screen
let flashState = 0;
let flashTimer = 0;
let flashDuration = 50;

// Sounds
let bgMusic;
let startSound;
let blinkSound;
let badZoneSound;

// Timer
let elapsedTime = 0;

function preload() {
  bgMusic = loadSound('bgMusic.mp3');
  startSound = loadSound('startSound.mp3');
  blinkSound = loadSound('blinkSound.wav');
  badZoneSound = loadSound('badZoneSound.wav');
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);  // Dynamically sized canvas
  eyeBlinkHistory = Array(historyLen).fill(0.1);

  webcam = createCapture(VIDEO);
  webcam.size(windowWidth, windowHeight);  // Webcam matches canvas size
  webcam.hide();

  handsfree = new Handsfree({
    showDebug: false,
    hands: false,
    pose: false,
    facemesh: true,
  });
  handsfree.start();

  bgMusic.loop();
  startSound.play();
}

function draw() {
  background(0);

  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  // Calculate elapsed time
  elapsedTime = millis() - startTime;

  if (gameStarted && sliders.length === 0) {
    // Scale sliders and dials based on canvas size
    createCustomSlider(0.025 * width, 0.15 * height, 0.3 * width, 1.9, 40, 60);
    createCustomSlider(0.025 * width, 0.25 * height, 0.2 * width, 1.7, 30, 70);
    createCustomSlider(0.025 * width, 0.35 * height, 0.15 * width, 2, 45, 55);
    createCustomSlider(0.025 * width, 0.45 * height, 0.17 * width, 1.8, 50, 80);
    createCustomSlider(0.025 * width, 0.55 * height, 0.16 * width, 1.6, 10, 40);
    createCustomSlider(0.025 * width, 0.65 * height, 0.16 * width, 1.9, 60, 90);

    createCustomDial(0.85 * width, 0.23 * height, 0.1 * width, 1.9, 0, 10);
    createCustomDial(0.85 * width, 0.52 * height, 0.09 * width, 2, 30, 40);
    createCustomDial(0.85 * width, 0.79 * height, 0.08 * width, 1.8, 70, 85);
  }

  drawVideoBackground();
  drawFaceLandmarks();
  detectBlinking();
  checkBadZone();

  // Draw sliders
  for (let s of sliders) {
    drawSliderWithBorder(s);
    drawSliderGoodZone(s);

    if (!s.userInteracting) {
      s.value += s.direction * s.speed;
      if (s.value >= 100 || s.value <= 0) s.direction *= -1;
      s.slider.value(s.value);
    } else {
      if (millis() - s.lastInteractionTime > 3000) s.userInteracting = false;
      s.value = s.slider.value();
    }
  }

  // Draw dials
  for (let d of dials) {
    drawDialWithBorder(d);
    drawDialGoodZone(d);

    if (!d.isDragging && millis() - d.lastInteractionTime > 3200) {
      d.angle += d.direction * d.speed;
      if (d.angle >= 360) d.angle = 0;
      else if (d.angle <= 0) d.angle = 360;
      d.value = map(d.angle, 0, 360, 0, 100);
    }

    if (d.isDragging) {
      let dx = mouseX - d.x;
      let dy = mouseY - d.y;
      let newAngle = atan2(dy, dx);
      newAngle = degrees(newAngle);
      newAngle = (newAngle + 360) % 360;
      d.angle = newAngle;
      d.value = map(d.angle, 0, 360, 0, 100);
      d.lastInteractionTime = millis();
    }

    drawDialPointer(d.x, d.y, d.diameter, d.value);
  }

  drawMessageBox(); // 🟩 Draw message box
  drawTimer(); // 🟩 Draw timer
}

// Check if sliders or dials are out of the good zone
function checkBadZone() {
  let badSliders = 0;
  let badDials = 0;
  
  for (let s of sliders) {
    if (s.slider.value() < s.minGood || s.slider.value() > s.maxGood) badSliders++;
  }
  
  for (let d of dials) {
    if (d.value < d.minGood || d.value > d.maxGood) badDials++;
  }

  if (badSliders + badDials > 5) {
    if (!badZoneSound.isPlaying()) badZoneSound.play();
  }
}

function createCustomSlider(x, y, width, speed, minGood, maxGood) {
  let slider = createSlider(0, 100, 50, 1);
  slider.position(x, y);
  slider.size(width);

  let s = {
    slider,
    value: 50,
    direction: 1,
    speed,
    x,
    y,
    userInteracting: false,
    lastInteractionTime: 0,
    minGood,
    maxGood
  };

  slider.input(() => {
    s.userInteracting = true;
    s.lastInteractionTime = millis();
  });

  sliders.push(s);
}

function createCustomDial(x, y, diameter, speed, minGood, maxGood) {
  let d = {
    x,
    y,
    diameter,
    speed,
    value: 50,
    angle: 0,
    direction: 1,
    isDragging: false,
    startAngle: 0,
    lastInteractionTime: 0,
    minGood,
    maxGood
  };

  dials.push(d);
}

function drawDialPointer(x, y, diameter, value) {
  let angle = map(value, 0, 100, 0, 360);
  let pointerLength = diameter / 2 - 10;
  let pointerX = x + pointerLength * cos(radians(angle));
  let pointerY = y + pointerLength * sin(radians(angle));

  push();
  stroke(0, 119, 210);
  line(x, y, pointerX, pointerY);
  pop();
}

function drawSliderWithBorder(s) {
  let val = s.slider.value();
  let inRange = val >= s.minGood && val <= s.maxGood;
  let borderColor = inRange ? color(0, 255, 0) : color(255, 0, 0);

  push();
  stroke(borderColor);
  strokeWeight(2);
  noFill();
  rect(s.x - 5, s.y - 5, s.slider.width + 10, 30, 5);
  pop();
}

function drawDialWithBorder(d) {
  let inRange = d.value >= d.minGood && d.value <= d.maxGood;
  let borderColor = inRange ? color(0, 255, 0) : color(255, 0, 0);

  push();
  stroke(borderColor);
  strokeWeight(2);
  noFill();
  ellipse(d.x, d.y, d.diameter, d.diameter);
  pop();
}

function drawSliderGoodZone(s) {
  let goodZoneWidth = map(s.maxGood - s.minGood, 0, 100, 0, s.slider.width);
  let goodZoneX = map(s.minGood, 0, 100, 0, s.slider.width);

  push();
  fill(0, 255, 0, 60);
  noStroke();
  rect(s.x + goodZoneX, s.y - 5, goodZoneWidth, 30);
  pop();
}

function drawDialGoodZone(d) {
  let startAngle = map(d.minGood, 0, 100, 0, 360);
  let endAngle = map(d.maxGood, 0, 100, 0, 360);

  push();
  fill(0, 255, 0, 60);
  noStroke();
  arc(d.x, d.y, d.diameter, d.diameter, radians(startAngle), radians(endAngle), PIE);
  pop();
}

function drawVideoBackground() {
  push();
  translate(width, 0);
  scale(-1, 1);
  let myDefault = color(255, 255, 255, 40);
  let myTint = color(255, 0, 0);
  tint(lerpColor(myDefault, myTint, blinkActivation));
  image(webcam, 0, 0, width, height); // Webcam should now match the canvas size
  tint(255);
  pop();
}

function drawFaceLandmarks() {
  if (!handsfree.data.facemesh?.multiFaceLandmarks) return;
  let face = handsfree.data.facemesh.multiFaceLandmarks[0];
  if (!face) return;

  push();
  stroke("white");
  fill("white");
  for (let pt of face) {
    let px = map(pt.x, 0, 1, width, 0);
    let py = map(pt.y, 0, 1, 0, height);
    circle(px, py, 0.5);
  }
  pop();
}

// Detect blinking and randomize
function detectBlinking() {
  if (!handsfree.data.facemesh?.multiFaceLandmarks) return;
  let face = handsfree.data.facemesh.multiFaceLandmarks[0];
  if (!face) return;

  let pairs = [
    [159, 154],
    [158, 145],
    [385, 374],
    [386, 373],
  ];

  let measurement = pairs.reduce((sum, [a, b]) => {
    return sum + dist(face[a].x, face[a].y, face[b].x, face[b].y);
  }, 0);

  eyeBlinkHistory.shift();
  eyeBlinkHistory.push(measurement);

  runningAvg = 0.95 * runningAvg + 0.05 * measurement;
  let stdv = sqrt(
    eyeBlinkHistory.reduce((s, v) => s + sq(v - runningAvg), 0) / historyLen
  );

  blinkActivation *= 0.9;
  let threshVal = runningAvg - stdv;

  if (
    eyeBlinkHistory[historyLen - 1] < threshVal &&
    eyeBlinkHistory[historyLen - 2] >= threshVal
  ) {
    blinkActivation = 1.0;
    blinkSound.play();

    blinkCount++;
    if (blinkCount >= 3) {
      blinkCount = 0;

      // Randomize sliders and dials
      for (let s of sliders) {
        let newVal = random(0, 100);
        s.slider.value(newVal);
        s.value = newVal;
      }

      for (let d of dials) {
        d.value = random(0, 100);
        d.angle = map(d.value, 0, 100, 0, 360);
      }

      // Random message update
      let messages = [
        "⚠ STOP BLINKING",
        "💡 Keep your eyes open!",
        "🌀 Parameters shifted unexpectedly.",
        "🚨 THEY CAN SEE YOU. STAY FOCUSED",
        "🔧 WE SEE YOU",
        "👁 Blink registered.",
        "⚙ TARGETS BREACHING",
        "THEY CAN SEE YOU BLINKING",
      ];
      message = random(messages);
      messageTimer = millis();
    }
  }

  // 🟩 Draw blink graph at top
  push();
  let myGray = color(200);
  let myRed = color(255, 0, 0);
  fill(lerpColor(myGray, myRed, blinkActivation));
  noStroke();
  rect(0, 0, width, 50);

  noFill();
  stroke(0);
  beginShape();
  let startX = width / 2 - historyLen * 2;
  for (let i = 0; i < historyLen; i++) {
    let hx = startX + i * 2;
    let hy = eyeBlinkHistory[i] * 250;
    vertex(hx, hy);
  }
  endShape();

  stroke(0, 0, 0, 64);
  line(0, runningAvg * 250, width, runningAvg * 250);
  line(0, (runningAvg - stdv) * 250, width, (runningAvg - stdv) * 250);
  pop();
}

// 🟩 Draw message box at bottom-left
function drawMessageBox() {
  if (millis() - messageTimer > messageDuration) return;

  push();
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, height - 60, 330, 50, 8);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(message, 25, height - 35);
  pop();
}

// 🟩 Draw timer at bottom-center
function drawTimer() {
  let seconds = floor(elapsedTime / 1000);
  let minutes = floor(seconds / 60);
  seconds = seconds % 60;

  let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);

  push();
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("TIME: " + timeString, width / 2, height - 30);
  pop();
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    startTime = millis(); // 🟩 Start timer
  }

  for (let d of dials) {
    let dDist = dist(mouseX, mouseY, d.x, d.y);
    if (dDist < d.diameter / 2) {
      d.isDragging = true;
      d.startAngle = d.angle;
      d.lastInteractionTime = millis();
    }
  }
}

function mouseReleased() {
  for (let d of dials) d.isDragging = false;
}

function drawStartScreen() {
  flashTimer++;
  if (flashTimer % flashDuration === 0) flashState = 1 - flashState;

  push();
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(0.05 * width); // Text size relative to canvas width

  if (flashState === 0) text("DONT", width / 2, height / 2 - 0.1 * height);
  else text("BLINK", width / 2, height / 2 - 0.1 * height);

  fill(255);
  textSize(0.04 * width);
  text("Your directive is to keep the values in check.", width / 2, height / 2 + 0.05 * height);
  textSize(0.03 * width);
  text("Click anywhere to start.", width / 2, height / 2 + 0.1 * height);
  pop();
}

function keyPressed() {
  if (key === 'f' || key === 'F') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
