import _ from "lodash";

var canvas,
    ctx,
    canvasBg,
    ctxBg,
    width = 500,
    height = 720,
    enemyOne,
    enemyTwo,
    enemyTotal = 4,
    enemies = [],
    enemy_x = 50, enemy_y = -45, enemy_w = 45, enemy_h = 45,
    speed = 3,
    userShip,
    alive = true,
    healthPoints = 3,
    laserTotal = 9,
    lasers = [],
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 50;

function setup() {
    for (var i = 0; i < enemyTotal; i++) {
        enemies.push([
          Math.random() * 450,
          -45,
          enemy_w,
          enemy_h,
          speed,
          1
        ]);
    }

    enemies.push([50, -250, 80, 80, speed = 4, 2]);
}


function clearCanvas() {
    ctx.clearRect(0,0,width,height);
}

var explosion = new Image();
explosion.src = "../img/explosion.png";
var [frame, sx, sy] = [0, 0, 0];

function drawShip() {
    if (rightKey) ship_x += 6;
    else if (leftKey) ship_x -= 6;
    if (upKey) ship_y -= 6;
    else if (downKey) ship_y += 6;
    if (ship_x <= 0) ship_x = 0;
    if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
    if (ship_y <= 0) ship_y = 0;
    if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
    if (alive) {
        ctx.drawImage(userShip, ship_x, ship_y, 60, 60);
    } else {
        var w = 180;
        var h = 180;
        if (frame === 0) {
            sx = 0;
        } else if (frame <= 0.3) {
            sx = 192;
        } else if (frame <= 0.6) {
            sx = 384;
        } else if (frame <= 0.9) {
            sx = 576;
        } else if (frame <= 1.2) {
            sx = 768;
        } else if (frame <= 1.5) {
            sx = 960;
        } else if (frame <= 1.8) {
            sx = 0;
            sy = 192;
        } else if (frame <= 2.1) {
            sx = 192;
            sy = 192;
        }else {
            w = 0;
            h = 0;
        }
        frame += 0.2;

        ctx.drawImage(explosion, sx, sy, w, h, ship_x-60, ship_y+40 - (h / 2), w, h);
    }
    
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i][5] === 1) {
            ctx.drawImage(enemyOne, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]); 
        }
        if (enemies[i][5] === 2) {
            ctx.drawImage(enemyTwo, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]);
        }
    }
}

var enemyOneBullets = [];
function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
            if (enemies[i][1] < height) {
                enemies[i][1] += enemies[i][4];
                if (enemies[i][5] === 1) {
                    if (enemies[i][1] === 51) {
                        enemyOneBullets.push([enemies[i][0] + 8, enemies[i][1]]);
                    }
                    if (enemies[i][1] === 210) {
                        enemyOneBullets.push([enemies[i][0] + 8, enemies[i][1]]);
                    }
                } else if (enemies[i][5] === 2) {
                    if (enemies[i][1] < 170) {
                      enemies[i][0] = enemies[i][0] + 2;
                    }
                    if (enemies[i][1] > 170) {
                        enemies[i][0] = enemies[i][0] - 2; 
                    }
                } 
            } else if (enemies[i][1] > height - 1) {
                if (enemies[i][5] === 1) {
                  enemies[i][1] = -45;
                } else if (enemies[i][5] === 2) {
                  enemies[i][1] = -300; 
                  enemies[i][0] = 50; 
                }
            }
        

    }
}

var laser = new Image();
laser.src = "../img/laser.png";
var enemyOneBullet = new Image();
enemyOneBullet.src = "../img/enemyOneBullet.png";

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
        ctx.drawImage(laser, lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
    }

  if (enemyOneBullets.length)
    for (var i = 0; i < enemyOneBullets.length; i++) {
        ctx.drawImage(enemyOneBullet, enemyOneBullets[i][0], enemyOneBullets[i][1], 30, 30);
    }

}

function moveLaser() {
    for (var i = 0; i < lasers.length; i++) {
        if (lasers[i][1] > -11) {
            lasers[i][1] -= 10;
        } else if (lasers[i][1] < -10) {
            lasers.splice(i, 1);
        }
    }

    for (var i = 0; i < enemyOneBullets.length; i++) {
        if (enemyOneBullets[i][1] < height) {
            enemyOneBullets[i][1] += 5;
        } else if (enemyOneBullets[i][1] > height - 1) {
            enemyOneBullets.splice(i, 1);
        }
    }

}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvasBg = document.getElementById("canvasBg");
    ctxBg = canvasBg.getContext("2d");
    userShip = new Image();
    userShip.src = '../img/spaceship.png'; 
    enemyOne = new Image();
    enemyOne.src = '../img/enemyOne.png';
    enemyTwo = new Image();
    enemyTwo.src = '../img/enemyThree.png'
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    setup();
    setInterval(gameLoop, 25);
}

function keyDown(e) {
  if (e.keyCode == 39) rightKey = true;
  else if (e.keyCode == 37) leftKey = true;
  if (e.keyCode == 38) upKey = true;
  else if (e.keyCode == 40) downKey = true;
  if (e.keyCode == 88 && lasers.length <= laserTotal) lasers.push([ship_x + 25, ship_y - 20, 10, 28]);
}

function keyUp(e) {
  if (e.keyCode == 39) rightKey = false;
  else if (e.keyCode == 37) leftKey = false;
  if (e.keyCode == 38) upKey = false;
  else if (e.keyCode == 40) downKey = false;
}


function hitTest() {
    var remove = false;
    for (var i = 0; i < lasers.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) 
            && lasers[i][0] >= enemies[j][0] 
            && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
                remove = true;
                enemies.splice(j, 1);
                enemies.push([
                    (Math.random() * 450), 
                    -45, 
                    enemy_w, 
                    enemy_h, 
                    speed=3,
                    1
                ]);
            }
        }
        if (remove == true) {
            lasers.splice(i, 1);
            remove = false;
        }
    }
}

function shipCollision() {
    var ship_xw = ship_x  + ship_w,
        ship_yh = ship_y  + ship_h;
    for (var i = 0; i < enemies.length; i++) {
        if (ship_x  > enemies[i][0] && ship_x  < enemies[i][0] + enemy_w && ship_y  > enemies[i][1] && ship_y  < enemies[i][1] + enemy_h ) {
          alive = false;
        }
        if (ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0] && ship_y  > enemies[i][1] && ship_y  < enemies[i][1] + enemy_h ) {
          alive = false;
        } 
        if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_x  > enemies[i][0] && ship_x  < enemies[i][0] + enemy_w ) {
          alive = false;
        }
        if (ship_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h && ship_xw < enemies[i][0] + enemy_w && ship_xw > enemies[i][0]) {
          alive = false;
        }
    }

    for (var i = 0; i < enemyOneBullets.length; i++) {
        if (enemyOneBullets[i][0] + 25 > ship_x && enemyOneBullets[i][0] < ship_xw && enemyOneBullets[i][1] > ship_y && enemyOneBullets[i][1] < ship_yh) {
            alive = false;
        }
        
    }
}

var vx = 0;
var bgImg = new Image();
bgImg.src = "../img/galaxy.png";

function drawBackground() {

    vx += 1;
    ctxBg.drawImage(bgImg, 0, vx, height, width);
    ctxBg.drawImage(bgImg, 0, vx - 500, height, width);

    if (vx >= 500) {
        vx = 0;
    }
}

function scoreTotal() {

    if (!alive) {
        healthPoints = healthPoints - 1;

        if (healthPoints > 0) {
            clearCanvas();
            ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 50;
            enemy_x = 50, enemy_y = -45, enemy_w = 45, enemy_h = 45;
            enemyOneBullets = [];
            lasers = [];
            enemies = [];
            setup();
            alive = true;
            frame = 0;
        }

        if (healthPoints <= 0 && frame >= 2.1) {
          clearCanvas();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 18px Arial";
          ctx.fillText("Game Over", 200, height / 2);
        }
    }
}


function gameLoop() {
    clearCanvas();
    moveEnemies();
    moveLaser();
    shipCollision();
    drawEnemies();
    drawShip();
    drawLaser();
    hitTest();
    drawBackground();
    scoreTotal();
}

window.onload = init;