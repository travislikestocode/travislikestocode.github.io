var loadState = {

  preload: function() {

    // Loading message
    preloadText = game.add.text(630, 500, "Loading...", { fill: '#ffffff', fontSize: 20 });

    // Random Pokemon
    pokemonIndex = generatePokemonIndex(minPokemon, maxPokemon);
    spriteFrame = pmonLookup(pokemonIndex);

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

    // Load hooks
    game.load.onFileComplete.add(preloadFileComplete, this);
    game.load.onLoadComplete.add(preloadCompleted, this);

  },

  create: function() {

  game.stage.backgroundColor = "#000000";

}

};

function preloadFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

    if (!preloadComplete) {
      loadSprite = game.add.sprite(560, 280, 'snorlax');
      loadSprite.animations.add('dance', [0, 1], 5, true);
      loadSprite.smoothed = false;
      loadSprite.scale.setTo(3, 3);
      //loadSprite.animations.play('dance');
      loadSprite.frame = 0

      cropRect = new Phaser.Rectangle(0, 0, progress, loadSprite.height);
      console.log(cropRect);
      loadSprite.crop(cropRect);
    }

}

function preloadCompleted() {

    if (!preloadComplete) {
      console.log("preload done");
      preloadComplete = true
      game.state.start('play');
    }

}
