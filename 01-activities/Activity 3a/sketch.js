// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let rpalette = ["#E45236", "#AA0B0B", "#D82F2F", "#7E0404"];
let gpalette = ["#3AA712", "#8BC34A", "#00963D", "#037507"];
let bpalette = ["#001672", "#0048FF", "#00DFFF", "#3287B9"];

// 2. A variable to track the current index
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  background(255);
}

function draw() {
  fill(0);
  textSize(20);
  text("number of colors:", 0, 400);
  text(rpalette.length, 160, 400);
  text("color:", 0, 380);
}

// 4. Change the index when a key is pressed
function keyPressed() {
  if (key === "r") {
    // Advance to the next item
    currentIndex++;
    // Reset to 0 when we reach the end
    if (currentIndex >= rpalette.length) {
      currentIndex = 0;
    }
    // Log in the console to check
    console.log("Current index:", currentIndex, "→", rpalette[currentIndex]);
    fill(rpalette[currentIndex]);
    ellipse(width / 2, height / 2, 200);
    fill(255);
    rect(0, 360, 400, 40);
    fill(0);
    text(rpalette[currentIndex], 55, 380);
  }

  if (key === "g") {
    // Advance to the next item
    currentIndex++;
    // Reset to 0 when we reach the end
    if (currentIndex >= gpalette.length) {
      currentIndex = 0;
    }
    // Log in the console to check
    console.log("Current index:", currentIndex, "→", gpalette[currentIndex]);
    fill(gpalette[currentIndex]);
    ellipse(width / 2, height / 2, 200);
    fill(255);
    rect(0, 360, 400, 40);
    fill(0);
    text(gpalette[currentIndex], 55, 380);
  }

  if (key === "b") {
    // Advance to the next item
    currentIndex++;
    // Reset to 0 when we reach the end
    if (currentIndex >= bpalette.length) {
      currentIndex = 0;
    }
    // Log in the console to check
    console.log("Current index:", currentIndex, "→", bpalette[currentIndex]);
    fill(bpalette[currentIndex]);
    ellipse(width / 2, height / 2, 200);
    fill(255);
    rect(0, 360, 400, 40);
    fill(0);
    text(bpalette[currentIndex], 55, 380);
  }

  if (key == ".") {
    rpalette.push(color(random(100, 255), random(0, 50), random(0, 50)));
    gpalette.push(color(random(0, 50), random(100, 255), random(0, 50)));
    bpalette.push(color(random(0, 50), random(0, 50), random(100, 255)));
    fill(255);
    rect(0, 360, 400, 40);
  }
  if (key == ",") {
    if (rpalette.length > 0) {
      rpalette.splice(rpalette.length - 1, 1);
    }
    if (gpalette.length > 0) {
      gpalette.splice(gpalette.length - 1, 1);
    }
    if (bpalette.length > 0) {
      bpalette.splice(bpalette.length - 1, 1);
    }
    fill(255);
    rect(0, 360, 400, 40);
  }
}

function mousePressed() {
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(width / 2, height / 2, 200);
  fill(255);
  rect(0, 360, 400, 40);
  fill(0);
  text("random", 55, 380);
}

/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/
