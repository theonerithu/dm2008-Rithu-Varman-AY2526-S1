let colorBtn, sizeSlider, shapeSelect;
let shapeColor;
let isOn = false; 

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");
  angleMode(DEGREES);

  // starting color
  shapeColor = color(random(255), random(255), random(255));

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);
  
  partyBtn = createButton("Party Mode");
  partyBtn.position(16, 220);
  partyBtn.mousePressed(buttonToggle);
  
  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
  }

  // Slider: controls size
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(0, 220, 110, 1);
  sizeSlider.position(15, 70);
  
    createP("Rotation").position(0, 160).style("margin", "4px 0 0 16px");
  rotateSlider = createSlider(0, 360, 0, 0);
  rotateSlider.position(15, 180);


  // Dropdown: choose shape
  createP("Shapes").position(0, 100).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 130);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");
}

function buttonToggle(){
    isOn = !isOn; 
  }

function partyMode(){
sizeSlider.value(sqrt(sq(sin(frameCount)*220)));
rotateSlider.value(sqrt(sq(sin(frameCount)*360)));
  }

function draw() {
  background(240);

  push();
  translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();
  let r = rotateSlider.value();

  // draw chosen shape
  if (isOn){ fill(sqrt(sq(sin(frameCount*0.9)*255)),sqrt(sq(sin(frameCount*0.8)*255)),sqrt(sq(sin(frameCount*0.7)*255)));
    partyMode();
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    rotate(r);
    ellipse(0, 0, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rotate(r);
    rect(0, 0, s, s);
  } else if (choice === "triangle") {
    rotate(r);
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);}
           }else{
  fill(shapeColor);
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    rotate(r);
    ellipse(0, 0, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rotate(r);
    rect(0, 0, s, s);
  } else if (choice === "triangle") {
    rotate(r);
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }
  pop();
  }
}
