

export default class drawPolygon{
  constructor(props){
    this.mouseDown = props.mouseDown
    this.radius = props.radius
    this.sides = props.sides
    this.angle = props.angle
  }

  Point(x, y){
    this.x = x;
    this.y = y;
  }

  getPolygonPoints(centerX, centerY, radius, sides, startAngle){
    var points = [];
    var angle = startAngle || 0;
    let i =0
    while(i < sides){
      points.push(new this.Point(centerX + radius * Math.sin(angle), centerY - radius * Math.cos(angle)))
      angle += 2 * Math.PI / sides
      i++;
    }

    return points
  }

  createPolygonPath(centerX, centerY, radius, sides, startAngle){
    var points = this.getPolygonPoints.call(this, ...arguments)

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    let i = 1;
    while(i < sides){
      context.lineTo(points[i].x, points[i]y);
      i++;
    }

    context.closePath();
  }

  drawRubberbandShape(loc, sides, startAngle){
    this.createPolygonPath(this.mouseDown.x, this.mouseDown.y, this.radius, this.sides, this.angle)
    context.stroke();
    context.fill();
  }
}