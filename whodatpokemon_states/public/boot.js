var bootState = {

    preload: function() {
      game.load.json('pokedex', 'db/pokedex.json');
    },

    create: function() {

      // Load the PokeDex
      console.log('hi')

      // Call the load state
      game.state.start('load');
    }

};
