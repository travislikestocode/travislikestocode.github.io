var game = new Phaser.Game(1280, 720, Phaser.CANVAS);


var pokedex;
var bigPokemon;
var pokemonIndex;
var minPokemon = 0;
var maxPokemon = 600;
var maxSprite = 495;
var spriteFrame;
var shadow = true;
var guessMusic;
var revealMusic;
var whoText;
var revealText;
var loadText;
var clickLock = false;
var preloadComplete = false;

// Sprite groups
var uiSprites;
var gameSprites;

// Call each state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');
