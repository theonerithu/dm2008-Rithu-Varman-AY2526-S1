// DM2008 – LED Challenge
// One LED blinks (digitalWrite), one LED fades (analogWrite)

int fadeLED = 9;      // PWM pin for fade control (~)
int brightness = 0;   // Current brightness level (0–255)
int fadeAmount = 5;   // How much to change brightness each frame

void setup() {
  // Set pins as outputs
  pinMode(fadeLED, OUTPUT);
}

void loop() {
  // Fade LED (analogWrite)
  analogWrite(fadeLED, brightness);  // Set brightness (0–255)
  brightness += fadeAmount;          // Increase or decrease brightness

  // Reverse direction at brightness limits
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }

  delay(30); // Small pause for smooth fading
}