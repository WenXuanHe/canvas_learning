export default class Vector{

    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }

    getMagnitude(){
        return  Math.sqrt(Math.pow(this.x, 2)+ Math.pow(this.y, 2))
    }

    add(vector){
        var v = new Vector();
        v.x = this.x + vector.x;
        v.y = this.y + vector.y;
        return v;
    }

    subtract(vector){
        var v = new Vector();
        v.x = this.x - vector.x;
        v.y = this.y - vector.y;
        return v;
    }

    dotProduct(vector){
        return this.x * vector.x + this.y * vector.y;
    }

    edge(vector){
        return this.subtract(vector)
    }

    perpendicular(){
        var v = new Vector();
        v.x = this.y;
        v.y = 0 - v.x;
        return v;
    }

    normalize(){
        var v = new Vector();
        var m = this.getMagnitude();
        v.x = this.x / m;
        v.y = this.y / m;
        return v;
    }

    normal(){
        var p = this.perpendicular();
        return p.normalize();
    }

}