var totaalogen = 0;
class dobbelSteen  { 
  constructor(x) {
    this.x  = x;
    this.y  = 25;
    this.grootte = 200;
    this.diameterOgen = 50;
    this.ogen = null;
    this.R = null;
    this.G = null;
    this.B = null;

  }

  gooi() {
    this.ogen = floor(random(0,6)) + 1;

    this.R = round(random(0,255));
    this.G = round(random(0,255));
    this.B = round(random(0,255));
  }
  
  teken() {
    push();
    fill(this.R,this.G,this.B);
    rect(this.x,this.y,this.grootte,this.grootte);

    // hieronder volgt code om de stippen op de juiste plek te krijgen
    
    fill('black');    
    if (this.ogen!=1) {ellipse(this.x+this.grootte/6*1,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==6) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen>3) {ellipse(this.x+this.grootte/6*5,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==1 || this.ogen==3 || this.ogen==5) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*3,this.diameterOgen,this.diameterOgen);}
    if (this.ogen>3) {ellipse(this.x+this.grootte/6*1,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==6) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen!=1) {ellipse(this.x+this.grootte/6*5,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    pop();
  }
}

function setup() {
  canvas = createCanvas(700,300);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Georgia");
  textSize(65);
  frameRate(15);
  background('lightcyan');
  dob1 = new dobbelSteen(25);
  dob2 = new dobbelSteen(250);
  dob3 = new dobbelSteen(475);
  
}

function draw() {
   text('Totaal: ' + totaalogen, 200, 280);
    
  if (mouseIsPressed) {
    dob1.gooi();
    dob2.gooi();
    dob3.gooi();
    background('lightcyan');
    dob1.teken();
    dob2.teken();
    dob3.teken();
  
    totaalogen += dob1.ogen + dob2.ogen + dob3.ogen;
  }
}