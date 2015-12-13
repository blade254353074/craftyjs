/**
 * Create Bootstrap like Button in Canvas using createjs
 * stage must enableMouseOver:
 * stage.enableMouseOver();
 * Usage:
 * new Button('Button', 'defult', 'lg');
 *
 * @param {String} content   Button cotent text
 * @param {String} btnOption primary success info warning danger default
 * @param {String} btnSize   lg sm xs or empty
 */
function Button(content, btnOption, btnSize) {
  var backgroundColor;
  var backgroundColorHover;
  var backgroundColorActive;
  var borderColor;
  var borderColorHover;
  var borderColorActive;
  var color = '#fff';

  var fontSize;
  var lineHeight;
  var borderRadius;
  var paddingTop;
  var paddingLeft;
  var fontFamily = 'Lato,\'Helvetica Neue\',Arial,Helvetica,sans-serif';

  var label;
  var labelWidth;
  var btnWidth;
  var btnHeight;
  var background;
  var hit;
  var button;
  var _lastMouseEvent = null;
  var _pressed = false;

  // 设定按钮大小
  switch (btnSize) {
  case 'lg':
    fontSize = 18;
    lineHeight = 1.3333333;
    borderRadius = 6;
    paddingTop = 10;
    paddingLeft = 16;
    break;
  case 'sm':
    fontSize = 12;
    lineHeight = 1.5;
    borderRadius = 3;
    paddingTop = 5;
    paddingLeft = 10;
    break;
  case 'xs':
    fontSize = 12;
    lineHeight = 1.5;
    borderRadius = 3;
    paddingTop = 1;
    paddingLeft = 5;
    break;
  default:
    fontSize = 14;
    lineHeight = 1.42857143;
    borderRadius = 4;
    paddingTop = 6;
    paddingLeft = 12;
    break;
  }

  // 设定按钮类型
  switch (btnOption) {
  case 'primary':
    backgroundColor = '#337ab7';
    backgroundColorHover = '#286090';
    backgroundColorActive = '#204d74';
    borderColor = '#2e6da4';
    borderColorHover = '#204d74';
    borderColorActive = '#122b40';
    break;
  case 'success':
    backgroundColor = '#5cb85c';
    backgroundColorHover = '#449d44';
    backgroundColorActive = '#398439';
    borderColor = '#4cae4c';
    borderColorHover = '#398439';
    borderColorActive = '#255625';
    break;
  case 'info':
    backgroundColor = '#5bc0de';
    backgroundColorHover = '#31b0d5';
    backgroundColorActive = '#269abc';
    borderColor = '#46b8da';
    borderColorHover = '#269abc';
    borderColorActive = '#1b6d85';
    break;
  case 'warning':
    backgroundColor = '#f0ad4e';
    backgroundColorHover = '#ec971f';
    backgroundColorActive = '#d58512';
    borderColor = '#eea236';
    borderColorHover = '#d58512';
    borderColorActive = '#985f0d';
    break;
  case 'danger':
    backgroundColor = '#d9534f';
    backgroundColorHover = '#c9302c';
    backgroundColorActive = '#ac2925';
    borderColor = '#d43f3a';
    borderColorHover = '#ac2925';
    borderColorActive = '#761c19';
    break;
  default:
    backgroundColor = '#fff';
    backgroundColorHover = '#e6e6e6';
    backgroundColorActive = '#d4d4d4';
    borderColor = '#ccc';
    borderColorHover = '#adadad';
    borderColorActive = '#8c8c8c';
    color = '#333';
    break;
  }

  // 创建按钮文字
  if (!content) content = 'button';
  label = new createjs.Text(content, fontSize + 'px ' + fontFamily, color);
  label.name = content;
  label.lineHeight = lineHeight;
  label.textAlign = 'center';
  label.textBaseline = 'middle';

  // 计算按钮长宽
  labelWidth = label.getMeasuredWidth();
  btnWidth = labelWidth + paddingLeft * 2;
  btnHeight = fontSize * lineHeight + paddingTop * 2;

  // 设置文字坐标
  label.x = btnWidth / 2;
  label.y = btnHeight / 2;

  // 创建按钮背景
  background = new createjs.Shape();
  background.name = 'background';
  background.graphics
    .setStrokeStyle(0)
    .beginStroke(borderColor)
    .beginFill(backgroundColor)
    .drawRoundRect(0, 0,
      btnWidth,
      btnHeight,
      borderRadius);

  // 创建按钮Container
  button = new createjs.Container();
  button.cursor = 'pointer';
  button.name = 'button';
  button.addChild(background, label);

  // 创建按钮hitArea
  hit = new createjs.Shape();
  hit.graphics.beginFill('#000').drawRect(0, 0, btnWidth, btnHeight);
  button.hitArea = hit;

  // hover
  button.on('mouseover', handleMouse);
  button.on('mouseout', handleMouse);
  // :active
  button.on('mousedown', handleMouse);
  button.on('pressup', handleMouse);
  // out over down out
  // out over down pressup
  // over down out over

  function buttonNormal() {
    background.graphics.clear()
      .setStrokeStyle(0)
      .beginStroke(borderColor)
      .beginFill(backgroundColor)
      .drawRoundRect(0, 0,
        btnWidth,
        btnHeight,
        borderRadius);
  }
  function buttonHover() {
    background.graphics.clear()
      .setStrokeStyle(0)
      .beginStroke(borderColorHover)
      .beginFill(backgroundColorHover)
      .drawRoundRect(0, 0,
        btnWidth,
        btnHeight,
        borderRadius);
  }

  function handleMouse(e) {
    switch (e.type) {
    case 'mouseover':
      if (_lastMouseEvent === 'mouseout' && _pressed) {
        break;
      }
      buttonHover();
      break;
    case 'pressup':
      if (_lastMouseEvent === 'mouseout') {
        buttonNormal();
      } else {
        buttonHover();
      }
      _pressed = false;
      break;
    case 'mousedown':
      _pressed = true;
      background.graphics.clear()
        .setStrokeStyle(0)
        .beginStroke(borderColorActive)
        .beginFill(backgroundColorActive)
        .drawRoundRect(0, 0,
          btnWidth,
          btnHeight,
          borderRadius);
      break;
    default:
      if (_lastMouseEvent === 'mousedown') break;
      if (_pressed) break;
      buttonNormal();
      break;
    }
    _lastMouseEvent = e.type;
  }

  return button;
}
