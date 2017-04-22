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

      // img
      this.load.tilemap('map', 'assets/level3.csv');

      this.load.image('tileset', 'assets/mytile.png');

	    this.load.image('drag', 'assets/drag.gif');

      this.load.spritesheet('player','assets/player.png',96, 54);

      this.load.spritesheet('button','assets/button.gif');

      this.load.image('Kyubei','assets/Kyubei.png');

      this.load.image('bullet','assets/bullet.png');

      this.load.audio('boden', 'assets/BOC - Music is Math.mp3');
      this.load.image("background", "assets/sky.jpg");
    },


    create:function(){
        this.state.start('Level1');
    }
};
