var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
//-------------------------------

// load images

var player = new Image();
var enemy = new Image();
var bullet = new Image();
var arrowImg = new Image();

player.src = "images/player.png";
enemy.src = "images/enemy.png";
arrowImg.src = "images/fire.png";
//-------------------------------

// vars
var score = 0;
var pause = 0;

var playerY = 300;
var playerX = 100;

var speed = 0;
var bulletSpeed = 7;
var bulletX = playerX + player.width;
var bulletY = playerY + (player.height / 2 - bullet.height / 2);
var rateOfFire = 5;
var shootCoolDown = 0;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var firePressed = false;
var haha = false;

// audio
var fire = new Audio();
var hit = new Audio();

fire.src = "sounds/fire.mp3";
hit.src = "sounds/hit.mp3";



// time until next shot
var d = 100;

function myTimer() {
    d++;
}





//-------------------------------
// on key down
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if (e.keyCode == 87) {
        upPressed = true;
    }
    if (e.keyCode == 83) {
        downPressed = true;
    }
    if (e.keyCode == 65) {
        leftPressed = true;
    }
    if (e.keyCode == 68) {
        rightPressed = true;
    }
    if (e.keyCode == 32) {
        firePressed = true;
        haha = true;
    }
}

// on key up
document.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {
    if (e.keyCode == 87) {
        upPressed = false;
    }
    if (e.keyCode == 83) {
        downPressed = false;
    }
    if (e.keyCode == 65) {
        leftPressed = false;
    }
    if (e.keyCode == 68) {
        rightPressed = false;
    }
    if (e.keyCode == 32) {
        firePressed = false;
    }
}



//-------------------------------



function moveUp() {
    if (playerY <= canvas.height - canvas.height + 15) {} else {
        playerY -= 6;
    }
}

function moveDown() {
    if (playerY >= canvas.height - player.height - 15) {} else {
        playerY += 6;
    }
}

function moveLeft() {
    if (playerX <= canvas.width - canvas.width) {} else {
        playerX -= 6;
    }
}

function moveRight() {
    if (playerX >= canvas.width - player.width) {} else {
        playerX += 6;
    }
}

//-------------------------------
// Enemy coordinates

var enemies = [];

enemies[0] = {
    x: cvs.width,
    y: 0
};



var arrows = [];

// declare this array in a scope that persists (e.g. global scope or in a closure)


if (haha === true) {
    arrows[0] = {
        x: playerX + player.width,
        y: playerY + ((player.height / 2) - (arrowImg.height / 2))
    };
}

//-------------------------------
//create enemies
function updateEnemies() {
    for (var i = 0; i < enemies.length; i++) {

        //draw the enemy
        ctx.drawImage(enemy, enemies[i].x, enemies[i].y);

        // enemy movement speed
        enemies[i].x -= 3;

        if (enemies[i].x == 880) {
            enemies.push({
                x: cvs.width,
                y: Math.floor(Math.random() * enemy.height) * 10 - enemy.height
            });
        }
        if (enemies[i] == 'undefined') {
            enemies.push({
                x: cvs.width,
                y: Math.floor(Math.random() * enemy.height) * 10 - enemy.height
            });
        }


        // remove enemy if it reaches the end of the canvas
        if (enemies[i].x < -200) {
            enemies.splice(i, 1);
        }

        // detect collision
        // if enemy hits player
        if (playerX + player.width >= enemies[i].x && playerX <= enemies[i].x + enemy.width && (playerY <= enemies[i].y + enemy.height && playerY + player.height >= enemies[i].y)) {
            pause = 1;
        }

        // START SHOOTING BULLETS //++++++++++++++++++++++ +++++ ++++++
        for (var a = 0; a < arrows.length; a++) {

            //draw the bullet
            if (haha === true) {
                if (arrows[a].x > canvas.width - canvas.width && arrows[a].x < canvas.width) {
                    ctx.drawImage(arrowImg, arrows[a].x, arrows[a].y);
                }
            }

            // bullet movement speed
            arrows[a].x += bulletSpeed;

            //check collision with bullets and arrows
            if (arrows[a].x >= enemies[i].x && arrows[a].x <= enemies[i].x + enemy.width && arrows[a].y >= enemies[i].y && arrows[a].y <= enemies[i].y + enemy.width) {
                enemies.splice(i, 1);
                arrows.splice(a, 1);
                score++;
            }

            // remove bullet if it reaches the end of the canvas
            else if (arrows[a].x > canvas.width) {
                arrows.splice(a, 1);
            }
        }

    }
}

function reLoad() {
    location.reload();
}


function arrow() {
    this.x = playerX + player.width;
    this.y = playerY + ((player.height / 2) - (bullet.height / 2));

    this.init = function() {
        var arrowImg = new Image();
        arrowImg.src = "images/fire.png";
        ctx.drawImage(arrowImg, this.x, this.y);

        // this.x+=bulletSpeed;

    }
}




//-------------------------------
// draw images

function draw() {

    // Count time before next shot
    myTimer();


    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (upPressed === true) {
        moveUp();
    }
    if (downPressed === true) {
        moveDown();
    }
    if (leftPressed === true) {
        moveLeft();
    }
    if (rightPressed === true) {
        moveRight();
    }

    if (firePressed === true) {
        // create new arrow, initialize it and store it in the array of arrows

        if (d > 30) {
            var newArrow = new arrow();
            newArrow.init(ctx);
            arrows.push(newArrow);
            d = 0;
        }
    }

    //-------------------------------
    //draw enemies
    updateEnemies();

    //draw the player
    ctx.drawImage(player, playerX, playerY);




    //draw score
    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Destroyed ships : " + score + "$", 10, cvs.height - 20);


    function onPause() {
        if (pause >= 1) {
            hit.play();
            ctx.fillStyle = "#df8a62";
            ctx.fillRect(150, 150, 280, 100);

            ctx.fillStyle = "#000";
            ctx.font = "20px Verdana";
            ctx.fillText("You died:", 165, 170);

            document.addEventListener("keydown", reLoad);
        } else if (pause <= 0) {
            requestAnimationFrame(draw);
        }
    }

    onPause();

}

draw();