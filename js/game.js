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
    create: create
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("player", "images/square.png");
  this.load.image("enemy", "images/enemy.png");
}

function create() {
  this.add.image(400, 300, "player");
}
