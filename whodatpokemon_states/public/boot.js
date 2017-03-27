var bootState = {

    preload: function() {
      game.load.json('pokedex', 'db/pokedex.json');
      game.load.image('bigPokeball', 'assets/bigpokeball.png')
    },

    create: function() {

      // Call the load state
      game.state.start('load');
    }

};
