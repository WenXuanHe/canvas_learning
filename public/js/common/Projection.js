// 检测是否碰撞
class Projection{
    constructor(min, max){
        this.min = min;
        this.max = max;
    }

    overlaps(projection){
        return this.max > projection.min && projection.max > this.min;
    }
}