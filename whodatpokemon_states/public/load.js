var loadState = {

  preload: function() {
    console.log("loading");
    game.load.json('pokedex', 'db/pokedex.json');
    game.load.image('bg', 'assets/whodat.png');
    game.load.image('pokeball', 'assets/pokeball.png');
    game.load.image('starburst', 'assets/starburst.png');
    game.load.spritesheet('pokemonSprite', 'assets/pokemon.png', 80, 80);
    game.load.audio('guess', 'assets/guess1.mp3');
    game.load.audio('reveal', 'assets/reveal1.mp3');

  },

  create: function() {

    pokedex = game.cache.getJSON('pokedex');
    game.state.start('play');

  }

};
