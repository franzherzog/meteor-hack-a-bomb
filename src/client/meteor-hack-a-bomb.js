// mods by Patrick OReilly
// Twitter: @pato_reilly Web: http://patricko.byethost9.com

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'hack-a-bomb', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('paddle', 'assets/sprites/mars.png');
    game.load.image('bomb', 'assets/sprites/meteor.png');

}

var image, paddle, bomb, mouseBody;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    bomb = game.add.sprite(400, 200, 'bomb');
    game.physics.p2.enable(bomb, false);
    bomb.body.setRectangle(40, 40, 0, 0);

    paddle = game.add.sprite(200, 200, 'paddle');
    paddle.scale.set(0.25);

    game.physics.p2.enable(paddle, false);

    paddle.body.setCircle(67);
    paddle.body.fixedRotation = true;
    paddle.body.immovable = true;

    mouseBody = game.add.sprite(100, 100, 'mars', 0);
    game.physics.p2.enable(mouseBody, true);
    mouseBody.body.setCircle(100);
    mouseBody.body.immovable = true;
    mouseBody.body.fixedRotation = true;

    mouseCG = game.physics.p2.createCollisionGroup(); // just creating a group so the mousebody and the cow stop colliding
    mouseBody.body.setCollisionGroup(mouseCG);


    // paddle.body.createBodyCallback(bomb, hitBomb, this);
    //  And before this will happen, we need to turn on impact events for the world
    game.physics.p2.setImpactEvents(true);

}

function checkHit(){
    if (game.physics.p2.hitTest({x: game.input.x, y: game.input.y}).length != 0){
        var hitObjects = game.physics.p2.hitTest({x: game.input.x, y: game.input.y});
        if ((hitObjects.length == 1 && hitObjects[0].parent.sprite.key =="bomb") || (hitObjects.length == 2 && hitObjects[1].parent.sprite.key =="bomb")){return true;}
        else {return false; }
    }
}

//  Move the knocker with the arrow keys
function update () {

    mouseBody.body.setZeroVelocity();
    var constraintcount = 0;
    mouseBody.body.x = game.input.x;
    mouseBody.body.y = game.input.y;
    if (game.input.activePointer.isDown){
        if (checkHit() && constraintcount == 0){
            //   mouseConstraint = game.physics.p2.createRevoluteConstraint(cow.body, [0,0],mouseBody, [0,0], 10000) ;
            mouseConstraint = game.physics.p2.createSpring(paddle.body, mouseBody, 11,2000,100); //bodyA, bodyB, restLength, stiffness, damping, restLength, stiffness, damping, worldA, worldB, localA, localB
            constraintcount = 1;
        }
    }
    else{
        if (constraintcount == 1){
            springs = game.physics.p2.getSprings();
            game.physics.p2.removeSpring(springs);
            // game.physics.p2.removeConstraint(mouseConstraint);
        }
        constraintcount = 0;
    }

}

function render () {

    //debug helper
    game.debug.spriteInfo(paddle, 32, 32);

}
