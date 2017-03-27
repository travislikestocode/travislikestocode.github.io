var loadState = {

  preload: function() {

    // Random Pokemon
    pokemonIndex = generatePokemonIndex(minPokemon, maxPokemon);

    // Initialize the Pokedex
    pokedex = game.cache.getJSON('pokedex');

    game.load.image('bigPokemon', bigPokemonFilename());
    game.load.image('bg', 'assets/whodat.png');
    game.load.image('pokeball', 'assets/pokeball.png');
    game.load.image('starburst', 'assets/starburst.png');
    game.load.image('bigPokeballtop', 'assets/bigpokeballtop.png');
    game.load.image('bigPokeballBottom', 'assets/bigpokeballbottom.png');
    game.load.spritesheet('pokemonSprite', 'assets/pokemon.png', 80, 80);
    game.load.audio('guess', 'assets/guess1.mp3');
    game.load.audio('reveal', 'assets/reveal1.mp3');
    game.load.audio('pokeballSound', 'assets/pokeball.mp3');

  },

  create: function() {

    bigPokeball = game.add.sprite(640, 360, 'bigPokeball');
    bigPokeball.anchor.setTo(0.5, 0.5);
    bigPokeball.scale.setTo( 0.1, 0.1);

    pballSizeTween = game.add.tween(bigPokeball.scale).to({x: 1, y:1}, 1000, Phaser.Easing.Quartic.InOut);
    pballRotateTween = game.add.tween(bigPokeball).to({angle: 180}, 1000, Phaser.Easing.Quartic.InOut, true);
    pballSizeTween.start();
    //pballRotateTween.start();

    pballRotateTween.onComplete.add(startGame, this);
  }
};


function startGame() {
  game.state.start('play');
}
