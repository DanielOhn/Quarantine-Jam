var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let state = "SPAWN";

let player;
let hp = 50;
let bullet;
let enemyNum = 0;
let enemies = [];

let input;
let mouse;
let worldBounds;

let mouseTouchDown = false;
let control = false;

var game = new Phaser.Game(config);

let white = 0xffffff;

let wave = 1;

function preload() {
  // this.load.image("player", "images/square.png");
  let texture;

  // player sprite
  this.graphics = this.add.graphics();
  this.graphics.lineStyle(4, white);
  this.graphics.strokeCircle(400, 300, 50);
  texture = this.graphics.generateTexture("player");
  player = this.physics.add.image(400, 300, "player");
  this.graphics.destroy();
  this.graphics = this.add.graphics();

  // bullet sprite
  this.graphics = this.add.graphics();
  this.graphics.fillStyle(white, 1);
  this.graphics.fillCircle(400, 300, 5);
  texture = this.graphics.generateTexture("bullet");
  bullet = this.add.sprite(400, 300, "bullet");
  this.graphics.destroy();

  // enemy sprite
  this.graphics = this.add.graphics();
  this.graphics.lineStyle(4, 0xff1e1a);
  this.graphics.strokeCircle(50, 50, 15);
  texture = this.graphics.generateTexture("enemy");
  // enemy = this.add.sprite(50, 50, "enemy");
  this.graphics.destroy();

  // health bar
  // this.graphics = this.add.graphics();
  // this.graphics.fillStyle(0x90ee90, 1);
  // this.graphics.fillCircle(400, 300, hp);
}

function create() {
  player.setCircle(50, 350, 250);

  // bullet = this.physics.add.sprite(400, 300, "bullet");
  // enemy = this.physics.add.sprite(200, 200, "enemy");

  input = this.input;
  mouse = input.mousePointer;

  player.x = 400;
  player.y = 300;

  worldBounds = this.physics.world.bounds;
}

function update() {
  if (state === "SPAWN") {
    for (let i = 0; i < wave * wave; i++) {
      let posX, posY;

      if (i % 4 === 0) {
        posX = -25;
        posY = Math.floor(Math.random() * 600);
      } else if (i % 4 === 1) {
        posX = Math.floor(Math.random() * 800);
        posY = -25;
      } else if (i % 4 === 2) {
        posX = 825;
        posY = Math.floor(Math.random() * 600);
      } else {
        posX = Math.floor(Math.random() * 800);
        posY = 625;
      }

      var enemy = this.physics.add.image(posX, posY, "enemy");
      enemy.setCircle(15, 35, 35);

      this.physics.moveToObject(enemy, player, 450);

      enemyNum++;
      enemies.push(enemy);
    }

    state = "PLAY";
  }

  if (state === "PLAY") {
    if (hp <= 0) {
      this.add.text(300, 200, "Game Over!");

      state = "GAMEOVER";
    }

    if (enemyNum === 0) {
      wave++;
      enemies = [];
      state = "SPAWN";
    }
  }

  if (game.input.activePointer.isDown) {
    if (!mouseTouchDown && control == false) {
      touchDown();
      control = true;
      bullet = this.physics.add.image(400, 300, "bullet");
      bullet.setCircle(5, 395, 295);
      this.physics.moveTo(bullet, input.x, input.y, 500);
    } else {
      if (mouseTouchDown) {
        touchUp();
      }
    }
  }

  if (
    bullet.x > worldBounds.width ||
    bullet.y > worldBounds.height ||
    bullet.x < 0 ||
    bullet.y < 0
  ) {
    control = false;
  }

  for (let eni of enemies) {
    this.physics.add.overlap(bullet, eni, destroy, null, this);
    this.physics.add.overlap(eni, player, takeHit, null, this);
  }
}

function touchDown() {
  mouseTouchDown = true;
}

function touchUp() {
  mouseTouchDown = false;
}

function destroy(bullet, enemy) {
  enemy.destroy();
  bullet.destroy();
  enemyNum--;

  control = false;
}

function takeHit(enemy, player) {
  enemy.destroy();
  hp -= 5;
  enemyNum--;
}
