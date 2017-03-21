var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/whodat.png');
    game.load.image('pokeball', 'assets/pokeball.png');
    game.load.spritesheet('pokemon', 'assets/pokemon.png', 80, 80);

}

var pokeball
var pokemon

var minFrame = 1
var maxFrame = 990;

function create() {

        game.add.sprite(0, 0, 'bg');

        //pokeball = game.add.sprite(0, 0, 'pokeball');

        // Pokemon Character
        pokemon = game.add.sprite(380, 380, 'pokemon');
        pokemon.anchor.set(0.5);
        pokemon.smoothed = false;
        pokemon.scale.setTo( -5, 5);
        pokemon.tint = 0x000000;


        // Random frame in range
        frame1 = Math.floor(Math.random() * (maxFrame - minFrame + 1)) + minFrame;

        // Make it odd
        if(frame1 %2 == 0){//generated number is even
               if(frame1 == maxFrame){
                 frame1-- ;
               }else{
                 frame1++ ;
               }
            }

        // Account for zero
        frame1--;

        // second frame
        frame2 = frame1 + 1;

        //pokemon.animations.add('dance', [frame1, frame2], 5, true);
        //pokemon.animations.play('dance');
        pokemon.frame = frame1;

        // Unhide
        game.input.onDown.add(changeTint, this);
}

function changeTint() {

    pokemon.tint = 0xffffff;

}

function update() {

  // Animate


}
