var playState = {

  preload: function() {

    pokemonIndex = generatePokemonIndex(0, 400);
    spriteFrame = pmonLookup(pokemonIndex);

    // Load assets
    game.load.image('bigPokemon', bigPokemonFilename());

    // Debug
    //var text = game.add.text(0, 0, bigPokemonFilename(), { fill: '#ffffff' });
    //var text = game.add.text(0, 30, pokemonIndex, { fill: '#ffffff' });

  },

  create: function() {

    // Init
    game.stage.backgroundColor = "#000000";
    shadow = true;

    // Music
    guessMusic = game.add.audio('guess');
    revealMusic = game.add.audio('reveal');
    guessMusic.play();

    // starburst
    starburst = game.add.sprite(380, 320, 'starburst');
    starburst.anchor.setTo(0.5, 0.5);
    starburst.scale.setTo(0, 0);
    starburst.alpha = 0.85;

    //PokeBall
    pokeball = game.add.sprite(0, 0, 'pokeball');
    pokeball.anchor.setTo(0.5, 0.5);
    pokeball.scale.setTo(5, 5);
    pokeball.angle = 190;

    // Pokemon Sprite
    pokemonSprite = game.add.sprite(1280, 720, 'pokemonSprite');
    pokemonSprite.anchor.set(1, 1);
    pokemonSprite.smoothed = false;
    pokemonSprite.frame = spriteFrame;
    pokemonSprite.animations.add('dance', [spriteFrame, (spriteFrame + 1)], 5, true);
    pokemonSprite.animations.play('dance');

    // Hidden with Shadow
    pokemonSprite.scale.setTo( 1, 1);
    pokemonSprite.tint = 0x000000;
    pokemonSprite.alpha = 1;

    // Big Pokemon Image
    bigPokemon = game.add.sprite(380, 320, 'bigPokemon');
    bigPokemon.anchor.set(0.5, 0.5);
    bigPokemon.smoothed = false;
    bigPokemon.scale.setTo( 0, 0);
    bigPokemon.tint = 0x000000;
    bigPokemon.frame = pmonLookup(pokemonIndex)
    bigPokemon.alpha = 0

    // Who's that Pokemon?
    whoText = game.add.text(750, 350, "Who's that \nPokemon?", { fill: '#000000', fontSize: 40 });
    whoText.anchor.set(0.5, 0.5);
    whoText.alpha = 0;

    // async tweens
    game.add.tween(pokeball).to( { x: 380, y: 200 }, 300, Phaser.Easing.Quartic.InOut, true);
    game.add.tween(pokeball).to( { angle: 45 }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(whoText).to({alpha:1}, 300, Phaser.Easing.Quartic.InOut, true);

    // sync tweens
    tweenA = game.add.tween(pokeball.scale).to( { x: .1, y: 0.1}, 200, Phaser.Easing.Quartic.InOut);
    tweenB = game.add.tween(pokeball).to({alpha:0}, 1,Phaser.Easing.None);
    tweenC = game.add.tween(bigPokemon).to({alpha:1}, 1,Phaser.Easing.None);
    tweenE = game.add.tween(bigPokemon.scale).to( { x: -.8, y: .8}, 150, Phaser.Easing.Quartic.InOut);
    tweenD = game.add.tween(starburst.scale).to( { x: .8, y: .8}, 700, Phaser.Easing.Quartic.InOut);


    tweenA.chain(tweenB);
    tweenB.chain(tweenC);
    tweenC.chain(tweenD);
    tweenD.chain(tweenE);
    //tweenE.chain(tweenF);
    tweenA.start();

    // Unhide
    game.input.onDown.add(mouseDown);

  },

  update: function() {
    starburst.angle += .1;
  }

}

function pmonLookup(num) {
  return num + num;
}

function generatePokemonIndex(min, max) {
  return Math.floor(Math.random() * (max - min));
}

function bigPokemonFilename() {
  return "db/img/" + pokedex[pokemonIndex].id + pokedex[pokemonIndex].ename + ".png";
}

function mouseDown() {

if ( shadow ) {
    bigPokemon.tint = 0xffffff;
    pokemonSprite.tint = 0xffffff;
    whoText.alpha = 0;
    revealText = game.add.text(750, 350, "It's " + pokedex[pokemonIndex].ename + "!", { fill: '#ffffff', fontSize: 40 });
    revealText.anchor.set(0.5, 0.5);
    shadow = false;
    guessMusic.stop();
    revealMusic.play();

  } else {
      //window.location.reload()
      revealMusic.stop();
      game.state.start('play');
  }

}
