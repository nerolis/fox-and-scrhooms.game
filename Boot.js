var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
    init:function(){

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
  },
  // Preload function
  preload:function(){
    this.load.image('preloaderBar', 'Assets/preloader.png');

  },
  // Create function
  create:function(){
      this.state.start('Preloader');
  }

}
