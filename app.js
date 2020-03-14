var game = {
  onload: function () {
    // init video
    if (!me.video.init(640, 800, {wrapper: 'screen', scale: 'auto'})) {
      alert("Your browser doesn't support HTML5 Canvas, nerd.");
      return;
  }

  // INit Audio
  // me.audio.init('mp3,ogg');

  me.loader.preload(game.resources, this.loaded.bind(this));
  },

  loaded: function () {
    // set the 'play/ingame' screen object
    this.playScreen = new game.PlayScreen();
    me.state.set(me.state.PLAY, this.playScreen);

    // start game
    me.state.change(me.state.PLAY);
  }
};