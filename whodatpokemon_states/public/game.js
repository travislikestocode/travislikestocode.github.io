var game = new Phaser.Game(1280, 720, Phaser.CANVAS);


var pokedex
var bigPokemon
var pokemonIndex
var spriteFrame
var shadow = true
var guessMusic
var revealMusic
var whoText
var revealText
var loadText

// Call each state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');
