class Shape{
    constructor(){
        super();
    }

    collidesWith(otherShape){
        var axes = this.getAxes().concat(otherShape.getAxes());
        return !this.separationOnAxes(axes, otherShape);
    }

    separationOnAxes(axes, otherShape){
        for(var i = 0; i < axes.length; i++){
            let axis = axes[i];
            projection1 = otherShape.project(axis); 
            projection2 = this.project(axis); 
            if(!projection1.overlaps(projection2)){
                return true;
            }
        }

        return false;
    }
}