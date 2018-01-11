EnemeyKyubei = function(index,game,x,y){

    this.Kyubei = game.add.sprite(x,y,'Kyubei');
    this.Kyubei.anchor.setTo(0.5,0.5);
    this.Kyubei.name = index.toString();

    game.physics.enable(this.Kyubei,Phaser.Physics.ARCADE);
    this.Kyubei.body.immovable = true;
    this.Kyubei.body.collideWorldBounds = true;
    this.Kyubei.body.allowGravity = false;



    this.KyubeiTween = game.add.tween(this.Kyubei).to({
      y: this.Kyubei.y + 2000
    }, 2000, 'Linear', true, 1200, 1600, true);
  

}

EnemyKira = function(index, game, x, y) {
  this.Kira = game.add.sprite(x, y, 'kira');
  this.Kira.anchor.setTo(0.5, 0.5);
  this.Kira.name = index.toString();

  game.physics.enable(this.Kira, Phaser.Physics.ARCADE);
  this.Kira.body.immovable = true;
  this.Kira.body.collideWorldBounds = true;
  this.Kira.body.allowGravity = false;



  this.KiraTween = game.add.tween(this.Kira).to({
    x: this.Kira.y + 2000
  }, 2000, 'Linear', true, 2000, 2000, true);
}

var enemy1;

Game.Level1 = function(game){};
var music,
s,
map,
layer, 
player,
controls = {},
playerSpeed = 650,
jumpTimer = 0,
shrooms,
score = 0,
scoreText,
button,
drag,
shootTime = 0,
bullet

Game.Level1.prototype ={
    create:function () {
      //background
      background = this.add.tileSprite(0, 0, 3000, 3000, "background");
      this.stage.backgroundColor = '#634324';
      // Music
      music = this.add.audio('boden');
      music.volume = 0.3;
      music.play();
      // Map
      this.physics.arcade.gravity.y = 1400;
      map = this.add.tilemap('map', 124, 124);
      map.addTilesetImage('tileset');
      layer = map.createLayer(0);
      layer.resizeWorld();
      map.setCollisionBetween(0,0);
      map.setTileIndexCallback(6, this.resetPlayer, this);
      map.setTileIndexCallback(64, this.getHigh, this);
      // score
      scoreText = this.add.text(0, 0, 'Shrooms: 0', { fontSize: '32px', fill: '#668221' });
      scoreText.fixedToCamera = true;
      // Player animation
      player = this.add.sprite(100, 560, 'player');
      player.anchor.setTo(0.5, 0.5);
      player.animations.add('idle', [0], true);
      player.animations.add('jump', [2, 0], true);
      player.animations.add('run',  [1, 2, 3, 1, 2, 3], true);
      this.physics.arcade.enable(player);
      this.camera.follow(player);
      player.body.collideWorldBounds = true;
      player.animations.currentAnim.speed = 5;
      // Keyboard
      controls = {
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      };
      // madokaButton
      button = this.add.button(this.world.centerX - 95, this.world.centerY + 200,
                'button', function() {
                  background.visible =! background.visible;
              }, this, 2, 1, 0);
            //button.fixedToCamera = true;

            // drag madoka
             drag = this.add.sprite(player.x ,player.y,'drag');
              drag.anchor.setTo(0.5,-3);
              drag.inputEnabled = true;
              drag.input.enableDrag(true);
              drag.enableBody = true;


             //constructor kyubeiya
             enemy1 = new EnemeyKyubei(0, this, player.x + 200, player.y -200);
             enemy2 = new EnemeyKyubei(0, this, player.x + 800, player.y - 200);
             enemy3 = new EnemeyKyubei(0, this, player.x + 1400, player.y - 200);
             // Kira Constructor
             enemy4 = new EnemyKira(0, this, player.x + 300, player.y - -500);
             // Shoot
             bullets = this.add.group();

             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(5,'bullet');

             bullets.setAll('anchor.x',0.5);
             bullets.setAll('anchor.y',0.5);

             bullets.setAll('scale.x',0.5);
             bullets.setAll('scale.y',0.5);

             bullets.setAll('outOfBoundsKill',true);
             bullets.setAll('checkWorldBounds',true);

        },
        update: function() {
          // background movement
          background.tilePosition.x += 1;
          background.tilePosition.y -= 1;
     
         // Movement
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, enemy1.Kyubei, this.resetPlayer);

        player.body.velocity.x = 0;


      if(controls.right.isDown){
        player.animations.play('run');
        player.scale.setTo(1,1);
        player.body.velocity.x += playerSpeed;
      }
      if(controls.left.isDown){
        player.animations.play('run');
        player.scale.setTo(-1,1);
        player.body.velocity.x -= playerSpeed;
      }

      if(controls.up.isDown && (player.body.onFloor() ||
      player.body.touching.down) && this.time.now > jumpTimer)

      {
      player.body.velocity.y = -600;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
      }

        // reset animation
      if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
          player.animations.play('idle');
      }



      if(controls.shoot.isDown){
        this.shootBullet();
      }



    },
      // player.reset
      resetPlayer:function(){
        player.reset(100, 560);

      },
      // Shroom
      getHigh:function(){
        map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
            //  Add and update the score
                score += 10;
                scoreText.text = 'Shroom value: ' + score;

      },
      // shootFunc
      shootBullet:function(){
        if(this.time.now > shootTime) {
          bullet = bullets.getFirstExists(false);
          if(bullet) {
            bullet.reset(player.x,player.y);
            bullet.body.velocity.y = -600;
            shootTime = this.time.now + 900;

          }
        }
      }

    }

function checkOverlap(spriteA,spriteB) {
  var BoundsA = spriteA.getBounds();
  var BoundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(BoundsA,BoundsB);

}
