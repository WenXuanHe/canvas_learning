let moveToFunction = CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.moveTo = function(context, x, y){
  moveToFunction.apply(context, [x, y])
  this.lastMoveToLocation.x = x;
  this.lastMoveToLocation.y = y;
}

CanvasRenderingContext2D.prototype.dashedLineTo = function(x, y, dashLength=5){
  var startx = this.lastMoveToLocation.x;
  var starty = this.lastMoveToLocation.y;

  var deltax = x - startx;
  var deltay = y - starty;
  var numDashes = Math.floor(Math.sqrt(deltax * deltax + deltay * deltay) / dashLength);

  for(var i = 0; i < numDashes; i++){
    this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startx+(deltax/numDashes)*i, starty+(deltay/numDashes)*i,);
  }
}