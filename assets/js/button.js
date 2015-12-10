function Button(text, btnType) {
  var backgroundColor;
  var backgroundColorHover;
  var backgroundColorActive;
  var borderColor;
  var borderColorHover;
  var borderColorActive;
  var color = '#fff';

  var fontSize = 14;
  var fontFamily = 'Lato,\'Helvetica Neue\',Arial,Helvetica,sans-serif';
  var lineHeight = 1.42857143;
  var borderRadius = 4;
  var paddingTop = 6;
  var paddingLeft = 12;

  switch (btnType) {
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

  var label = new createjs.Text(text, fontSize + 'px ' + fontFamily, color);
  label.name = text;
  label.lineHeight = lineHeight;
  label.textAlign = 'center';
  label.textBaseline = 'middle';
  var labelWidth = label.getMeasuredWidth();
  var btnWidth = labelWidth + paddingLeft * 2;
  var btnHeight = fontSize * lineHeight + paddingTop * 2;

  label.x = btnWidth / 2;
  label.y = btnHeight / 2;

  var background = new createjs.Shape();
  background.name = 'background';
  //background.cursor = 'pointer';
  background.graphics
    .setStrokeStyle(0)
    .beginStroke(borderColor)
    .beginFill(backgroundColor)
    .drawRoundRect(0, 0,
      btnWidth,
      btnHeight,
      borderRadius);


  var button = new createjs.Container();
  button.cursor = 'pointer';
  button.name = 'button';
  button.addChild(background, label);

  var bounds = button.getBounds();

  var hit = new createjs.Shape();
  hit.graphics.beginFill('#000').drawRect(0, 0, btnWidth, btnHeight);
  button.hitArea = hit;

  // hover
  button.on('mouseover', handleMouse);
  button.on('mouseout', handleMouse);
  // :active
  button.on('mousedown', handleMouse);
  button.on('pressup', handleMouse);


  function handleMouse(e) {
    switch (e.type) {
    case 'mouseover':
    case 'pressup':
      background.graphics.clear()
        .setStrokeStyle(0)
        .beginStroke(borderColorHover)
        .beginFill(backgroundColorHover)
        .drawRoundRect(0, 0,
          btnWidth,
          btnHeight,
          borderRadius);
      break;
    case 'mousedown':
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
      background.graphics.clear()
        .setStrokeStyle(0)
        .beginStroke(borderColor)
        .beginFill(backgroundColor)
        .drawRoundRect(0, 0,
          btnWidth,
          btnHeight,
          borderRadius);
      break;
    }
  }


  return button;
}
