/**
 * 精灵表绘画师
 */
class SpriteSheetPainter{
    constructor(cells){
        super();
        this.cells = cells;
        this.cellsIndex = 0;
    }

    advance(){
        // 到了精灵表的最后一帧，
        if(this.cellsIndex === this.cells.length - 1){
            this.cellsIndex = 0;
        }else{
            this.cellsIndex++;
        }
    }

    paint(sprite, context){
        var cell = this.cells[this.cellsIndex];
        context.drawImage(sprite, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h);
    }


}