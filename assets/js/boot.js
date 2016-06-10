var boot = function(game){
	console.log("Game Start");
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/game/loading.gif"); 
	},
  	create: function(){
		

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.setScreenSize(true);

		this.game.state.start("Preload");

		
	}
}