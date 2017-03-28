var playState = {

  preload: function() {

    // Sprite groups for ordering
    gameSprites = game.add.group();
    uiSprites = game.add.group();

  },

  create: function() {

    // Init
    game.stage.backgroundColor = "#000000";
    shadow = true;
    clickLock = true;

    // Music
    guessMusic = game.add.audio('guess');
    revealMusic = game.add.audio('reveal');
    guessMusic.play();

    // Big Pokeball
    bigPokeballTop = game.add.sprite(640, 360, 'bigPokeballtop');
    bigPokeballTop.anchor.setTo(0.5, 0.5);
    bigPokeballTop.scale.setTo( 1, 1);
    bigPokeballTop.angle = 180;



    // starburst
    starburst = game.add.sprite(380, 320, 'starburst');
    gameSprites.add(starburst);
    starburst.anchor.setTo(0.5, 0.5);
    starburst.scale.setTo(.8, .8);
    starburst.alpha = 0.85;

    if (pokemonIndex < 495) {

    pokemonSprite = game.add.sprite(1280, 720, 'pokemonSprite');
    gameSprites.add(pokemonSprite);
    pokemonSprite.anchor.set(1, 1);
    pokemonSprite.smoothed = false;
    pokemonSprite.frame = spriteFrame;
    pokemonSprite.animations.add('dance', [spriteFrame, (spriteFrame + 1)], 5, true);
    pokemonSprite.animations.play('dance');

    // Shadow
    pokemonSprite.scale.setTo( 1, 1);
    pokemonSprite.tint = 0x000000;

    }

    // Big Pokemon Image
    bigPokemon = game.add.sprite(380, 320, 'bigPokemon');
    gameSprites.add(bigPokemon);
    bigPokemon.anchor.set(0.5, 0.5);
    bigPokemon.scale.setTo( -.8, .8);
    bigPokemon.tint = 0x000000;

    // Who's that Pokemon?
    whoText = game.add.text(750, 350, "Who's that \nPokemon?", { fill: '#000000', fontSize: 40 });
    gameSprites.add(whoText);
    whoText.anchor.set(0.5, 0.5);

    // Big Pokeball
    bigPokeballBottom = game.add.sprite(640, 360, 'bigPokeballBottom');
    uiSprites.add(bigPokeballBottom);
    bigPokeballBottom.anchor.setTo(0.5, 0.5);
    bigPokeballBottom.scale.setTo( 1, 1);
    bigPokeballBottom.angle = 180;

    // Big Pokeball Opening
    // Top
    pballTopRotate = game.add.tween(bigPokeballTop).to({angle:0}, 750, Phaser.Easing.Quartic.InOut);
    pballTopMove = game.add.tween(bigPokeballTop).to( { y: -300}, 750, Phaser.Easing.Quartic.InOut);

    pballTopMove.onComplete.add(removeClickLock, this);

    // Bottom
    pballBottomRotate = game.add.tween(bigPokeballBottom).to({angle:0}, 750, Phaser.Easing.Quartic.InOut);
    pballBottomMove = game.add.tween(bigPokeballBottom).to( { y: 750}, 750, Phaser.Easing.Quartic.InOut);

    pballTopRotate.chain(pballTopMove);
    pballBottomRotate.chain(pballBottomMove);

    pballTopRotate.start();
    pballBottomRotate.start();

    // Unhide
    game.input.onDown.add(mouseDown);
    game.load.onLoadComplete.add(loadComplete, this);

  },

  update: function() {
    starburst.angle += .1;
  }

}

function pmonLookup(num) {
  return num + num;
}

function generatePokemonIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function bigPokemonFilename() {
  return "db/img/" + pokedex[pokemonIndex].id + pokedex[pokemonIndex].ename + ".png";
}

function mouseDown() {

if (!clickLock) {

  if ( shadow ) {

      bigPokemon.tint = 0xffffff;

      if (typeof pokemonSprite !== 'undefined') {pokemonSprite.tint = 0xffffff;}

      whoText.alpha = 0;

      revealText = game.add.text(750, 350, "It's " + pokedex[pokemonIndex].ename + "!", { fill: '#ffffff', fontSize: 40 });
      gameSprites.add(revealText);
      revealText.anchor.set(0.5, 0.5);

      guessMusic.stop();
      revealMusic.play();

      shadow = false;

    } else {

        pballTopBack = game.add.tween(bigPokeballTop).to( { y: 360}, 1000, Phaser.Easing.Quartic.InOut);
        pballBottomBack = game.add.tween(bigPokeballBottom).to( { y: 360}, 1000, Phaser.Easing.Quartic.InOut);

        pballTopBack.start();
        pballBottomBack.start();

        pballTopBack.onComplete.add(reloadPokemon, this);
        clickLock = true

    }
  }
}

function reloadPokemon() {

    // Generate new index
    pokemonIndex = generatePokemonIndex(minPokemon, maxPokemon);
    spriteFrame = pmonLookup(pokemonIndex);

    game.load.image('bigPokemon', bigPokemonFilename());
    game.load.start();

    if (typeof pokemonSprite !== 'undefined') {
    pokemonSprite.destroy();
    }

    // Create Sprite if needed
    if ( pokemonIndex < maxSprite) {
      pokemonSprite = game.add.sprite(1280, 720, 'pokemonSprite');
      gameSprites.add(pokemonSprite);
      pokemonSprite.anchor.set(1, 1);
      pokemonSprite.smoothed = false;
      pokemonSprite.frame = spriteFrame;
      pokemonSprite.animations.add('dance', [spriteFrame, (spriteFrame + 1)], 5, true);
      pokemonSprite.animations.play('dance');
      pokemonSprite.tint = 0x000000;
    }

}


function loadComplete() {

    bigPokemon.kill();
    bigPokemon = game.add.sprite(380, 320, 'bigPokemon');
    gameSprites.add(bigPokemon);
    bigPokemon.anchor.set(0.5, 0.5);
    bigPokemon.tint = 0x000000;
    revealText.alpha = 0;
    whoText.alpha = 1;
    shadow = true;
    revealMusic.stop();
    guessMusic.play();
    openPokeball();
}

function openPokeball() {
    pballTopMove = game.add.tween(bigPokeballTop).to( { y: -300}, 750, Phaser.Easing.Quartic.InOut);
    pballBottomMove = game.add.tween(bigPokeballBottom).to( { y: 750}, 750, Phaser.Easing.Quartic.InOut);
    pballTopMove.start();
    pballBottomMove.start();

    pballTopMove.onComplete.add(removeClickLock, this);
}

function removeClickLock() {
    clickLock = false;
}
