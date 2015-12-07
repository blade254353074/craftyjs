(function () {
  // init
  var stage = Crafty.init(800, 800, document.querySelector('#game'));

  /*  // add a fourway entity
    Crafty.e('2D, Canvas, Color, Fourway').attr({
      x: 0,
      y: 0,
      w: 100,
      h: 100
    }).color('green').fourway(4);*/

  // add a floor
  var floor = Crafty.e('Floor, 2D, Canvas, Color').attr({
    x: 0,
    y: 790,
    w: 800,
    h: 10
  }).color('red');

  floor.bind("ChangeColor", function (eventData) {
    this.color(eventData.color);
  });

  // add a gravity entity
  var box = Crafty.e('2D, Canvas, Color, Fourway, Gravity, Mouse')
    .attr({
      x: 300,
      y: 0,
      w: 50,
      h: 50
    })
    .color('blue')
    .fourway(4)
    .gravity('Floor');


  box.bind('Click', function () {
    floor.trigger('ChangeColor', {
      color: 'blue'
    });
  });

}());
