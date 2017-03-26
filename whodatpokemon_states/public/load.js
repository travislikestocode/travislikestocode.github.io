var loadState = {

  preload: function() {

    // Random Pokemon
    pokemonIndex = generatePokemonIndex(0, 400);

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
    game.state.start('play');
  }
};

function generatePokemonIndex(min, max) {
  return Math.floor(Math.random() * (max - min));
}

function bigPokemonFilename() {
  return "db/img/" + pokedex[pokemonIndex].id + pokedex[pokemonIndex].ename + ".png";
}
