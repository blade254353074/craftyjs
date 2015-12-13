function setupInvaders(invadersImage) {

  var sheetMap = {};

  var invaderController;

  sheetMap.invader1 = {
    sheet: new createjs.SpriteSheet({
      images: [invadersImage],
      frames: [
        // x, y, width, height, imageIndex*, regX*, regY*
        [0, 0, 40, 24]
      ],
      animations: {
        move: [0]
      }
    }),
    create: function () {
      var invader = new createjs.Sprite(this.sheet, 'move');
      // TODO: Add Shadow
      return invader;
    },
    handleHit: function (invaderObj, isHit) {
      console.log(invaderObj);
      // invaderObj.removeFromCollide(this);
    },
    dieEnd: function () {
      ivdControl.removeInvader(this);
    },
    width: 40,
    height: 24,
    color: '#00F500'
  };

  invaderController = (function () {

    function InvaderController(sheetMap, waveMap) {
      this._waveMap = waveMap || [];
      this._curWave = null;
      this._gameover = false;
      this._sheetMap = sheetMap || {};
      this._numInvader = 0;
      this.collideMap = {};
    }

    InvaderController.prototype = {
      start: function (stage) {

      },
      tick: function () {
        var self = this;
        // self._numInvader && self.handleFramerate();
      },
      setWave: function () {
        var self = this;
        var curWave = self._curWave;
        var waveMap;
        var invaders;
        var nextStart;
        var now = +new Date();
        if (curWave) {
          //当前一轮还未播放完毕
          if (curWave.compCount) return;
          // true: 立即,开始下一轮;
          // false: 清屏后,开始下一轮;
          // time: 当前播放完后指定时间后,开始下一轮
          nextStart = curWave.nextWave;
          if (nextStart === true) {
            nextStart = 0;
          } else if (nextStart === false) {
            nextStart = self._numInvader ? now : 0;
          } else {
            // 将NaN, null, undefined, Infinity转为0
            nextStart = ~~nextStart;
          }
        }
      }
    };
  }());
}
