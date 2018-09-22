// 渐进线
export const createLinearGradient = (point1, point2, colors=[]) => {
    if(typeof point1 !== 'object' || point1 == null) throw new Error("point1 must be a object");
    if(typeof point2 !== 'object' || point2 == null) throw new Error("point2 must be a object");
    if(point1.x == undefined || typeof (+point1.x) !== 'number' || Number.isNaN(+point1.x)) throw new Error("point2 must be a object");
    var gradient = context.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
    colors.forEach(color => {
        gradient.addColorStop(color[0], color[1]);
    })
    
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.75, 'purple');
    gradient.addColorStop(1, 'yellow');
}


// createLinearGradient({
//     x: 100,
//     y: 200
// }, {
//     x: 200,
//     y: 200
// }, [[0.25, 'blue']]);