function updateBubbles(i) {
    xVals[i] += xSpeedVals[i];
    yVals[i] += ySpeedVals[i];
    ySpeedVals[i] += gravity;
    rVals[i] *= 0.995;

    ctx.fillStyle = "rgba(102, 188, 220," + trVals[i] + ")";

    // circle particles
    ctx.fillCircle(xVals[i], yVals[i], rVals[i]);

}

function updateScore() {
    // show score
    ctx.font = "25px Verdana";
    ctx.fillStyle = "rgb(222, 159, 76)"
    ctx.fillText("Score: " + score, cnv.width - 145, cnv.height - 125);

    // show balls left
    ctx.font = "20px Verdana";
    ctx.fillText("Balls left: " + (150 - xVals.length), 10, cnv.height - 125);

    // show timer
    ctx.font = "120px Verdana";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.fillText(Math.round(timer / 60), cnv.width / 2 - 35, cnv.height / 2);
}

function drawPipe() {
    ctx.fillStyle = "rgb(222, 159, 76)"
    ctx.fillRect(pipeX - 20, 0, 40, 65)
    ctx.fillRect(pipeX - 25, 65, 50, 10)
    ctx.fillStyle = pipeColor;
    ctx.fillCircle(pipeX, 40, 6)

}

function collision(i) {
    // ball to ground / pipe
    if (yVals[i] + rVals[i] > cnv.height - 125 &&
        (xVals[i] + rVals[i] < 175 || xVals[i] > 225) &&
        (xVals[i] + rVals[i] < 375 || xVals[i] > 425) &&
        (xVals[i] + rVals[i] < 575 || xVals[i] > 625)
    ) {
        ySpeedVals[i] = -ySpeedVals[i] * 0.3;
    } else if (yVals[i] + rVals[i] > cnv.height) {
        ySpeedVals[i] = -ySpeedVals[i] * 0.3;
        bounces[i]++;

        if (bounces[i] < 2) {
            if (xVals[i] + rVals[i] > 175 && xVals[i] < 225) {
                // first pipe
                score += 2;
            } else if (xVals[i] + rVals[i] > 375 && xVals[i] < 425) {
                // second pipe 
                score += 3;
            } else if (xVals[i] + rVals[i] > 575 && xVals[i] < 625) {
                // third pipe
                score += 1;
            }
        }
    }

    // ball to edges of pipes
    if (ctx.pipeCollide(xVals[i], yVals[i], rVals[i])) {
        xSpeedVals[i] = -xSpeedVals[i] * 0.5;
    }

    // ball to walls
    if (yVals[i] - rVals[i] < 0) {
        yVals[i] = 0 + rVals[i];
    }
    if (xVals[i] + rVals[i] > cnv.width) {
        xVals[i] = cnv.width - rVals[i]
        xSpeedVals[i] = -xSpeedVals[i];
    }
    if (xVals[i] - rVals[i] < 0) {
        xSpeedVals[i] = -xSpeedVals[i];
        xVals[i] = 0 + rVals[i]
    }
}

function drawBackground() {
    // draw background (sky)
    ctx.fillStyle = "rgb(204, 233, 243)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // ground
    ctx.fillStyle = "rgb(252, 197, 117)";
    ctx.fillRect(0, cnv.height - 125, cnv.width, 125)

    // Draw cups
    ctx.fillStyle = "rgb(222, 159, 76)"

    ctx.fillRect(175, cnv.height - 125, 50, 125);
    ctx.fillRect(375, cnv.height - 125, 50, 125);
    ctx.fillRect(575, cnv.height - 125, 50, 125);

    // draw cup rims

    // silver
    ctx.fillStyle = "rgb(192, 192, 192)"
    ctx.fillRect(165, cnv.height - 225, 10, 225);
    ctx.fillRect(225, cnv.height - 225, 10, 225);

    // gold
    ctx.fillStyle = "rgb(225,200,0)"
    ctx.fillRect(365, cnv.height - 225, 10, 225);
    ctx.fillRect(425, cnv.height - 225, 10, 225);

    // bronze
    ctx.fillStyle = "rgb(205, 127, 50)"
    ctx.fillRect(565, cnv.height - 225, 10, 225);
    ctx.fillRect(625, cnv.height - 225, 10, 225);
}

function drawEndBackground() {
    // draw end screen background
    ctx.fillStyle = "rgb(204, 233, 243)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "rgb(252, 197, 117)";
    ctx.fillRect(0, cnv.height - 150, cnv.width, cnv.height - 150)

    // show score
    ctx.font = "50px Verdana";
    ctx.fillStyle = "rgb(222, 159, 76)";
    ctx.fillText("Score: " + score, 50, cnv.height - 225);

    // click to play again text
    ctx.font = "30px Verdana";
    ctx.fillStyle = "rgb(205, 127, 50)";
    ctx.fillText("Click to play again", 50, cnv.height - 150);

    // draw medal

    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.fillCircle(100, 250, 50);
    ctx.fillCircle(250, 250, 50);
    ctx.fillCircle(400, 250, 50);

    ctx.fillStyle = "rgb(225,200,0)";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255,255,255, 0.6)";

    if (score > 80) {
        ctx.fillCircle(100, 250, 50);
        ctx.strokeCircle(100, 250, 40);
        ctx.strokeRect(90, 225, 20, 40);
        ctx.fillRect(85, 220, 30, 15);
    }
    if (score > 120) {
        ctx.fillCircle(250, 250, 50);
        ctx.strokeCircle(250, 250, 40);
        ctx.strokeRect(240, 225, 20, 40);
        ctx.fillRect(235, 220, 30, 15);

    }
    if (score > 160) {
        ctx.fillCircle(400, 250, 50);
        ctx.strokeCircle(400, 250, 40);
        ctx.strokeRect(390, 225, 20, 40)
        ctx.fillRect(385, 220, 30, 15);

    }

}