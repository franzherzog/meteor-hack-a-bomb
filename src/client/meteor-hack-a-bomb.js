// counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

// mods by Patrick OReilly
// Twitter: @pato_reilly Web: http://patricko.byethost9.com

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'hack-a-bomb', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('paddle', 'assets/sprites/paddle.png');
    game.load.image('puck', 'assets/sprites/puck.png');
    game.load.image('bomb', 'assets/sprites/bomb.png');

}

var image;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    bomb = game.add.sprite(400, 200, 'bomb');

    paddle = game.add.sprite(400, 200, 'paddle');

    game.physics.enable([paddle,bomb], Phaser.Physics.ARCADE);

    paddle.body.immovable = true;

      //  Input Enable the sprites
    	paddle.inputEnabled = true;

    //  Allow dragging
    //  enableDrag parameters = (lockCenter, bringToTop, pixelPerfect, alphaThreshold, boundsRect, boundsSprite)
    paddle.input.enableDrag();


    //  This gets it moving
    bomb.body.velocity.setTo(200, 200);

    //  This makes the game world bounce-able
    bomb.body.collideWorldBounds = true;

    //  This sets the image bounce energy for the horizontal
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    bomb.body.bounce.setTo(1, 1);


}

//  Move the knocker with the arrow keys
function update () {

    //  Enable physics between the knocker and the ball
    game.physics.arcade.collide(paddle, bomb);

}

function render () {

    //debug helper
    game.debug.spriteInfo(bomb, 32, 32);

}
