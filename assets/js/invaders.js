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
        var runTime = + new Date();
        var self = this;
        var container;
        var canvas;

        self._gameover = false;
        window.invader_container = container = self.container = new createjs.Container();
        canvas = stage.canvas;
        self._stageWidth = canvas.width;
        self._stageHeight = canvas.height;
        stage.addChild(container);
        createjs.Ticker.addEventListener('tick', function (event) {
          if (self._gameover) return;
          // 操作敌机逻辑
          self.tick();
          stage.update(event);
        });
      },
      tick: function () {
        var self = this;
        if (self.setWave()) {
          self.handleWave();
        }
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
          if (curWave.compCount) return true;
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
        waveMap = self._waveMap.shift();
        //当没有下一轮,并且页面上也没有任何敌机的时候,游戏结束
        if (!waveMap && !self._numInvader) {
          self.gameover();
					return;
        }
        invaders = waveMap.invaders;
        self._curWave = {
          startTime: now,
					nextWave: waveMap.nextWave,
					invaders: invaders,
					compCount: invaders.length
        };
      },
			gameover: function(){
				console.log( (+new Date() - runTime)/1000 );
				this._gameover = true;
			},
      handleWave: function() {
        var self = this;
        var curWave = self._curWave;
				//当前没东西 || 当前一轮已完成,等待下一轮的开启
        if (!(curWave && curWave.compCount)) return;
        var curDate = + new Date();
        var invaders = curWave.invaders;
        invaders.forEach(function (ivdInfo) {
          // 生成敌机
        });
      },
      makeInvader: function(invader) {
        var self = this;
        var id;
        // var container = self.container;
        var name = invader.name;
        var sheetMap = self._sheetMap[name];
        var invaderSprite = sheetMap.create();

        invaderSprite._data = {
          isHit: 0,
          position: invader.position
        };
        // self.setAnimate(invaderSprite, sheetMap);
        id = invaderSprite.id = 'ivd_' + invaderSprite.id;
        invaderSprite.name = name;
        self.collideMap[id] = invaderSprite;
        // 添加事件
        invaderSprite.on('hit', self.eventHit, self);
        self._numInvader++;
        sheetMap = invaderSprite = null;
      }
    };
  }());
}
