import _ from "lodash";

var canvas,
  ctx,
  canvasBg,
  ctxBg,
  width = 500,
  height = 720,
  enemyOne,
  enemyThree,
  enemyFour,
  enemyTotal = 3,
  enemies = [],
  enemy_x = 50 + Math.random() * 70,
  enemy_y = 0,
  enemy_w = 45,
  enemy_h = 45,
  speed = 3,
  userShip,
  alive = true,
  healthPoints = 3,
  laserTotal = 9,
  lasers = [],
  score = 0,
  rightKey = false,
  leftKey = false,
  upKey = false,
  downKey = false,
  ship_x = width / 2 - 25,
  ship_y = height - 75,
  ship_w = 50,
  ship_h = 50,
  paused = false,
  explosionImg,
  laserImg,
  enemyOneBulletImg,
  laserGreenRight,
  laserGreenLeft,
  bgImg,
  bloodImg,
  enemyOneBullets = [],
  enemyFourRightBullets = [],
  enemyFourLeftBullets = [],
  [frame, sx, sy] = [0, 0, 0],
  vx = 0,
  enterGame = false;


function setup() {
    for (var i = 0; i < enemyTotal; i++) {
        if (enemy_y != -45) 
        {enemy_y = - 54 - 3 * Math.floor(Math.random() * Math.floor(50))};

        enemies.push([
          enemy_x,
          enemy_y,
          enemy_w,
          enemy_h,
          speed,
          1
        ]);
        enemy_x += 150;
    }

    enemies.push([50, -250, 80, 80, speed = 4, 3]);
    enemies.push([width/2, -500, 50, 50, speed = 2, 4]);

}

function reset() {
    clearCanvas();
    enemies = [],
    enemy_x = 50 + Math.random() * 70,
    enemy_y = 0,
    enemy_w = 45,
    enemy_h = 45,
    speed = 3,
    alive = true,
    healthPoints = 3,
    score = 0,
    laserTotal = 9,
    lasers = [],
    ship_x = width / 2 - 25,
    ship_y = height - 75,
    ship_w = 50,
    ship_h = 50,
    paused = false,
    enemyOneBullets = [],
    enemyFourRightBullets = [],
    enemyFourLeftBullets = [],
    [frame, sx, sy] = [0, 0, 0],
    vx = 0;
    speed = 3;
    setup();
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

        ctx.drawImage(explosionImg, sx, sy, w, h, ship_x - 60, ship_y + 40 - h / 2, w, h);
    }
    
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i][5] === 1) {
            ctx.drawImage(enemyOne, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]); 
        }
        if (enemies[i][5] === 3) {
            ctx.drawImage(enemyThree, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]);
        }
        if (enemies[i][5] === 4) {
            ctx.drawImage(enemyFour, enemies[i][0], enemies[i][1], enemies[i][2], enemies[i][3]);
        }
    }
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
            if (enemies[i][1] < height) {
                enemies[i][1] += enemies[i][4];
                if (enemies[i][5] === 1) {
                    if (enemies[i][1] === 51 || enemies[i][1] === 210) {
                        enemyOneBullets.push([enemies[i][0] + 8, enemies[i][1]]);
                    }
                } else if (enemies[i][5] === 3) {
                    if (enemies[i][1] < 170 || enemies[i][1] > 490) {
                      enemies[i][0] = enemies[i][0] + 2;
                    }
                    if (enemies[i][1] > 170 && enemies[i][1] <= 490) {
                        enemies[i][0] = enemies[i][0] - 2; 
                    }
                } else if (enemies[i][5] === 4) {
                    if(enemies[i][1] % 5 === 0) {
                      enemyFourRightBullets.push([enemies[i][0] + 17, enemies[i][1] + 40]);
                      enemyFourLeftBullets.push([enemies[i][0], enemies[i][1] + 40]);
                    }
                } 
            } else if (enemies[i][1] > height - 1) {
                if (enemies[i][5] === 1) {
                  enemies[i][1] = -45;
                } else if (enemies[i][5] === 3) {
                  enemies[i][1] = -300; 
                  enemies[i][0] = 50; 
                } else if (enemies[i][5] === 4) {
                    enemies[i][1] = -300;
                    enemies[i][0] = width/2;
                }
            }

    }
}



function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
        ctx.drawImage(laserImg, lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
    }

  if (enemyOneBullets.length)
    for (var i = 0; i < enemyOneBullets.length; i++) {
        ctx.drawImage(enemyOneBulletImg, enemyOneBullets[i][0], enemyOneBullets[i][1], 30, 30);
    }

  if (enemyFourRightBullets.length)
    for (var i = 0; i < enemyFourRightBullets.length; i++) {
        ctx.drawImage(laserGreenRight, enemyFourRightBullets[i][0], enemyFourRightBullets[i][1], 30, 30);
        ctx.drawImage(laserGreenLeft, enemyFourLeftBullets[i][0], enemyFourLeftBullets[i][1], 30, 30);
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

    for (var i = 0; i < enemyFourRightBullets.length; i++) {
        if (enemyFourRightBullets[i][1] < height) {
            enemyFourRightBullets[i][1] += 5;
            enemyFourRightBullets[i][0] += 5;
            enemyFourLeftBullets[i][1] += 5;
            enemyFourLeftBullets[i][0] -= 5;
        } else if (enemyFourRightBullets[i][1] > height - 1) {
            enemyFourRightBullets.splice(i, 1);
            enemyFourLeftBullets.splice(i, 1);
        }
    }


}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvasBg = document.getElementById("canvasBg");
    ctxBg = canvasBg.getContext("2d");
    bgImg = new Image();
    bgImg.src = "./img/galaxy.png";
    userShip = new Image();
    userShip.src = './img/spaceship.png';
    enemyOne = new Image();
    enemyOne.src = './img/enemyOne.png';
    enemyFour = new Image();
    enemyFour.src = './img/enemyFour.png';
    enemyThree = new Image();
    enemyThree.src = './img/enemyThree.png';
    explosionImg = new Image();
    explosionImg.src = "./img/explosion.png";
    laserImg = new Image();
    laserImg.src = "./img/laser.png";
    enemyOneBulletImg = new Image();
    enemyOneBulletImg.src = "./img/enemyOneBullet.png";
    laserGreenRight = new Image();
    laserGreenRight.src = "./img/laserGreenRight.png";
    laserGreenLeft = new Image();
    laserGreenLeft.src = "./img/laserGreenLeft.png";
    bloodImg = new Image();
    bloodImg.src = "./img/bloodDrop.png";
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    setup();
    setInterval(gameLoop, 25);
}

function togglePause() {
    if (!paused) {
        paused = true;
    } else if (paused) {
        paused = false;
    }
}

function keyDown(e) {
  if (e.keyCode == 83) reset();
  if (e.keyCode == 32) togglePause();
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
                if (enemies[j][5] === 1) {
                    enemies.push([
                        (Math.random() * 450), 
                        -45, 
                        enemy_w, 
                        enemy_h, 
                        speed=3,
                        1
                ]); 
                } else if (enemies[j][5] === 3) {
                    enemies.push([50, -250, 80, 80, speed = 4,3]);  
                } else if (enemies[j][5] === 4) {
                    enemies.push([(Math.random() * 450), -300, 50, 50, speed = 2, 4]);
                }
                enemies.splice(j, 1);
                score += 10; 
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

    for (var i = 0; i < enemyFourLeftBullets.length; i++) {
        if(enemyFourLeftBullets[i][0] + 10 > ship_x && enemyFourLeftBullets[i][0] < ship_xw && enemyFourLeftBullets[i][1] > ship_y && enemyFourLeftBullets[i][1] < ship_yh) {
            alive = false;
        }
    }

    for (var i = 0; i < enemyFourRightBullets.length; i++) {
        if (enemyFourRightBullets[i][0] + 10 > ship_x && enemyFourRightBullets[i][0] < ship_xw && enemyFourRightBullets[i][1] > ship_y && enemyFourRightBullets[i][1] < ship_yh) {
          alive = false;
        }
    }

}



function drawBackground() {

    vx += 1;
    ctxBg.drawImage(bgImg, 0, vx, height, width);
    ctxBg.drawImage(bgImg, 0, vx - 500, height, width);

    if (vx >= 500) {
        vx = 0;
    }
}

function drawHealth() {
    var x = 5;
    for(var i = 0; i < healthPoints; i++) {
        ctx.drawImage(bloodImg, x, 5, 30, 30);
        x = x + 25;
    }
}

function scoreTotal() {
    ctx.fillStyle = "#fff";
    ctx.font = "15px Arial";
    ctx.fillText("Score: " + score, 400, 25);

    if (!alive) {
        healthPoints = healthPoints - 1;

        if (healthPoints > 0) {
            clearCanvas();
            ship_x = (width / 2) - 25, ship_y = height - 75, ship_w = 50, ship_h = 50;
            enemy_x = 50 + Math.random() * 70, enemy_y = -45, enemy_w = 45, enemy_h = 45;
            enemyOneBullets = [];
            lasers = [];
            enemies = [];
            setup();
            alive = true;
            frame = 0;
        }

        if (healthPoints <= 0 && frame >= 2.1) {
          clearCanvas();
          ctx.font = "bold 18px Arial";
          ctx.fillText("Game Over", 200, height / 2 - 10);
          ctx.fillText("Total Score " + score, 180, height / 2 + 15);
        }
    }
}


function gameLoop() {
    if(!paused) {
        clearCanvas();
        moveEnemies();
        moveLaser();
        shipCollision();
        drawEnemies();
        drawShip();
        drawLaser();
        hitTest();
        drawBackground();
        drawHealth();
        scoreTotal();
    } else {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Arial";
        ctx.fillText("Game Pause", 200, height / 2);
    }
}


document.addEventListener("keydown", gameBegin);


function gameBegin(e) {
  if (enterGame == false && e.keyCode == 13) {
    enterGame = true;
    init();
  }
  if (enterGame == true && e.keyCode == 27) {
    alive = false;
    healthPoints = 0;
  }
}

// window.onload = init;