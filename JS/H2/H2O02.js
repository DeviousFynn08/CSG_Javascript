var kater,toren,piano;

function preload() {
  kater = loadImage("images/brieck.jpg");
  piano = loadImage("images/piano.jpg");
  toren = loadImage("images/toren.jpg");
}

function setup() {
  canvas = createCanvas(850,300);
  canvas.parent('processing');
  noLoop();
  background('grey');
  fill('white');
  textFont("Verdana");
  textSize(14);
  noStroke();
  rect(25,25,250,250);
  rect(300,25,250,250);
}

function draw() {
  text("afmeting: " + kater.width + " x " + kater.height,30,20);
  text("afmeting: " + piano.width + " x " + piano.height, 305,20);
  image(kater,25,25,250,250);
  image(piano, 300,25,250,250);
  image(toren, 575,25,250,250);
}