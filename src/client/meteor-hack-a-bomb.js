// mods by Patrick OReilly
// Twitter: @pato_reilly Web: http://patricko.byethost9.com

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'hack-a-bomb', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {
  game.load.image('paddle', 'assets/sprites/paddle.png');
  game.load.image('meteor', 'assets/sprites/meteor.png');
}

var paddle;

function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.restitution = 0.9;

//  starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
//  starfield.fixedToCamera = true;

  meteor = game.add.sprite(game.world.randomX, game.world.randomY, 'meteor');
  game.physics.p2.enable(meteor, false);
  meteor.body.setRectangle(40, 40, 0, 0);

  paddle = game.add.sprite(400, 400, 'paddle');
  paddle.scale.set(0.25);
  paddle.smoothed = false;
  //ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
  //ship.play('fly');

  //  Create our physics body - a 28px radius circle. Set the 'false' parameter below to 'true' to enable debugging
  game.physics.p2.enable(paddle, false);

  paddle.body.setCircle(56);
  meteor.body.fixedRotation = true;

  //  Here we create a Body specific callback.
  //  Note that only impact events between the ship and the panda are used here, the sweet/candy object is ignored.
//  meteor.body.createBodyCallback(world, hitmeteor, this);
  meteor.events.onOutOfBounds.add(hitmeteor, this);


  //  And before this will happen, we need to turn on impact events for the world
  game.physics.p2.setImpactEvents(true);

  paddle.inputEnabled = true;
  paddle.input.enableDrag(true);
  paddle.body.immovable = true;

}

function hitmeteor(event){
  console.log('meteor hit',event);
  HackABomb.BombVectors.insert({
    'position':{
      x: 3,
      y:5
    },
    'motion':{
      x:3,
      y:3
    }
  });
}
function update() {
  //reset paddle velocety after collision
  paddle.body.setZeroVelocity();

  // is dragable workaround
  if (paddle.input.isDragged) {
    //BODY => follow pointer
    if (paddle.body !== null) {
      paddle.body.x = game.input.activePointer.worldX;
      paddle.body.y = game.input.activePointer.worldY;
    }
  }

  if (meteor.deltaX) {
    var ratio = meteor.deltaY / meteor.deltaX;
    meteor.angle = Math.atan(ratio) * 180 / Math.PI + (meteor.deltaX < 0 ? 180 : 0);
  }
}

function render() {

  //debug helper

}
