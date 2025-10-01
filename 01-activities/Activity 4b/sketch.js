// DM2008 — Activity 4b
// Objects in Motion (60 min)

// ============================
// Step 0: Global data
// ============================
let agents = []; // array to hold many objects
let fr;

function setup() {
  createCanvas(600, 400);
  noStroke();
  fr = 1;
}

function draw() {
  background(230);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update(); // change over time
    agents[i].show(); // draw
    agents[i].shrink();
    if (agents[i].size <= 0) {
      agents.splice(i, 1);
    }
  }

  let size = random(16, 70);
  let speedX = random(-2, 2);
  let speedY = random(-2, 2);
  if (frameCount % fr === 0) {
    agents.push(new Agent(mouseX, mouseY, size, speedX, speedY));
  }

  fill(0);
  text("spawnrate:", 10, 390);
  text(101 - fr, 70, 390);
}

// ============================
// Step 4: Interaction (optional)
// - Add new objects with mouse clicks
// - Toggle behaviors with keys
// ============================
function mousePressed() {
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(12, 50);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    // TODO: pass any extra properties you plan to use
    agents.push(new Agent(x, y, size, speedX, speedY));
  }
}

function keyPressed() {
  // Example toggles—feel free to customize
  if (key === "c") {
    // clear all agents
    agents = [];
    print("cleared");
  }

  if (keyCode === LEFT_ARROW) {
    if (fr < 98) {
      fr = fr + 3;
      print(fr);
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (fr > 3) {
      fr = fr - 3;
      print(fr);
    }
  }
}

// ============================
// Step 5: Define your Class
// - Must have at least 1 property that changes over time
// - Must have at least 1 method besides show()
// - Feel free to add more properties/methods
// ============================
class Agent {
  constructor(x, y, size, speedX, speedY) {
    // Required properties
    this.x = x;
    this.y = y;
    this.size = size;

    // Motion
    this.dx = speedX;
    this.dy = speedY;

    // Style (customize!)
    this.hue = random(360);
    this.alpha = 200;

    // Lifespan (optional)
    this.life = 255; // use this if you want fade/shrink/remove behavior
  }

  // Method #1: update — change over time
  update() {
    // Basic movement
    this.x += this.dx;
    this.y += this.dy;

    // Simple screen wrap (A) or bounce (B) — pick one or implement your own:

    // // (A) Wrap:
    // if (this.x > width) {
    //   this.x = 0;
    // }
    // if (this.x < 0) {
    //   this.x = width;
    // }
    // if (this.y > height) {
    //   this.y = 0;
    // }
    // if (this.y < 0) {
    //   this.y = height;
    // }

    // (B) Bounce (comment Wrap out if you use Bounce):
    if (this.x < 0 || this.x > width) {
      this.dx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.dy *= -1;
    }

    // Example of property changing over time:
    // subtle size pulse
    // this.size += sin(frameCount * 0.05) * 0.2;

    // Or use a lifespan:
    // this.life -= 1;        // fade over time
    // this.size -= 0.05;     // shrink slowly
  }

  shrink() {
    this.size -= 0.25; // shrink each frame
  }

  // Method #2: show — draw the object
  show() {
    // If you use HSB, set colorMode(HSB) in setup()
    // colorMode(HSB, 360, 100, 100, 255);
    // fill(this.hue, 70, 90, this.alpha);

    // Using RGB to keep it simple
    fill(50 + (this.hue % 200), 120, 200, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

/* ============================
   TODO ideas (pick at least one):
   - Add a second method besides show(), e.g., bounce(), shrink(), changeColor()
   - Make one property evolve over time (size, hue, alpha, speed)
   - Add a key or mouse interaction that changes *all* agents (loop over array)
   - Implement removal: shrink agents and splice them when too small
============================= */
