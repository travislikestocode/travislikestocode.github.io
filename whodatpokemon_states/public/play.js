var playState = {

  preload: function() {


    spriteFrame = pmonLookup(pokemonIndex);

    gameSprites = game.add.group();
    uiSprites = game.add.group();

    // Load assets


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

    // Big Pokeball
    bigPokeballTop = game.add.sprite(640, 360, 'bigPokeballtop');
    //uiSprites.add(bigPokeballTop);
    bigPokeballTop.anchor.setTo(0.5, 0.5);
    bigPokeballTop.scale.setTo( 1, 1);
    bigPokeballTop.angle = 180;



    // starburst
    starburst = game.add.sprite(380, 320, 'starburst');
    gameSprites.add(starburst);
    starburst.anchor.setTo(0.5, 0.5);
    starburst.scale.setTo(0, 0);
    starburst.alpha = 0.85;

    //PokeBall
    /*pokeball = game.add.sprite(0, 0, 'pokeball');
    pokeball.anchor.setTo(0.5, 0.5);
    pokeball.scale.setTo(5, 5);
    pokeball.angle = 190;
    pokeballSound = game.add.audio('pokeballSound');
    pokeballSound.volume = 0.5;
    //pokeballSound.play();*/

    // Pokemon Sprite

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
    bigPokemonProperties();

    // Who's that Pokemon?
    whoText = game.add.text(750, 350, "Who's that \nPokemon?", { fill: '#000000', fontSize: 40 });
    gameSprites.add(whoText);
    whoText.anchor.set(0.5, 0.5);
    whoText.alpha = 0;

    // Big Pokeball
    bigPokeballBottom = game.add.sprite(640, 360, 'bigPokeballBottom');
    uiSprites.add(bigPokeballBottom);
    bigPokeballBottom.anchor.setTo(0.5, 0.5);
    bigPokeballBottom.scale.setTo( 1, 1);
    bigPokeballBottom.angle = 180;



    // async tweens
    //game.add.tween(pokeball).to( { x: 380, y: 200 }, 300, Phaser.Easing.Quartic.InOut, true);
    //game.add.tween(pokeball).to( { angle: 45 }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(whoText).to({alpha:1}, 300, Phaser.Easing.Quartic.InOut, true);

    // Big Pokeball Opening
    // Top
    pballTopRotate = game.add.tween(bigPokeballTop).to({angle:0}, 1000, Phaser.Easing.Quartic.InOut);
    pballTopMove = game.add.tween(bigPokeballTop).to( { y: -1500}, 1000, Phaser.Easing.Quartic.InOut);

    // Bottom
    pballBottomRotate = game.add.tween(bigPokeballBottom).to({angle:0}, 1000, Phaser.Easing.Quartic.InOut);
    pballBottomMove = game.add.tween(bigPokeballBottom).to( { y: 1500}, 1000, Phaser.Easing.Quartic.InOut);

    pballTopRotate.chain(pballTopMove);
    pballBottomRotate.chain(pballBottomMove);

    pballTopRotate.start();
    pballBottomRotate.start();



    // Big Pokeball Closing - Rotate
    //pballTopRotateBack = game.add.tween(bigPokeballTop).to( {angle:180}, 1000, Phaser.Easing.Quartic.InOut);
    //pballBottomRotateBack = game.add.tween(bigPokeballBottom).to( {angle:180}, 1000, Phaser.Easing.Quartic.InOut);

    //pballTopBack.chain(pballTopRotateBack);
    //pballBottomBack.chain(pballBottomRotateBack);


    // sync tweens
    //tweenA = game.add.tween(pokeball.scale).to( { x: .1, y: 0.1}, 200, Phaser.Easing.Quartic.InOut);
    //tweenB = game.add.tween(pokeball).to({alpha:0}, 1,Phaser.Easing.None);
    tweenC = game.add.tween(bigPokemon).to({alpha:1}, 1,Phaser.Easing.None);
    tweenE = game.add.tween(bigPokemon.scale).to( { x: -.8, y: .8}, 150, Phaser.Easing.Quartic.InOut);
    tweenD = game.add.tween(starburst.scale).to( { x: .8, y: .8}, 700, Phaser.Easing.Quartic.InOut);


    //tweenA.chain(tweenB);
    //tweenB.chain(tweenC);
    tweenC.chain(tweenD);
    tweenD.chain(tweenE);
    //tweenE.chain(tweenF);
    tweenC.start();

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
      shadow = false;
      guessMusic.stop();
      revealMusic.play();

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

function bigPokemonProperties() {

    bigPokemon.anchor.set(0.5, 0.5);
    bigPokemon.smoothed = false;
    bigPokemon.scale.setTo( 0, 0);
    bigPokemon.tint = 0x000000;
    bigPokemon.frame = pmonLookup(pokemonIndex)
    bigPokemon.alpha = 0

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
    pballTopMove = game.add.tween(bigPokeballTop).to( { y: -1500}, 1000, Phaser.Easing.Quartic.InOut);
    pballBottomMove = game.add.tween(bigPokeballBottom).to( { y: 1500}, 1000, Phaser.Easing.Quartic.InOut);
    pballTopMove.start();
    pballBottomMove.start();

    pballTopMove.onComplete.add(removeClickLock, this);
}

function removeClickLock() {
    clickLock = false;
}
