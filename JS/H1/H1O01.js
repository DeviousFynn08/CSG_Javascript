class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('black');
    for (var rij = 0;rij<this.aantalRijen;rij++) {
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class kikker {
    constructor(png) {
        this.afbeelding = png;
        this.breedte = 300;
        this.hoogte = round(this.breedte / this.afbeelding.width * this.afbeelding.height);
        this.x = 0;
        this.y = 200;
    }

    teken() {
        push();
        noStroke();
        image(this.afbeelding, this.x, this.y, this.breedte, this.hoogte);
        pop();
    }
}

class auto {
    constructor(png, snelheid = 0) {
        this.afbeelding = png;
        this.breedte = 100;
        this.hoogte = round(this.breedte / this.afbeelding.width * this.afbeelding.height);
        this.x = random(0, canvas.width - this.breedte);
        this.y = random(0, canvas.height - this.hoogte);
        this.snelheid = snelheid;
    }

    teken() {
        push();
        noStroke();
        image(this.afbeelding, this.x, this.y, this.breedte, this.hoogte);
        pop();
    }

}
function preload () {
    pngKikker = loadImage('images/kikker.png');
    pngAuto = loadImage('images/choco.jpg');
}

function setup () {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('processing');
    raster = new Raster(6,8); 
    raster.berekenCelGrootte()
    
    kikker1 = new kikker(pngKikker);
    auto1 = new auto(pngAuto);
    
}

function draw () {
    kikker1.teken();
    auto1.teken();
    raster.teken();

}