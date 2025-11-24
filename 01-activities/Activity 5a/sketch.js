// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];
let ghosts = []

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(random(100,300)/2,random(100,300)));
  balls.push(new Ball(random(100,300),random(100,300)));
}

function draw() {
  background(230);
    for (let i = 0; i < ghosts.length; i++) {
    let g = ghosts[i];
    g.move();
    g.show2();
    
  // Step 3: check collisions
  // Use dist() between ball centers
  // Trigger feedback (color, bounce, etc.)
  }
  
  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();
    b.checkCollision(balls)
    
  // Step 3: check collisions
  // Use dist() between ball centers
  // Trigger feedback (color, bounce, etc.)
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 20;
    this.vel = createVector(random(-4,4), random(-4, 4));
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x > 400-this.r || this.pos.x < this.r) {this.vel.x *= -1}
    if (this.pos.y > 400-this.r || this.pos.y < this.r) {this.vel.y *= -1}
    // TODO: wrap around OR bounce off edges
  }

  show() {
    fill(100, 180, 220);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  
    show2() {
      push()
    fill(100, 180, 220,40);
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.r * 2);
      pop()
  }

   checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
        this.vel.x *= -1
        this.vel.y *= -1
        ghosts.push(new Ball(random(100,300),random(100,300)));
        }
      }
    }
  }
  // Use dist() and respond visually
}