// DM2008 — Mini Project
// PONG (Starter Scaffold)

// Notes for students:
// 1) Add paddle controls (W/S and ↑/↓) inside handleInput()
// 2) Add scoring + reset when the ball goes past a paddle
// 3) Add win conditions / start + game-over states if you want

/* ----------------- Globals ----------------- */
let leftPaddle, rightPaddle, ball;
let rScore = 0;
let lScore = 0;
let time;
let bouncesound;
let winsound;
let bgsound;

/* ----------------- Setup & Draw ----------------- */

function preload() {
  bouncesound = loadSound("bounce.wav");
  bgsound = loadSound("bg.wav");
  winsound = loadSound("Win.wav");
}

function setup() {
  createCanvas(640, 360);
  noStroke();

  // paddles: x, y, w, h
  leftPaddle = new Paddle(30, height / 2 - 30, 10, 60);
  rightPaddle = new Paddle(width - 40, height / 2 - 30, 10, 60);

  // ball starts center with a gentle push
  ball = new Ball(width / 2, height / 2, 8);
  bgsound.loop();
}

function draw() {
  background(18);

  // 1) read input (students: add paddle movement here)
  handleInput();

  // 2) update world
  leftPaddle.update();
  rightPaddle.update();
  ball.update();

  // 3) handle collisions
  ball.checkWallBounce(); // top/bottom
  ball.checkPaddleBounce(leftPaddle);
  ball.checkPaddleBounce(rightPaddle);

  // 4) draw everything
  drawCourt();
  leftPaddle.show();
  rightPaddle.show();
  ball.show();

  text(rScore, 350, 30);
  text(lScore, 280, 30);
}

/* ----------------- Input ----------------- */
function handleInput() {
  if (keyIsDown(87) === true) {
    leftPaddle.vy = -6;
  }
  if (keyIsDown(83) === true) {
    leftPaddle.vy = 6;
  }
  if (keyIsDown(38) === true) {
    rightPaddle.vy = -6;
  }
  if (keyIsDown(40) === true) {
    rightPaddle.vy = 6;
  }
  if (keyIsDown(32) === true) {
    if (ball.gamePaused) {
      ball.reset();
      ball.gamePaused = false;
    }
    if (ball.gameOver) {
      ball.reset();
      ball.gameOver = false;
      rScore = 0;
      lScore = 0;
    }
  }
  if (keyIsDown(76) === true) {
    lScore = 4;
    rScore = 4;
  }

  // TODO (students): move paddles
  // Example targets:
  // - W/S to move leftPaddle up/down
  // - UP/DOWN to move rightPaddle up/down
  //
  // Hints:
  // leftPaddle.vy = -5 or 5; rightPaddle.vy = -5 or 5;
  // Make sure to stop paddles when keys are released (see keyReleased)
}

function keyReleased() {
  // Stop paddles when keys are released (students: fill this once handleInput is added)
  leftPaddle.vy = 0;
  rightPaddle.vy = 0;
}

/* ----------------- Classes ----------------- */
class Paddle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0; // students will change this via input
    this.speed = 5;
  }

  update() {
    // basic vertical movement; constrained to canvas
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }

  show() {
    fill(220);
    rect(this.pos.x, this.pos.y, this.w, this.h, 2);
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    // gentle random direction
    this.vel = createVector(0, 0);
    this.vel.x = random([-1, 1]) * 1.5;
    this.vel.y = random([-1, 1]) * 1.5;
    this.Rwin = false;
    this.Lwin = false;
    this.gamePaused = false;
    this.gameOver = false;
  }

  update() {
    this.pos.add(this.vel);
  }

  checkWallBounce() {
    // bounce off top/bottom
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.r, height - this.r);
      bouncesound.play();
    }

    if (this.pos.x + this.r < 0) {
      /* right player scores  */
      if (rScore < 4) {
        rScore += 1;
        print("right:" + rScore);
        ball.pause();
        this.gamePaused = true;
        time = frameCount;
        this.Rwin = true;
        winsound.play();
      } else {
        rScore = 5;
        this.gameOver = true;
      }
    }
    if (this.pos.x - this.r > width) {
      /* left player scores  */
      if (lScore < 4) {
        lScore += 1;
        print("left:" + lScore);
        ball.pause();
        this.gamePaused = true;
        time = frameCount;
        this.Lwin = true;
        winsound.play();
      } else {
        lScore = 5;
        this.gameOver = true;
      }
    }
  }

  checkPaddleBounce(p) {
    // AABB-then-circle quick check (simple & forgiving)
    const withinY = this.pos.y > p.pos.y && this.pos.y < p.pos.y + p.h;
    const withinX =
      this.pos.x + this.r > p.pos.x && this.pos.x - this.r < p.pos.x + p.w;

    if (withinX && withinY) {
      // push ball out so it doesn't get stuck
      if (this.vel.x < 0) {
        this.pos.x = p.pos.x + p.w + this.r;
      } else {
        this.pos.x = p.pos.x - this.r;
      }
      this.vel.x *= -1.25; // reflect horizontally
      bouncesound.play();
    }
  }

  show() {
    fill(255, 170, 70);
    circle(this.pos.x, this.pos.y, this.r * 2);
    if (this.Rwin) {
      push();
      fill(255, 170, 70, 80);
      textAlign(CENTER);
      textSize(50);
      text("Right scores", 320, 180);
      pop();
      if (frameCount > time + 40) {
        this.Rwin = false;
      }
    }

    if (this.Lwin) {
      push();
      fill(255, 170, 70, 80);
      textAlign(CENTER);
      textSize(50);
      text("Left scores", 320, 180);
      pop();
      if (frameCount > time + 40) {
        this.Lwin = false;
      }
    }

    if (this.gamePaused) {
      push();
      fill(255, 170, 70, 80);
      textAlign(CENTER);
      textSize(50);
      if (time + 60 < frameCount) {
        text("space to continue", 320, 180);
      }
      pop();
    }

    if (this.gameOver) {
      push();
      fill(0, 0, 0, 90);
      rectMode(CENTER);
      rect(320, 180, 450, 200, 40);
      fill(255, 170, 70);
      textAlign(CENTER);
      text("(space to restart)", 320, 240);
      textSize(50);
      if (rScore > 4) {
        text("Game Over", 320, 150);
        text("Right Player Wins", 320, 205);
      }
      if (lScore > 4) {
        text("Game Over", 320, 150);
        text("Left Player Wins", 320, 205);
      }
      pop();
    }
  }

  pause() {
    this.pos.set(width / 2, height / 2);
    this.vel.set(0);
  }

  reset() {
    // students: call this after a point is scored
    this.pos.set(width / 2, height / 2);
    this.vel.set(random([-1, 1]) * 3.7, random([-1, 1]) * 2.2);
  }
}

/* ----------------- UI helpers ----------------- */
function drawCourt() {
  // center line
  stroke(80);
  strokeWeight(2);
  for (let y = 10; y < height; y += 18) {
    line(width / 2, y, width / 2, y + 8);
  }
  noStroke();
}
