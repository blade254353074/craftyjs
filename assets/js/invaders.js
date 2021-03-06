function setupInvaders(invadersImage) {

  var InvaderController; // invaderController
  var sheetMap = {};
  var waveMap = [];
  var runTime = 0;

  function makeShadow(invader, width, height, color) {
    var avgSize = (width + height) / 2;
    var blur = avgSize - avgSize / 5.6;
    //console.log(invader.id, width, height, avgSize, avgSize / 4, blur);
    // 设定阴影
    invader.shadow = new createjs.Shadow(color, 0, 0, blur);

    return invader;
  }

  sheetMap.invader1 = {
    sheet: new createjs.SpriteSheet({
      images: [invadersImage],
      frames: [
        // x, y, width, height, imageIndex*, regX*, regY*
        [0, 0, 40, 24],
        [50, 0, 41, 29],
        [100, 0, 41, 30],
        [150, 0, 41, 29],
        [200, 0, 41, 30]
      ],
      animations: {
        move: [0, 4, 'move', 0.08]
      }
    }),
    create: function () {
      var invader = new createjs.Sprite(this.sheet, 'move');
      // TODO: Add Shadow
      makeShadow(invader, this.width, this.height, this.color);
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

  (function () {
    addWave([{
      name: 'invader1',
      number: 10,
      interval: 1500
    }], {
      nextWave: true
    });
  }());

  InvaderController = (function () {

    function IC(sheetMap, waveMap) {
      this._waveMap = waveMap || [];
      this._curWave = null;
      this._gameover = false;
      this._sheetMap = sheetMap || {};
      this._numInvader = 0;
      this.collideMap = {};
    }

    IC.prototype = {
      start: function (stage) {
        runTime = +new Date();
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
        if (self._numInvader) self.handleFramerate();
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
          // console.log(curWave.compCount);
          if (curWave.compCount) return true;
          // true: 立即,开始下一轮;
          // false: 清屏后,开始下一轮;
          // time: 当前播放完后指定时间后,开始下一轮
          return false;
          // nextStart = curWave.nextWave;
          // if (nextStart === true) {
          //   nextStart = 0;
          // } else if (nextStart === false) {
          //   nextStart = self._numInvader ? now : 0;
          // } else {
          //   // 将NaN, null, undefined, Infinity转为0
          //   nextStart = ~~nextStart;
          // }
          // if (now - curWave.startTime < nextStart) {
          //   return;
          // }
        }
        waveMap = self._waveMap.shift();
        //当没有下一轮,并且页面上也没有任何敌机的时候,游戏结束
        // console.log(waveMap, self._numInvader);
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
      gameover: function () {
        console.log((+new Date() - runTime) / 1000);
        this._gameover = true;
      },
      handleWave: function () {
        var self = this;
        var curWave = self._curWave;
        //当前没东西 || 当前一轮已完成,等待下一轮的开启
        if (!(curWave && curWave.compCount)) return;
        var curDate = +new Date();
        var invaders = curWave.invaders;

        invaders.forEach(function (invaderInfo) {
          // 生成敌机
          var data = invaderInfo._data;
          console.log(invaderInfo);
          var proMax = invaderInfo.number;
          if (data.complete || !proMax) return;
          var produce = data.produce || 0;
          var delay;
          var prevTime;
          data.prevTime = curDate;
          data.produce = produce;
          for (var i = 0; i < proMax; i++) {
            self.makeInvader(invaderInfo, i);
            if (++produce >= proMax) {
              data.complete = true;
              curWave.compCount--;
            }
          }
        });
      },
      makeInvader: function (invaderInfo, index) {
        var self = this;
        var id;
        var container = self.container;
        var name = invaderInfo.name;
        var sheetMap = self._sheetMap[name];
        var invaderSprite = sheetMap.create();

        invaderSprite._data = {
          isHit: 0,
          position: invaderInfo.position
        };
        invaderSprite.x = (sheetMap.width + 20) * index;
        // self.setAnimate(invaderSprite, sheetMap);
        id = invaderSprite.id = 'ivd_' + invaderSprite.id;
        invaderSprite.name = name;
        self.collideMap[id] = invaderSprite;
        // 添加事件
        invaderSprite.on('hit', self.eventHit, self);
        //添加到集合中,维护敌机数量
        container.addChild(invaderSprite);
        self._numInvader++;
        container = sheetMap = invaderSprite = null;
      },
      setAnimate: function (invaderSprite, sheet) {
        var self = this;
        var data = invaderSprite._data;
        var target = {};
        var speed;
        if (data.position === false) {
          //invaderSprite.x = Math.random()
        }
      },
      eventHit: function (event) {
        var invader = event.target;
        var sheetObj = this._sheetMap[invader.name];
        sheetObj.handleHit(invader, ++invader._data.isHit);
      },
      removeFromCollide: function (invader) {
        delete this.collideMap[invader.id];
      },
      removeInvader: function (invader) {
        // 在stage中移除
        invader.parent.removeChild(invader);
        // 维护数量
        this._numInvader--;
        // 取消位移动画
        // createjs.Tween.removeTweens(invader);
        // 从碰撞集合中移除
        delete this.collideMap[invader.id];
      },
      handleFramerate: function () {
        //console.log(this.collideMap);
      }
    };
    return IC;
  }());

  var ivdControl = window.invader = new InvaderController(sheetMap, waveMap);
  ivdControl.start(stage);

  function addWave(invaders, options) {
    var invadersArr = [];
    invaders.forEach(function (invader) {
      invadersArr.push(copy({
        //敌机类型 soldier, leader, captain
        name: '',
        //生产数量
        number: 1,
        //生产间隔
        interval: 0,
        //延迟显示
        delay: 0,
        //位置 false:x轴随机垂直下落,
        //[true/false,0,outx,outy]
        position: false,
        runType: 1,
        speed: 8000,
        //*内部私用
        _data: {}
      }, invader));
    });
    waveMap.push(copy({
      nextWave: true,
      invaders: invadersArr
    }, options));
    invadersArr = invaders = options = null;
  }

  function copy(tag, obj) {
    for (var n in obj) {
      if (obj.hasOwnProperty(n)) {
        tag[n] = obj[n];
      }
    }
    return tag;
  }
}
