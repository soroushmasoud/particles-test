// graphics context library to extend html canvas drawing capabilities



// INIT GRAPHICS - INITIALIZE CANVAS AND DRAW FUNCTIONS
function initGraphics(initWidth, initHeight) {
    cnv.width = initWidth;
    cnv.height = initHeight;

    ctx.line = function (x1, y1, x2, y2) { //draw line from x1,y1 to x2,y2
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.strokeTriangle = function (x1, y1, x2, y2, x3, y3) {
        // draw outlined triangle with vertices (x1, y1) (x2, y2) (x3, y3)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath(); // Go back to start of path
        ctx.stroke(); // Draw outline
    }

    ctx.fillTriangle = function (x1, y1, x2, y2, x3, y3) {
        // draw filled triangle with vertices (x1, y1) (x2, y2) (x3, y3)
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill(); // Fill Triangle
    }

    ctx.strokeQuad = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.stroke(); // Draw outline
    }

    ctx.fillQuad = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.fill(); // Fill in path
    }

    ctx.strokeCircle = function (x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI); // Center (x, y) & radius of r
        ctx.stroke();
    }

    ctx.fillCircle = function (x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI); // Center (x, y) & radius of r
        ctx.fill();
    }


    // graphics library extensions

    // distance between two points
    ctx.dist = function (x1, y1, x2, y2) {
        let dSqr = Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) // find d^2
        return d = Math.sqrt(dSqr); //return square root of d^2
    }

    // return true if mouse is inside of circle
    ctx.mouseInCircle = function (circle) {
        if (ctx.dist(mouseX, mouseY, circle.x, circle.y) < circle.r) {
            return mouseInCircle = true;
        } else {
            return mouseInCircle = false;
        }
    }

    // return true if mouse is inside of rect
    ctx.mouseInRect = function (rect) {
        if ((rect.x - rect.w <= mouseX && rect.x + rect.w >= mouseX) &&
            (rect.y <= mouseY && rect.y + rect.h >= mouseY)) {
            return mouseInRect = true;
        } else {
            return mouseInRect = false;

        }
    }

    ctx.circleCollide = function (circle1, circle2) {
        if (ctx.dist(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.r + circle2.r) {
            return circleCollide = true;
        } else {
            return circleCollide = false;
        }
    }

    ctx.rectCollide = function (rect1, rect2) {
        if ((rect1.x <= rect2.x + rect2.w && rect1.x + rect1.w >= rect2.x) && (
                rect1.y + rect1.h >= rect2.y && rect1.y <= rect2.y + rect2.h)) {
            return rectCollide = true;
        } else {
            return rectCollide = false;
        }
    }

    ctx.pipeCollide = function (circleX, circleY, circleR) {
        if (
            ((circleX + circleR > 165 &&
                    circleX - circleR < 175 ||
                    circleX + circleR > 225 &&
                    circleX - circleR < 235) ||

                (circleX + circleR > 365 &&
                    circleX - circleR < 375 ||
                    circleX + circleR > 425 &&
                    circleX - circleR < 435) ||

                (circleX + circleR > 565 &&
                    circleX - circleR < 575 ||
                    circleX + circleR > 625 &&
                    circleX - circleR < 635)) &&
            circleY + circleR > cnv.height - 225
        ) {
            return true;
        }
    }

    // ctx.fillStyle = "rgb(192, 192, 192)"
    // ctx.fillRect(165, cnv.height - 225, 10, 225);
    // ctx.fillRect(225, cnv.height - 225, 10, 225);


    // ctx.fillStyle = "rgb(225,200,0)"
    // ctx.fillRect(365, cnv.height - 225, 10, 225);
    // ctx.fillRect(425, cnv.height - 225, 10, 225);

    // ctx.fillStyle = "rgb(205, 127, 50)"
    // ctx.fillRect(565, cnv.height - 225, 10, 225);
    // ctx.fillRect(625, cnv.height - 225, 10, 225);
}

// MOUSE STUFF

// global vars
let mouseIsPressed = false;
let mouseX, mouseY, pmouseX, pmouseY;


// event listeners
document.addEventListener("touchstart", function () {
    mouseIsPressed = true
});
document.addEventListener("touchend", function () {
    mouseIsPressed = false
});
document.addEventListener("mousemove", mousemoveHander);

function mousemoveHander(event) {
    // Save previous mouseX and mouseY
    pmouseX = mouseX;
    pmouseY = mouseY;

    // Update mouseX and mouseY
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
}