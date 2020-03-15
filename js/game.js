var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;
let hp = 45;
let bullet;

let input;
let mouse;
let worldBounds;

let mouseTouchDown = false;
let playerPos = { x: 400, y: 300 };

let control = false;

var game = new Phaser.Game(config);

let white = 0xffffff;

function preload() {
  // this.load.image("player", "images/square.png");
  let texture;

  this.graphics = this.add.graphics();

  this.graphics.lineStyle(4, white);
  this.graphics.strokeCircle(400, 300, 50);

  texture = this.graphics.generateTexture("player");

  this.graphics.destroy();

  this.graphics = this.add.graphics();
  player = this.add.sprite(400, 300, "player");

  this.graphics = this.add.graphics();
  this.graphics.fillStyle(white, 1);
  this.graphics.fillCircle(400, 300, 5);
  texture = this.graphics.generateTexture("bullet");
  bullet = this.add.sprite(400, 300, "bullet");

  this.graphics.destroy();

  this.graphics = this.add.graphics();
  this.graphics.fillStyle(0x90ee90, 1);
  this.graphics.fillCircle(400, 300, hp);
}

function create() {
  bullet = this.physics.add.sprite(400, 300, "bullet");

  input = this.input;
  mouse = input.mousePointer;

  worldBounds = this.physics.world.bounds;
}

function update() {
  if (game.input.activePointer.isDown) {
    if (!mouseTouchDown && control == false) {
      touchDown();
      control = true;
      bullet = this.physics.add.sprite(400, 300, "bullet");
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
    bullet < 0
  ) {
    control = false;
  }

  // this.physics.add.overlap(bullet, enemy, destroy, null, this);
}

function touchDown() {
  mouseTouchDown = true;
}

function touchUp() {
  mouseTouchDown = false;
}

function destroy(bullet, enemy) {
  enemy.disableBody(true, true);
  bullet.disableBody(true, true);

  control = false;
}
