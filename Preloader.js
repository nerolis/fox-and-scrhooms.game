Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload:function(){


      this.preloadBar = this.add.sprite(this.world.centerX,
                                        this.world.centerY,'preloaderBar');
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.time.advancedTiming = true;
      this.load.setPreloadSprite(this.preloadBar);
      // Assets
      this.load.spritesheet('player','Assets/player.png',96, 54);
      this.load.spritesheet('button','Assets/button.gif');
      this.load.tilemap('map', 'Assets/level3.csv');
      this.load.image('tileset', 'Assets/mytile.png');
	  this.load.image('drag', 'Assets/drag.gif');
      this.load.image('Kyubei','Assets/Kyubei.png');
      this.load.image('bullet','Assets/bullet.png');
      this.load.image('kira', 'Assets/kira.jpg');
      this.load.image("background", "Assets/sky.jpg");
      this.load.audio('boden', 'Assets/BOC - Music is Math.mp3');

    },
    create:function(){
        this.state.start('Level1');
    }
};
