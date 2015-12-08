var detectBrowser = function (name) {
  if (navigator.userAgent.toLowerCase().indexOf(name) > -1) {
    return true;
  } else {
    return false;
  }
};
var width = parseInt(window.screen.width);
var scale = width / 640;
var userScalable = 'no';
if (detectBrowser("qq/")) userScalable = 'yes';
document.querySelector('[name="viewport"]').setAttribute(
  'content', 'target-densitydpi=device-dpi,width=640,user-scalable=' + userScalable + ',initial-scale=' + scale);
