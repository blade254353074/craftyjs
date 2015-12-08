(function () {

  var stage = new createjs.Stage('game');
  stage.enableMouseOver();

  var circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = 50;
  circle.y = 50;
  stage.addChild(circle);

  stage.update();


  function Button(label, color) {
    this.Container_constructor();

    this.label = label;
    this.color = color;

    this.setup();
  }
  var p = createjs.extend(Button, createjs.Container);

  p.setup = function () {
    var text = new createjs.Text(this.label, "20px Arial", "#000");
    text.textBaseline = "top";
    text.textAlign = "center";

    var width = text.getMeasuredWidth() + 30;
    var height = text.getMeasuredHeight() + 20;

    text.x = width / 2;
    text.y = 10;

    var background = new createjs.Shape();
    background.graphics.beginFill(this.color).drawRoundRect(0, 0, width, height, 10);

    this.addChild(background, text);
    this.on("click", this.handleClick);
    this.on("rollover", this.handleRollOver);
    this.on("rollout", this.handleRollOver);
    this.cursor = "pointer";

    this.mouseChildren = false;

    this.offset = Math.random() * 10;
    this.count = 0;
  };

  p.handleClick = function (event) {
    console.log("You clicked on a button: " + this.label);
  };

  p.handleRollOver = function (event) {
    this.alpha = event.type == "rollover" ? 0.4 : 1;
  };

  window.Button = createjs.promote(Button, "Container");

  var btn1 = stage.addChild(new Button("Hello!", "#F00"));
  btn1.y = 20;

  var btn2 = stage.addChild(new Button("Goodbye.", "#0F0"));
  btn2.y = btn1.y + 50;

  var btn3 = stage.addChild(new Button("Hello again!!", "#0FF"));
  btn3.y = btn2.y + 50;

  btn1.x = btn2.x = btn3.x = 20;

  createjs.Ticker.on("tick", stage);
}());
