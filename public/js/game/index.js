class Game {
    constructor(gameName, canvasId){
        var canvas = document.getElementById(canvasId)

        this.context = canvas.getContext('2d');
        this.gameName = gameName;
        this.sprites = [];
        this.keyListeners = [];

        this.HIGH_SCORES_SUFFIX = '_highscores';

        // image loading
        this.imageLoadingProgressCallback;
        this.images=[];
        this.imageUrls = [];
        this.imagesLoaded = 0;
        this.imagesFailedToLoad = 0;
        this.imagesIndex = 0;
        // time
        this.startTime = 0;
        this.lastTime = 0;
        this.gameTime = 0;
        this.fps = 0;
        this.STARTING_FPS = 60;

        this.paused = false;
        this.startedPauseAt = 0;
        this.PAUSE_TIMEOUT = 100;

        // sound
        this.soundOn = true;
        this.audio = new Audio();
        this.NUM_SOUND_CHANNELS = 10;
        this.soundChannels = Array.apply([], Array(this.NUM_SOUND_CHANNELS)).map(() => new Audio());
       
        // event
        window.onkeypress = (e) => this.keyPressed(e)
        window.onkeydown = (e) => this.keyPressed(e)
    }

    getImage(imageUrl){
        return this.images[imageUrl]
    }

    imageLoadedCallback(){
        this.imagesLoaded++
    }

    imageLoadedErrorCallback(){
        this.imagesFailedToLoad++
    }

    loadImage(imageUrl){
        return new Promise((resolve, reject) => {
            var image = new Image();

            image.src = imageUrl;
            image.addEventListener('load', (e) => {
                this.imageLoadedCallback(e)
                resolve(image)
            })
            image.addEventListener('error', (e) => {
                this.imageLoadedErrorCallback(e)
                reject(e)
            })
            this.images.push(image)
        })
    }

    loadImages(){
       // if(this.imagesIndex < this.imageUrls.length){
         //   this.loadImage(this.imageUrls[this.imagesIndex])
           // this.imagesIndex++;
        // }

        return Promise.all(this.imageUrls.map(url => this.loadImage(url)))

        // return (this.imagesLoaded + this.imagesFailedToLoad) / this.imageUrls.length * 100
        
    }

    queueImage(imageUrl){
        this.imageUrls.push(imageUrl)
    }

    start(){
        this.startTime = +new Date()
        window.requestAnimationFrame((time) => {
            this.animate.call(this, time)
        })
    }

    animate(time){
        if(this.paused){
            setTimeout(() => {
                this.animate.call(this, time)
            }, this.PAUSE_TIMEOUT)
        }else{
            this.tick(time)
        }
    }

    tick(time){
        this.updateFrameRate(time);
        this.gameTime = +new Date() - this.startTime
    }

    updateFrameRate(time){
        if(this.lastTime === 0) this.fps = this.STARTING_FPS
        else this.fps = 1000 / (time - this.lastTime)
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.context.canvas.width,  this.context.canvas.height)
    }

    updateSprites(time){
        this.sprites.forEach(sprite => {
            sprite.update(time)
        })
    }

    paintSprites(){
        this.sprites.forEach(sprite => {
            if(sprite.visible){
                sprite.paint(this.context)
            }
        })
    }

    togglePaused(){
        var now = +new Date()
        this.paused = !this.paused

        if(this.paused){
            this.startedPauseAt = now
        }else{
            this.startTime = this.startTime + now - this.startedPauseAt
            this.lastTime = now
        }

    }

    pixelsPerFrame(time, velocity){
        return velocity / this.fps
    }

    getHighScores(){
        var key = this.gameName + this.HIGH_SCORES_SUFFIX
        var highScoreString = localStorage[key]

        if(typeof highScoreString === 'undefined'){
            localStorage[key] = JSON.stringify([])
        }

        return JSON.parse(localStorage[key])
    }

    setHighScore(highScore){
        var key = this.gameName + this.HIGH_SCORES_SUFFIX
        var highScores = localStorage[key]

        highScores.push(highScore)
        localStorage[key] = JSON.stringify(highScores)
    }

    clearHighScores(){
        localStorage[this.gameName + this.HIGH_SCORES_SUFFIX] = JSON.stringify([])
    }

    addKeyListener(keyAndListener){
        this.keyListeners.push(keyAndListener)
    }

    findKeyListener(key){
        let current = this.keyListeners.find(item => item.key === key)
        return current ? current.listener : current
    }

    keyPressed(e){
        var key
        
        switch(e.keyCode){
            case 32: key='space'; break;
            case 68: key='d'; break;
            case 75: key='k'; break;
            case 83: key='s'; break;
            case 80: key='p'; break;
            case 37: key='left arrow'; break;
            case 39: key='right arrow'; break;
            case 38: key='up arrow'; break;
            case 40: key='down arrow'; break;
        }

        var listener = this.findKeyListener(key)

        listener && listener()
    }

    canPlayOggVorbis(){
        return '' !== this.audio.canPlayType('audio/ogg; codecs="vorbis"')
    }

    canPlayMp3 (){
        return '' !== this.audio.canPlayType('audio/mpeg')
    }

    getAvailableSoundChannel(){
        var audio;

        for(var i = 0; i < this.NUM_SOUND_CHANNELS; ++i){
            audio = this.soundChannels[i]
            if(audio.played && audio.played.length > 0){
                if(audio.ended){
                    return audio
                }
            }else{
                if(!audio.ended){
                    return audio
                }
            }
        }

        return; // all channel in use
    }

    playSound(id){
        var channel = this.getAvailableSoundChannel()
        var element = document.querySelector('#'+ id)

        if(channel && element){
            channel.src = element.src === '' ? element.currentSrc : element.src
            channel.load()
            channel.play()
        }
    }

    addSprite(sprite){
        this.sprites.push(sprite)
    }

    getSprite(name){
        return this.sprites.find(sprite => sprite.name === name)
    }

    startAnimate(){

    }

    paintUnderSprites(){

    }

    paintOverSprites(){

    }

    endAnimate(){

    }
}

window.Game = Game
