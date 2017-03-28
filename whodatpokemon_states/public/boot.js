var bootState = {

    preload: function() {
      game.load.json('pokedex', 'db/pokedex.json');
      game.load.spritesheet('snorlax', 'assets/snorlax.png', 80, 80);
    },

    create: function() {

      // Call the load state
      game.state.start('load');
    }

};
