// DDM2008 — Activity 2b
// (Pattern Making, 40 min)

let d;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  d = 40;

  for (let x = d; x < 400; x += d) {
    for (let y = d; y < 400; y += d) {
      speed = map(mouseY, 0, 400, 0, 25, true);
      let moveX =
        noise(x , y, frameCount / 15) * speed;
      let moveY =
        noise(x+50, y+50, frameCount / 15) * speed;

      if (mouseIsPressed === false) {
        fill(255);
        circle(x + moveX, y + moveY, 10);
      } else {
        fill(255);
        circle(x + moveX, y + moveY, random(5 - 15));
      }
    }
  }
}

function keyPressed() {
  switch (key) {
    case "s":
      saveCanvas("activity2b-image", "jpg");
      break;
  }
}
