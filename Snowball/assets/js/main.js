var game = (function() {

	var Game = function() {
		this.plat1 = null; // #canvas1
		this.plat2 = null; // #canvas2
		this.platW = window.innerWidth * 2; // device's width
		this.platH = window.innerHeight * 2; // device's height
		this.ctx1 = null; // context of canvas1
		this.ctx2 = null; // context of canvas2
		this.score = 0; // game's score
		this.hscore = localStorage.getItem('hscore') || 0;	//highest score
		this.chance = 100;	//red snow rate -> chance/1000
		this.lastTime = 0; // the time before fire the loop
		this.deltaTime = 0; // now - lastTime
		this.fps = 0;	//fps
		this.bgAt = 0;	// background's position (considering the function,it's not using)
		this.imgLoader = { // the obj of images that require to load
			/*bg: {
				item: null,
				src: 'assets/images/morning.png'
			},
			bg2: {
				item: null,
				src: 'assets/images/background2.png'
			},*/
			title: {
				item: null,
				src: 'assets/images/title.png'
			}
		}
	};
	Game.prototype = {
		init: function() {
			this.plat1 = document.getElementById('canvas1');
			this.plat2 = document.getElementById('canvas2');
			this.plat1.style.width = this.plat2.style.width = this.platW / 2 + 'px';
			this.plat1.style.height = this.plat2.style.height = this.platH / 2 + 'px';
			this.plat1.width = this.plat2.width = this.platW;
			this.plat1.height = this.plat2.height = this.platH;
			this.ctx1 = this.plat1.getContext('2d');
			this.ctx2 = this.plat2.getContext('2d');

			// loading images
			var imgs = this.imgLoader;
			for(key in imgs) {
				if(key && typeof imgs[key] === 'object') {
					imgs[key].item = new Image();
					imgs[key].item.src = imgs[key].src;
				}
			}
		},
		// main loop in this game
		gameloop: function() {
			var now = Date.now();
			this.deltaTime = now - this.lastTime;
			this.fps = Math.ceil(1000/this.deltaTime);
			this.lastTime = now;
			
			snow.judgePosition(); // draw the snow
			
			var titleimg = this.imgLoader.title.item;

			if(isStart) {
				snowball.drawSnowball(snowball.ballX, snowball.ballY);
				
				//draw the background
				/*var bgimg = game.imgLoader.bg.item;
				var bgimg1 = game.imgLoader.bg2.item;
				var bgww = game.platW,bghh = game.platH;
				game.ctx2.clearRect(0, 0, bgww, bgww);
				game.ctx2.save();
				game.ctx2.drawImage(bgimg,0,game.bgAt+=5,bgww,bghh);
				game.ctx2.drawImage(bgimg1,0,game.bgAt-bghh,bgww,bghh);
				game.ctx2.drawImage(bgimg1,0,game.bgAt-2*bghh,bgww,bghh);
				game.ctx2.restore();
				if ((game.bgAt-bghh) >= bghh) {
					game.bgAt = bghh;
				}*/
				
				this.ctx1.font = "bold 40px Arial";
				this.ctx1.textAlign = 'center';
				this.ctx1.shadowBlur = 0;
				this.ctx1.fillStyle = '#428394';
				this.ctx1.fillText('Score : ' + this.score, this.platW/2, 70);
				
				this.ctx1.font = "30px Arial";
				this.ctx1.textAlign = 'center';
				this.ctx1.fillStyle = '#60afc3';
				this.ctx1.fillText((snowball.ballSize/10).toFixed(2) + 'kg', this.platW/2, 110);
				//this.ctx1.fillText('fps: '+this.fps,this.platW - 50,180);
			} else {
				this.ctx1.drawImage(titleimg, this.platW / 2 - titleimg.width / 2, this.platH / 7, titleimg.width, titleimg.height);
			}
			
			if (!isPaused) {
				timer = window.requestAnimFrame(this.gameloop.bind(this));
			} else {
				window.cancelAnimationFrame(timer);
			}
			
		}
	};

	return new Game();

})();