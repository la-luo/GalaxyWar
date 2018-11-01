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
    enemy_x = 50, enemy_y = -45, enemy_w = 50, enemy_h = 50,
    speed = 3,
    userShip,
    laserTotal = 9,
    lasers = [],
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 50;


for (var i = 0; i < enemyTotal; i++) {
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
    enemy_x += enemy_w + 60;
}

function clearCanvas() {
    ctx.clearRect(0,0,width,height);
}

function drawShip() {
    if (rightKey) ship_x += 6;
    else if (leftKey) ship_x -= 6;
    if (upKey) ship_y -= 6;
    else if (downKey) ship_y += 6;
    if (ship_x <= 0) ship_x = 0;
    if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
    if (ship_y <= 0) ship_y = 0;
    if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
    ctx.drawImage(userShip, ship_x, ship_y, 60, 60);
}

var enemyOneBullet = new Image();
enemyOneBullet.src = "../css/enemyOneBullet.png";

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemyOne, enemies[i][0], enemies[i][1], 50, 50);   
    }
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i][1] < height) {
            enemies[i][1] += enemies[i][4];
        } else if (enemies[i][1] > height - 1) {
            enemies[i][1] = -45;
        }
    }
}

var laser = new Image();
laser.src = "../css/laser.png";

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
        ctx.drawImage(laser, lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
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
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvasBg = document.getElementById("canvasBg");
    ctxBg = canvasBg.getContext("2d");
    userShip = new Image();
    userShip.src = 'spaceship.png'; 
    enemyOne = new Image();
    enemyOne.src = 'enemyOne.png';
    setInterval(gameLoop, 25);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

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


var explosionImg = new Image();
explosionImg.src = "../css/explosion.png";

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
                    (Math.random() * 500) + 50, 
                    -45, 
                    enemy_w, 
                    enemy_h, 
                    speed
                ]);
            }
        }
        if (remove == true) {
            lasers.splice(i, 1);
            remove = false;
        }
    }
}

var vx = 0;
var bgImg = new Image();
bgImg.src = "../css/galaxy.png";

function drawBackground() {

    vx += 1;
    ctxBg.drawImage(bgImg, 0, vx, height, width);
    ctxBg.drawImage(bgImg, 0, vx - 500, height, width);

    if (vx >= 500) {
        vx = 0;
    }
}


function gameLoop() {
    clearCanvas();
    hitTest();
    moveEnemies();
    moveLaser();
    drawEnemies();
    drawShip();
    drawLaser();
    drawBackground();
}

window.onload = init;