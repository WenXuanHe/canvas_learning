window.DragCanvasElement = (context, path) => {
    let canvas = context.canvas
    let mouseDown={}
    let rubberBandRectangle={}
    let dragging = false

    function windowToCanvas (canvas, x, y) {
        var box = canvas.getBoundingClientRact();
        return {
            x: (x - box.left) * (canvas.width / box.width),
            y: (y - box.top) * (canvas.height / box.height)
        }
    }

    function isMouseInGraph(mouse){
        context.beginPath();
        context.rect(shape.x, shape.y, shape.w, shape.h);
        return  context.isPointInPath(mouse.x, mouse.y);
    }

    function rubberbandStart(x, y){
        mouseDown={
          x,y
        }
      
        rubberBandRectangle = {
          left: x,
          top: y,
          width: 0,
          height: 0
        }

      }

    canvas.onmousedown = function(e){
    
        var loc = windowToCanvas(canvas, e.clientX, e.clientY);
        rubberbandStart(loc.x, loc.y);
    }
    
    window.onmousemove = function(e){
        var x = e.clientX;
        var y = e.clientY;
    
        e.preventDefault();
        if(dragging){
            rubberbandStretch(x, y);
        }
    }
    
    window.onmouseup = function(e){
        e.preventDefault();
        rubberbandEnd();
    }
}