game.PlayScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    me.game.world.addChild(me.pool.pull("player"));
  },

  onDestroyEvent: function() {}
});
