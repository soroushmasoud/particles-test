// TITLE

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
initGraphics(750, 1334);

// Global vars
// Parallel arrays 
let gravity = 0.3 //gravity accel per frame
let particleXOrigin = 50
let particleYOrigin = 50
let xSpeed = 3
let ySpeed = 5
let xVals = [];
let yVals = [];
let rVals = [];
let xSpeedVals = [];
let ySpeedVals = [];
let trVals = [];
let bounces = [];

let pipeX = 100;
let pipeXSpeed = 5;
let pipeColor = "red"

let score = 0;
let timer = 600
let gameRunning = false;
let ended = false;

startGame();

function startGame() {
    // draw background
    drawBackground();

    // show instructions
    ctx.font = "30px Verdana";
    ctx.fillStyle = "rgb(222, 159, 76)";
    ctx.fillText("Left click to drop balls", 220, cnv.height - 400);

    ctx.font = "25px Verdana";
    ctx.fillText("Get as many into the cups as you can in 10 seconds", 75, cnv.height - 350);


    ctx.font = "50px Verdana";
    ctx.fillText("Click to start", 230, cnv.height - 250);

    document.addEventListener("touchstart", function () {
        if (gameRunning == false) {
            score = 0;
            popVars(0, xVals.length);
            timer = 600;
            gameRunning = true;
            draw();
        }
    });
}


// Main Program Loop

if (gameRunning == true) {
    requestAnimationFrame(draw);
}

function draw() {
    // draw background
    drawBackground();

    // score, balls left and timer update
    updateScore();

    // Draw loop
    for (let i = 0; i < xVals.length; i++) {
        // wall collision detection
        collision(i);

        // move and draw bubblwes
        updateBubbles(i);
    }

    if (xVals.length < 150) {
        if (mouseIsPressed) {
            pushVars(1, 0);
            pipeColor = "green"
        } else {
            pipeColor = "red"
        }
    } else {
        pipeColor = "red"
    }

    pipeX += pipeXSpeed;
    if (pipeX + 25 > cnv.width || pipeX - 25 < 0) {
        pipeXSpeed = -pipeXSpeed;
        xSpeed = -xSpeed;
    }

    drawPipe();

    particleXOrigin = pipeX;

    // Request another Animation Frame
    if (gameRunning == true) {
        requestAnimationFrame(draw);
    }

    // check timer and update timer
    if (timer > 0) {
        timer--;
    } else {
        endGame();
    }
}

function endGame() {

    gameRunning = false
    drawEndBackground();
}

// event stuff
function pushVars(particles, platN) {
    for (n = 0; n < particles; n++) {
        xVals.push(Math.randomDec(particleXOrigin - 1, particleXOrigin + 1));
        yVals.push(Math.randomDec(particleYOrigin, 70));
        rVals.push(Math.randomDec(8, 12));
        xSpeedVals.push(Math.randomDec(xSpeed - 0.3, xSpeed + 0.3));
        ySpeedVals.push(Math.randomDec(ySpeed - 1, ySpeed + 1));
        trVals.push(Math.randomDec(0.4, 1));
        bounces.push(0);
    }

    for (n = 0; n < platN; n++) {

        pxVals.push(Math.randomDec(0, cnv.width));
        pyVals.push(Math.randomDec(0, cnv.height));
        pwVals.push(Math.randomDec(50, 150));
        phVals.push(20);
        pxSpeedVals.push(Math.randomDec(-5, 5));
        pySpeedVals.push(Math.randomDec(-3, 3));
    }
}

function popVars(i, n) {
    xVals.splice(i, n);
    yVals.splice(i, n);
    rVals.splice(i, n);
    xSpeedVals.splice(i, n);
    ySpeedVals.splice(i, n);
    trVals.splice(i, n);
    bounces.splice(i, n);
}