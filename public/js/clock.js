var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasImage = document.querySelector('#canvasImage');
const 
    FONT_HEIGHT = 15,  // 字体高度
    MARGIN = 35, 
    HAND_TRUNCATION = canvas.height / 25, 
    HOUR_HAND_TRUNCATION = canvas.width / 10,
    NUMERAL_SPACING = 20, 
    RADIUS = canvas.width/2 - MARGIN, 
    // 圆的半径
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

function drawCircle(){
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2,RADIUS, 0, Math.PI*2, true)
    context.stroke();
}

// 画刻度
function drawNumerals(){
    var numerals  = Array.from(Array(12), (_,index) => index+1);
    var angle = 0;
    var numeralsWidth = 0;

    numerals.forEach(numeral => {
        // 和cavas横坐标轴对比，1的刻度是-60度， 所以减3
        angle = Math.PI / 6 * (numeral-3);
        // 得到刻度的宽度
        numeralsWidth = context.measureText(numeral).width;
        context.fillText(numeral,
         canvas.width/2 + Math.cos(angle)*HAND_RADIUS - numeralsWidth/2,
         canvas.height/2 + Math.sin(angle)*HAND_RADIUS + FONT_HEIGHT/3);
    })
}
// 画中心点
function drawCenter(){
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
    context.fill();
}

// 画表的指针
function drawHand(loc, isHour){
    // 统一以60为单位，小时还得x5， 以横坐标为参考，还需减去90度
    var angle = Math.PI * 2 * (loc/60) - Math.PI/2;
    // 小时的指针要短些
    var handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;
    context.moveTo(canvas.width/2, canvas.height/2);
    context.lineTo(
        canvas.width/2+Math.cos(angle)* handRadius, 
        canvas.height/2+Math.sin(angle)* handRadius);
    context.stroke();
}

function drawHands(){
    var date = new Date();
    var hour = date.getHours();
    // 12个刻度
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour*5+(date.getMinutes()/60)*5, true, 0.5)
    drawHand(date.getMinutes(), false, 0.5)
    drawHand(date.getSeconds(), false, 0.2)
}

 function drawClock(){
     context.clearRect(0, 0, canvas.width, canvas.height);
     drawCircle();
     drawCenter();
     drawHands();
     drawNumerals();
     updateClockImage();
 }

//  离屏canvas
 function updateClockImage(){
    canvasImage.src = canvas.toDataURL();
 }

 context.font = FONT_HEIGHT + "px Arial";
 loop = setInterval(drawClock, 1000);
 