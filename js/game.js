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
    update: update,
  }
};

let hp = 45;
let bullet;

let input;
let mouse;
let worldBounds;

let mouseTouchDown = false;
let playerPos = { x: 400, y: 300 };

let control = false;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("player", "images/square.png");

  this.graphics = this.add.graphics();

  this.graphics.lineStyle(4, 0xffffff);
  this.graphics.strokeCircle(400, 300, 50);

  this.graphics.fillStyle(0x90ee90, 1);
}

function create() {

  this.graphics.fillCircle(400, 300, hp);

  bullet = this.physics.add.sprite(400, 300, 'player');

  input = this.input;
  mouse = input.mousePointer;
  
  worldBounds = this.physics.world.bounds;

}

function update() {
  if (game.input.activePointer.isDown) {
    if (!mouseTouchDown) {
      touchDown();
      control = true;
      bullet = this.physics.add.sprite(400, 300, 'player');
      this.physics.moveTo(bullet, input.x, input.y, 500);
    } else {
      if (mouseTouchDown) {
        touchUp();
      }
    }
  }

  if (bullet.x > worldBounds.width || bullet.y > worldBounds.height || bullet.x < 0  || bullet < 0) {
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