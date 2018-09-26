
// var Game = window.Game;
// var Sprite = window.Sprite;
// var ImagePainter = window.ImagePainter;

class Swiper extends Game{
    constructor(){
        super(...arguments)
        this.pages=[];
       this.importPages()
       this.event()
    }

    importPages(){
        this.queueImage('./images/css3.png')
        this.queueImage('./images/html5.png')
        this.queueImage('./images/javascript.png')
        this.queueImage('./images/nodejs.png')

        this.loadImages().then((images) => {
            for(var i = 0; i < images.length; i++){
                let image = images[i]
                let name = 'page_' + i
                let page = new Sprite(name, new ImagePainter(image))
                page.top = 0 + i * this.context.canvas.height;
                page.left =  0;
                page.width = this.context.canvas.width;
                page.height = this.context.canvas.height;
                // 绘制好
                page.draw(this.context)

                this.pages.push(page)
            }
        })
    }

    startAnimate(){

    }

    paintUnderSprites(){

    }

    paintOverSprites(){

    }

    endAnimate(){
        
    }

    slide(targes, index){
        var _self = this;
        window.anime.timeline().add({
            targets: targes,
            translateY: -this.context.canvas.height * index,
            duration: 2000,
            easing: 'easeOutExpo',
            update(){
                _self.clearScreen()
                _self.pages.map(page => page.draw(_self.context))
            }
        })
    }

    event(){
        var index = 0;
        this.context.canvas.addEventListener('click', () => {
           index++;
           this.slide(this.pages, index <= this.pages.length - 1 ? index : index=0)
        })
    }
}


new Swiper('swiper', 'canvas')