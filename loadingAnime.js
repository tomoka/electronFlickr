/* canvas要素のノードオブジェクト */
var canvas = document.getElementById( 'canvasLoading' );
/* 2Dコンテキスト */
var ctx = canvas.getContext('2d');

var winW = 300;
var winH = 300;

var degree = 0;     //中心点からの角度
var drawRadius = 10;   //動かしたい円の半径
var moveRadius = 50;   //動いてもらいたい円の半径

var CENTER_X = 150;
var CENTER_Y = 75;

var clearCanvas;

function animationLoop(){

  //x座標とy座標を計算
  var x = Math.cos( Math.PI / 180 * degree) * moveRadius + CENTER_X;
  var y = Math.sin( Math.PI / 180 * degree) * moveRadius + CENTER_Y;


  ctx.clearRect(0,0,winW,winH);
  ctx.beginPath();
  ctx.arc(x,y,drawRadius, 0 * (Math.PI / 180), 360 * (Math.PI / 180),true);
  ctx.fillStyle = 'rgb(192, 192, 192)';
  ctx.fill();
  ctx.closePath();
  degree++;

  _animationID = window.requestAnimationFrame(animationLoop);
  if(degree >= 360){
    window.cancelAnimationFrame(_animationID);
  }
}
animationLoop();
