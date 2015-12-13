window.addEventListener('load', load);

function load() {
  var canvas = document.getElementById('game');
  window.stage = new createjs.Stage(canvas);

  var ship; // 飞船
  var invader; // 敌方战机

  var stageWidth = 600;
  var stageHeight = 600;

  var shipWidth = 60;
  var shipHeight = 60;

  var invaderArray = [];
  var bulletArray = [];

  var invaderWidth = 32;
  var leftBounds = 25;
  var rightBounds = 575;
  var invaderSpeed = 6;

  var changeDirection = false;

  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var KEYCODE_SPACE = 32;

  var moveLeft = false;
  var moveRight = false;

  var startText;
  var canfire = true;
  // 透明度下限
  var alphaThreshold = 0.75;

  // 静态资源
  var preload;
  var manifest = [{
    id: 'ship',
    src: 'assets/imgs/ship.png'
  }, {
    id: 'ivd1',
    src: 'assets/imgs/ivd_00F500.png'
  }, {
    id: 'ivd2',
    src: 'assets/imgs/ivd_FF00FF.png'
  }, {
    id: 'ivd3',
    src: 'assets/imgs/ivd_FDFF00.png'
  }, {
    id: 'invaderSprite',
    src: 'assets/imgs/invaderSprite.png'
  }];

  var invaderData;

  (function loadAssets() {
    preload = new createjs.LoadQueue();
    preload.addEventListener('complete', setup.bind(preload));
    preload.loadManifest(manifest);
  }());

  // game setup
  function setup(e) {
    drawBackground();
    setupShip();
    setupInvaders(preload.getResult('invaderSprite'));

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // 更新stage
    stage.update();
    startGame();
  }

  function drawBackground() {
    var rand;
    var randNumX;
    var randNumY;
    var star;
    var deg;

    var rect = new createjs.Shape();
    rect.graphics.beginFill('#000').drawRect(0, 0, stageWidth, stageHeight);
    stage.addChild(rect);

    for (var i = 0; i < 120; i++) {
      rand = Math.random();
      randNumX = Math.floor(Math.random() * stageWidth);
      randNumY = Math.floor(Math.random() * stageHeight);
      star = new createjs.Shape();

      if (Math.random() * 2 - 1) {
        deg = 360 * Math.random();
      } else {
        deg = -360 * Math.random();
      }

      if (rand > 0.99) {
        star.graphics.beginFill('#fff').drawPolyStar(randNumX, randNumY, 7, 4, 0.85, deg);
      } else if (rand > 0.95) {
        star.graphics.beginFill('#fff').drawPolyStar(randNumX, randNumY, 6, 4, 0.825, deg);
      } else if (rand > 0.6827) {
        star.graphics.beginFill('#fff').drawPolyStar(randNumX, randNumY, 4, 4, 0.85, deg);
      } else {
        star.graphics.beginFill('#fff').drawPolyStar(randNumX, randNumY, 4, 4, 0.9, deg);
      }

      if (rand > 0.6827) {
        starAnimate(star, Math.random(), Math.random() * 500);
      }

      stage.addChild(star);
    }
  }

  function starAnimate(star, rand, delay) {
    createjs.Tween.get(star, {
        loop: true
      })
      .wait(delay)
      .to({
        alpha: rand
      }, 1000 + delay)
      .to({
        alpha: 1
      }, 1000 + delay);
  }

  // 开始游戏
  function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tick);
  }

  // 暂停游戏
  function pauseGame() {

  }

  // 发光阴影设定
  function ShadowObject(imageId, shadowColor) {
    var image = preload.getResult(imageId);
    var object = new createjs.Bitmap(image);
    var avgSize = (image.width + image.height) / 2;
    var blur = avgSize - avgSize / 5.6;
    console.log(imageId, image.width, image.height, avgSize, avgSize / 4, blur);
    // 设定阴影
    object.shadow = new createjs.Shadow(shadowColor, 0, 0, blur);

    return object;
  }

  // 初始化飞船
  function setupShip() {
    ship = new ShadowObject('ship', '#fff');
    ship.x = stageWidth / 2 - shipWidth / 2;
    ship.y = stageHeight - shipHeight - 10;

    stage.addChild(ship);
  }

  // 初始化敌方战机
  function setupInvaders() {
    invaderData = {
      images: [preload.getResult('invaderSprite')],
      frames: [
        // x, y, width, height, imageIndex*, regX*, regY*
        [0, 0, 40, 24],
        [50, 0, 44, 27],
        [150, 0, 38, 26],
        [200, 0, 32, 25]
      ]
    };

    var invaderSpriteSheet = new createjs.SpriteSheet(invaderData);
    console.log(invaderSpriteSheet);
    var instance = new createjs.Sprite(invaderSpriteSheet);
    console.log(instance);
    stage.addChild(instance);
    // instance.shadow = new createjs.Shadow('#00F500', 0, 0, blur);
    instance.gotoAndStop(2);
    var img1 = invaderSpriteSheet.getFrame(0);
    var object = new createjs.Bitmap(img1.image);
    object.setBounds(50, 0, 40, 24);
    object.x = 100;
    stage.addChild(object);
    // Radiant
    var ivd1 = new ShadowObject('ivd1', '#00F500');
    ivd1.x = 50;
    ivd1.y = 50;

    var ivd2 = new ShadowObject('ivd2', '#FF00FF');
    ivd2.x = 120;
    ivd2.y = 50;

    var ivd3 = new ShadowObject('ivd3', '#FDFF00');
    ivd3.x = 185;
    ivd3.y = 50;
    // console.log(ivd3.shadow.blur);

    stage.addChild(ivd1, ivd2, ivd3);
  }

  function handleKeyDown(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
    case KEYCODE_LEFT:
    case 65: // A
      moveLeft = true;
      break;
    case KEYCODE_RIGHT:
    case 68: // D
      moveRight = true;
      break;
    }
  }

  function handleKeyUp(e) {
    switch (e.keyCode) {
    case KEYCODE_SPACE:
    case 74: // j
    case 87: // w
      // fireBullet();
      break;
    case KEYCODE_LEFT:
    case 65: // A
      moveLeft = false;
      break;
    case KEYCODE_RIGHT:
    case 68: // D
      moveRight = false;
      break;
    }
  }

  // 发射!
  function fireBullet() {

  }

  function tick() {
    if (moveLeft && ship.x >= 5) {
      ship.x -= 5;
    } else if (moveRight && ship.x < stageWidth - shipWidth) {
      ship.x += 5;
    }

    stage.update();
  }

  // 碰撞检测
  function checkCollisions() {

  }

  // 检测胜利
  function checkWin() {

  }

  // 游戏结束
  function doGameOver() {

  }



}
