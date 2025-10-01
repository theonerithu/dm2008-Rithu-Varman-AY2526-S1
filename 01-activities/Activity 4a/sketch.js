// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;
let cookie2;

function setup() {
  createCanvas(400, 400);
  noStroke();
  // Step 3: make one cookie object
  cookie = new Cookie("chocolate", 80, width / 2, height / 2);
  cookie2 = new Cookie("Green", 60, width / 2, height / 4);
}

function draw() {
  background(230);
  cookie.show();
  cookie2.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, size, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color(196, 146, 96);
    this.color2 = color(20, 180, 120);
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == "chocolate") {
      fill(this.color);
    } else if (this.flavor == "Green") {
      fill(this.color2);
    }

    ellipse(this.x, this.y, this.size);
    frameRate(10)

    const s = this.size * 0.1;
    fill(random(0,255),random(0,255),random(0,255));
    ellipse(this.x - this.size * 0.22, this.y - this.size * 0.15, s);
    ellipse(this.x + this.size * 0.18, this.y - this.size * 0.1, s);
    ellipse(this.x - this.size * 0.05, this.y + this.size * 0.12, s);
    ellipse(this.x + this.size * 0.2, this.y + this.size * 0.18, s);
  }

  move(direction) {
    if (direction == "left") this.x -= 10;
    if (direction == "right") this.x += 10;
        if (direction == "down") this.y += 10;
    if (direction == "up") this.y -= 10;
  }

  changeColor() {
    this.color = color(random(100, 255), random(0, 100), random(0, 100));
    this.color2 = color(random(0, 100), random(100, 255), random(0, 100));
  }
  // Steps 5 & 6: Implement additional methods here
}

// Step 5: add movement (keyboard arrows)
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    cookie.move("left");
    print("left");
  } else if (keyCode === RIGHT_ARROW) {
    cookie.move("right");
    print("right");
  } else if (keyCode === UP_ARROW) {
    cookie.move("up");
    print("up");
  }
  else if (keyCode === DOWN_ARROW) {
    cookie.move("down");
    print("down");
  }
  else if (key === "w") {
    cookie2.move("up");
    print("up");
  }
  else if (key === "s") {
    cookie2.move("down");
    print("down");
  }
  else if (key === "d") {
    cookie2.move("right");
    print("right");
  } else if (key === "a") {
    cookie2.move("left");
    print("left");
  }
}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  cookie.changeColor();
  cookie2.changeColor();
}
