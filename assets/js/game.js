(function () {

  window.onload = function () {
    var isRetina = window.devicePixelRatio > 1;

    var stage = new createjs.Stage("game");
    stage.enableMouseOver();

    var text = new createjs.Text('雷电法王', 'Bold 40px \'Wyue-GutiFangsong-NC\'', '#f40');
    text.outline = 1;
    text.x = 100;
    text.y = 100;

    var hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
    text.hitArea = hit;
    // stage.addChild(text);

    text.on('mouseover', handleMouseover);

    text.on('mouseout', handleMouseover);

    function handleMouseover(e) {
      e.target.alpha = e.type === 'mouseover' ? 0.7 : 1;
    }

    var btnDefult = new Button('雷电法王', 'defult', 'lg');
    btnDefult.set({ x: 20, y: 20 });
    var btnPrimary = new Button('雷电法王', 'primary');
    btnPrimary.set({ x: 20, y: 70 });
    var btnSuccess = new Button('雷电法王', 'success', 'sm');
    btnSuccess.set({ x: 20, y: 110 });
    var btnInfo = new Button('雷电法王', 'info', 'xs');
    btnInfo.set({ x: 20, y: 150 });
    var btnWarning = new Button('雷电法王', 'warning');
    btnWarning.set({ x: 20, y: 180 });
    var btnDanger = new Button('雷电法王', 'danger');
    btnDanger.set({ x: 20, y: 220 });

    stage.addChild(btnDefult, btnPrimary, btnSuccess, btnInfo, btnWarning, btnDanger);



    // tick 广播
    createjs.Ticker.setFPS(60);
    // 利用Ticker类 自动更新stage
    createjs.Ticker.addEventListener("tick", stage);

    createjs.Sound.registerSound('assets/thunder.mp3', 'Thunder');

    text.addEventListener('click', function () {
      createjs.Sound.play('Thunder');
    });
  };

}());
