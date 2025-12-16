var aantalLagen = 40;
var breedte = 90;
var hoogte;


function setup() {
  hoogte = breedte / 2;
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noLoop();
  background('silver');
  fill('lightslategray');
  stroke('darkslategray');
}

function draw() {
  for (laag = 1;laag <= aantalLagen;laag++) {
    tekenRij(laag);
    translate(0,hoogte);
  }
  }
  

function tekenRij(aantalStenen) {
  inspringen = (aantalLagen - aantalStenen)*0.5*breedte; // breedte(2 -0.5*(aantalStenen - 1)) = breedte*(2.5 - 0.5*aantalStenen)
  console.log(inspringen);
  push();
  translate(inspringen,0);
  for (var steen = 0;steen < aantalStenen;steen++) {
    rect(breedte*steen,0,breedte,hoogte);
  }
  pop();
}