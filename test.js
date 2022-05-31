let test;
let img;
let bgm;
let bg;
let ancho,alto;

//Elementos DOM
let canvas;
let titulo;
let nombres;
let viaje;
let visviaje;
let finviaje;
let viajerr;

function preload() {
    soundFormats('mp3');
    img = loadImage('media/SmashBall.png');
    img2 = loadImage('media/fel.png');
    img3 = loadImage('media/p5.png');
    img4 = loadImage('media/pas.png');
    img5 = loadImage('media/mgs2.png');
    img6 = loadImage('media/dan.png');
    img2 = loadImage('media/fel.png');
    img2 = loadImage('media/fel.png');
    img2 = loadImage('media/fel.png');
    img2 = loadImage('media/fel.png');
    img2 = loadImage('media/fel.png');
    tst = loadImage('media/tst.png');
    bg = loadImage('media/bg.jpg');
    bgm  = loadSound('media/Neco-Arc-sound-effect.mp3');
    
}

function setup() {
    ancho=windowWidth;
    alto=windowHeight;
    canvas = createCanvas(ancho, alto);
    canvas.position(0,0);
    background('tomato');

    //Elementos DOM
    
    titulo=createElement("h2","DSG4- The Data Structure of<br>                 Multiverse");
    titulo.position(ancho*0.013,alto*0.01);
    nombres=createElement("p","Santiago Reyes <br> Miguel Suárez <br> Nicolas Machado <br> Andrés Poveda");
    nombres.position(ancho*0.08,alto*0.1);
    viaje=createElement("h3","Viaje actual");
    viaje.position(ancho*0.01,alto*0.22);
    visviaje=createElement("p","");
    visviaje.position(ancho*0.01,alto*0.25);
    finviaje = createButton('Finalizar viaje');
    finviaje.position(ancho*0.137,alto*0.35);
    finviaje.mouseClicked(SimularEsc);
    viajerr=createElement("p","<i></i>");
    viajerr.position(ancho*0.13, alto*0.25);

    
    //Incializacion del multiverso 
    test = new Multiverso(6);
    test.CrearUniversoIndependiente("Super \n Smash Bros", { x: ancho / 2, y: alto / 2, r: 100, c: 'blue' ,img:img});
    test.CrearUniversoIndependiente("Playstation \n All Stars", { x: ancho / 1.3, y: alto / 3.5, r: 100, c: "blue", img:img4 });
    //main smash
    test.CrearUniversoDependiente([test.independientes[0], test.independientes[1]], "Metal Gear Solid", { x: ancho / 1.6, y: alto / 2.2, r: 70, c: "yellow",img:img5 });
    test.CrearUniversoDependiente([test.independientes[0]], "Persona 5", { x: ancho / 1.8, y: alto / 3.3, r: 70, c: "yellow",img:img3 });
    test.CrearUniversoDependiente([test.independientes[0]], "Sonic\nthe Hedgehog", { x: ancho / 2.4, y: alto / 3, r: 70, c: "yellow" });
    test.CrearUniversoDependiente([test.independientes[0]], "Super Mario", { x: ancho / 2.7, y: alto / 1.9, r: 70, c: "yellow" });
    test.CrearUniversoDependiente([test.independientes[0]], "Fire Emblem", { x: ancho / 2.2, y: alto / 1.4, r: 70, c: "yellow",img:img2 });
    test.CrearUniversoDependiente([test.independientes[0]], "The Legend\nof Zelda", { x: ancho / 1.7, y: alto / 1.5, r: 70, c: "yellow" });
    //Soul Calibur
    test.CrearUniversoDependiente([test.independientes[0].conexiones[5]], "Soul\nCalibur", { x: ancho / 1.5, y: alto / 1.3, r: 70, c: "green" });
    //DR - IDV
    test.CrearUniversoDependiente([test.independientes[0].conexiones[1]], "Identity V", { x: ancho / 1.6, y: alto / 5, r: 70, c: "green" });
    test.CrearUniversoDependiente([test.independientes[0].conexiones[1].conexiones[0]], "Danganronpa", { x: ancho / 1.8, y: alto / 13, r: 70, c: "green",img:img6 })
    //test.CrearConexion(test.independientes[0].conexiones[1],test.independientes[2].conexiones[0])

    test.CrearUniversoDependiente([test.independientes[0].conexiones[2]], "TF2", { x: ancho / 3, y: alto / 5.5, r: 70, c: "green" });
    test.CrearUniversoDependiente([test.independientes[0].conexiones[4]], "Monster\nHunter", { x: ancho / 2.5, y: alto / 1.1, r: 70, c: "green" });

    test.CrearUniversoDependiente([test.independientes[1]], "BioShock", { x: ancho / 1.2, y: alto / 2, r: 70, c: "yellow" });
    test.CrearUniversoDependiente([test.independientes[1].conexiones[1]], "Borderlands", { x: ancho / 1.3, y: alto / 1.5, r: 70, c: "green" });
    //test for an input
    //<input type='text' id='id1' />
    //document.getElementById('id1').value='text to be displayed' ; 
    //test.CrearUniversoDependiente([test.independientes[1]],555,{c:"green"});

}

function draw() {
    ancho = windowWidth; 
    largo = windowHeight;
    
    background(bg);
    push();
    stroke("magenta");
    strokeWeight(5);
    fill("tomato");
    rect(10,10,windowWidth*0.22,windowHeight-10); 
    pop();
    test.VerHover_Multiverso();
    test.Print("black",1,false);
    visviaje.html(test.viaje.Print());
    
}

function SimularEsc(){
    test.Keypressed_Multiverso(test, 27);
    bgm.play();
}

function mousePressed() {
    test.VerClicked_Multiverso(test);
    //image(img2,0, 0);
}
function keyPressed(){
    test.Keypressed_Multiverso(test,keyCode);
}
