// raster is uit hoofdstuk 2 opdracht 34
class Raster {
  constructor(r) {
    this.aantalRijen = r;
    this.aantalKolommen = floor(windowWidth / (windowHeight/this.aantalRijen));
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
    this.celGrootte = canvas.height / this.aantalRijen;
  }
  
  teken() {
    push();
    noFill();
    noStroke();
    for (var rij = 0;rij<this.aantalRijen;rij++) {
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}
// steijn zet erbij van waar deze is gehaald, geldt voor alle uit alle onder class Kikker
class Kikker {
    constructor(png, celGrootte,raster) {
        this.afbeelding = png;
        this.animatie = [];
        this.breedte = celGrootte;
        this.hoogte = celGrootte;
        this.celGrootte = celGrootte;
        this.stapGrootte = celGrootte/8;
        this.gehaald = false;
        this.raster = raster;
        this.benGeraakt = false;
        this.alsbeweegt = false;
        this.x = celGrootte / 2;
        this.y = canvas.height / 2;

    }

    berekenPositie() {
       this.rij  = this.raster.aantalRijen - 1;
       this.kolom = floor(this.raster.aantalKolommen / 2);
        this.x = this.kolom * this.celGrootte;
        this.y = this.rij * this.celGrootte;
    }

    teken() {
        push();
        noStroke();
        image(this.afbeelding, this.x, this.y, this.breedte, this.hoogte);
        pop();
    }
    beweeg() {
        if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.stapGrootte;
            this.alsbeweegt = true;
            this.afbeelding = pngKikkerlinks;
      
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.stapGrootte;
            this.alsbeweegt = true;
            this.afbeelding = pngKikkerechts;
      
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.stapGrootte;
            this.alsbeweegt = true;
            this.afbeelding = pngKikker;
      
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.stapGrootte;
            this.alsbeweegt = true;
            this.afbeelding = pngKikkerachteruit;
      
    }
    
    this.x = constrain(this.x,0,canvas.width -  this.celGrootte);
    this.y = constrain(this.y,-1,canvas.height - this.celGrootte);

        // geef je ai prompt, steijn in word 
        this.kolom = round(this.x / this.celGrootte);
        this.rij = round(this.y / this.celGrootte);

        // geef je ai prompt, steijn in word
        if (this.y == 0) {
            this.gehaald = true;
        }
    }

    wordtGeraakt(auto) {
        // steijn bron vermelden
        if (this.x < auto.x + auto.breedte &&
            this.x + this.breedte > auto.x &&
            this.y < auto.y + auto.hoogte &&
            this.y + this.hoogte > auto.y) {
            this.benGeraakt = true;
            return true;
        }
        return false;
    }
}
class Auto {
    constructor(png, celGrootte, raster) {
        this.afbeelding = png;
        this.breedte = celGrootte * 2;
        this.hoogte = celGrootte * 2;
        this.celGrootte = celGrootte;
        this.raster = raster;
        this.rij = floor(random(0, this.raster.aantalRijen-1));
        // bepaal of de auto van links of van rechts komt
        this.richting = (random() < 0.5) ? 'right' : 'left';
        this.totaalbreed = this.raster.aantalKolommen * this.celGrootte;
        // zet x buiten beeld aan de linkerkant of rechterkant afhankelijk van richting
        this.x = random(0, this.totaalbreed - this.breedte);
if (this.richting === 'right') {
    this.afbeelding = pngAuto;
} else {
    this.afbeelding = pngautolinks;
}
        this.y = this.rij * this.celGrootte;
        this.midden = this.x + this.breedte / 2; 
        this.baseSnelheid = max(1, floor(this.celGrootte / 8));
        // snelheid krijgt een teken afhankelijk van richting
        this.snelheidAuto = this.baseSnelheid * (this.richting === 'right' ? 1 : -10);
    }



    teken() {
        push();
        noStroke();
        image(this.afbeelding, this.x, this.y, this.breedte, this.hoogte);
        pop();
    }

    rijden() {
        this.x += this.snelheidAuto;

        // wrap-around afhankelijk van rijrichting
        if (this.snelheidAuto > 0 && this.x > this.totaalbreed) {
            this.x = -this.breedte;
            this.rij = floor(random(0, this.raster.aantalRijen - 1)); // nieuwe rij
            } 
            else if (this.snelheidAuto < 0 && this.x + this.breedte < 0) {
                this.x = this.totaalbreed;
                this.rij = floor(random(0, this.raster.aantalRijen - 1)); // nieuwe rij
}


        // bereken in welke kolom het middelpunt van de auto zich bevindt
        const centerX = this.x + this.breedte / 2;
        this.kolom = floor(constrain(centerX / this.celGrootte, 0, this.raster.aantalKolommen - 1));

        this.y = this.rij * this.celGrootte;
    }
    }
class Demospel {
    constructor() {
        this.k = null;
        this.autos = [];
        this.actief = null;
        this.afgelopen = null;
        this.gewonnen = null;
        this.levelGehaald = null;
        this.level = null;
        this.gefaald = null;
        this.raster = null;
    }

    nieuwSpel() {
        this.actief = false;
        this.afgelopen = false;
        this.gewonnen = false;
        
        this.level = 0;
        this.gefaald = false;
        this.raster = new Raster(15);
        this.raster.berekenCelGrootte();
        
    }

    nieuwLevel() {
        this.level++;
        this.levelGehaald = false;
        this.gefaald = false;
        this.k = new Kikker(pngKikker, this.raster.celGrootte, this.raster);
        this.k.berekenPositie();
        this.autos = [];
        const aantalAutos = this.level *2+2;
        for (var i = 0;i<aantalAutos;i++) {
            var auto = new Auto(pngAuto, this.raster.celGrootte, this.raster);
        // heb ik van internet gehaald; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment
        const factor = 1 + this.level * 0.50;
        // behoud richting: snelheid heeft teken afhankelijk van auto.richting
        const speed = max(1, floor(auto.baseSnelheid * factor));
        auto.snelheidAuto = speed * (auto.richting === 'right' ? 1 : -1);
            this.autos.push(auto);
        }

    }

    update() {
        if (this.actief && !this.levelGehaald) {
            this.k.beweeg();
            for (var i = 0; i < this.autos.length; i++) {
                var auto = this.autos[i];
                auto.rijden();
            this.geluid();


            
            if (this.k.kolom === auto.kolom && this.k.rij === auto.rij) {
                if (!this.k.benGeraakt) {
                    this.k.benGeraakt = true;
                    this.levelGehaald = true;
                    this.actief = false;
                    this.gefaald = true;

                     if (pngBeat && pngBeat.isPlaying()) {
            pngBeat.stop();
        }
                if (pngCrash) {
            pngCrash.play();
        }
                }

            }
            }

            
            if (this.k.y <= -1) {
            if (!this.levelGehaald) {
                this.levelGehaald = true;

                
                if (this.level < 3) {
                    
                    if (pngLevelGehaald) pngLevelGehaald.play();
                } else if (this.level === 3) {
                    
                    this.afgelopen = true;
                    this.actief = false;
                    if (pngAllesgehaald) 
                        pngAllesgehaald.play();

             if (pngBeat && pngBeat.isPlaying()) {
                        pngBeat.stop();
                    }
                }
            }
        }
    }
}

    geluid() {
    if (!pngBeat) return;

    const isPlaying = pngBeat.isPlaying();
    
    // if (this.actief && this.levelGehaald)

    
    if (this.actief && this.k && !this.k.benGeraakt && !this.levelGehaald) {
        if (!isPlaying) {
            pngBeat.loop();
        }
    }
    
    else {
        if (isPlaying) {
            pngBeat.stop();
        }
    }
}

    tekenStartScherm() {
    background(255)
    image(pngKikkerSad, 0, 0, canvas.width, canvas.height);
    
    const welcomeText = `Welkom bij KikkerKruising!
Mister Kikker zou graag naar de overkant willen.
Zou je hem hierbij willen helpen?
Hierbij zorg je ervoor Mister Kikker natuurlijk niet aangereden wordt!
Gebeurt dit wel is het Game Over! En moet je opnieuw beginnen.
Er zijn 3 levels.
Let op! Bij elk level die je omhoog gaat, zijn er meer auto's en worden ze sneller!`;
    
    const controlsText = `Gebruik de pijltjes toetsen om vooruit, links, rechts en achteruit te bewegen.
Als je er klaar voor bent klik dan op spatie om te beginnen!`;
    
    text(welcomeText, canvas.width / 2, canvas.height / 2.5);
    text(controlsText, canvas.width / 2, canvas.height / 1.3);
}

   tekenLevelScherm() {
        text("Dit was level " + this.level + "\nNu level "+ (this.level + 1) +"\nGebruik enter",canvas.width / 2,canvas.height / 2);
    }    

    tekenEindScherm() {
        text("Je hebt het gehaald! \n Mister Kikker kan nu veilig naar huis! \nGebruik spatie om nog maar een keer een snelweg over te steken",canvas.width / 2,canvas.height / 2);
    }

    tekenSpelToestand() {
        for (var i = 0; i < this.autos.length; i++) {
           var auto = this.autos[i];
            auto.teken();
        }
        this.k.teken(); //hier 4 verschillende kikker images voor verschillende richtingen
        if (!this.k.alsbeweegt) {
            text("Het spel is bezig, deze tekst verdwijnt zodra je begint.\nGa naar de overkant!\nLEVEL "+this.level,canvas.width / 2,canvas.height / 2);
        }
    }

    tekenSpelFaal() {
        text("Je bent aangereden!\nDruk op spatie om opnieuw te beginnen. \nJe bent tot level " + this.level + " gekomen",canvas.width / 2,canvas.height / 2)
    }

    teken() {
        push();
        textAlign(CENTER,CENTER);
        textFont("Elliottica");
        textSize(44);
        textAlign(CENTER,CENTER);
        stroke ('white');
              
        if (pngWeg) {
            image(pngWeg, 0, 0, canvas.width, canvas.height);
        } else {
            background(200);
        }
        
        if (this.gefaald || (this.k && this.k.benGeraakt)) {
            this.tekenSpelFaal();
        }
        else if (this.actief) {
        
            if (this.levelGehaald) {
                
                this.tekenLevelScherm();
            }
            else {
              
                this.tekenSpelToestand();
            }
        }
        else
        {
           
            if (this.afgelopen) {
                
                this.tekenEindScherm();
            }
            else {
                
                this.tekenStartScherm();
            }
        }

        pop();
        this.raster.teken();
        
    }
}
function preload() {
    pngKikker = loadImage('assets/kikker.png'); 
    pngKikkerachteruit = loadImage('assets/kikkerachteruit.png');
    pngKikkerlinks = loadImage('assets/kikkerlinks.png');
    pngKikkerechts = loadImage('assets/kikkerechts.png');

    pngAuto = loadImage('assets/istockphoto-1126190192-612x612__2_-removebg-preview.png');
    pngWeg = loadImage('assets/weg1.png');
    pngKikkerSad = loadImage('assets/kikkersad.png');
    pngBeat= loadSound('assets/frog-beat-277297.mp3');
    pngCrash = loadSound('assets/crashgeluid.mp3');
    pngAllesgehaald = loadSound('assets/allesgehaald.mp3');
    pngLevelGehaald = loadSound('assets/levelgehaald.mp3');
    pngautolinks = loadImage('assets/autolinks.png');
    
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('processing');
  spel = new Demospel();
  spel.nieuwSpel();
}

function draw() {
    spel.update();
    spel.teken();
}

function keyPressed() {
    
    if (spel.actief) {
        
        if (spel.levelGehaald && keyCode == 13) {
            spel.nieuwLevel();
        }
        
    }

    if (!spel.actief && keyCode == 32) {
        if (spel.afgelopen) {
            spel.nieuwSpel();
        } else if (spel.gefaald) {
            spel.nieuwSpel();
            spel.actief = true;
            spel.nieuwLevel();
        } else {
            spel.actief = true;
            if (spel.level == 0) {
                spel.nieuwLevel();
            }
        }
    }

}





