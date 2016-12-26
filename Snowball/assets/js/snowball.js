var ball = (function() {
	var Snowball = function() {
		this.ballSize = 30;
		this.ballX = game.platW / 2;
		this.ballY = game.platH / 2;
		this.color = '#fff';
	};
	Snowball.prototype = {
		drawSnowball: function(x, y) {
			//game.ctx1.clearRect(0,0,game.platW,game.platH);
			game.ctx1.beginPath();
			game.ctx1.moveTo(x, y);
			game.ctx1.arc(x, y, this.ballSize, 0, 2 * Math.PI);
			game.ctx1.shadowBlur = 5;
			game.ctx1.shadowColor = "rgba(255, 255, 255,0.6)";
			game.ctx1.fillStyle = this.color;
			game.ctx1.fill();
		},
		judjePosition: function(bx, by, br, pw, ph) {
			var bl = bx - br, // left
				bt = by - br, // top
				bg = bx + br, // right
				bb = by + br; // bottom

			if(bl <= 0 || bg >= pw || bt <= 0 || bb >= ph) {
				isStart = false;
				var startGame = document.getElementById('startGame');
				var musicbg = document.getElementById('musicbg');
				var rules = document.getElementById('rules');
				var pausebtn = document.getElementById('pause');
				
				musicbg.play();
				
				if (game.score > localStorage.getItem('hscore')) {
					localStorage.setItem('hscore', game.score);
				}
				
				rules.innerHTML = '<h1>分数</h1><h2>'+game.score+'</h2><p>最高分：'+localStorage.getItem('hscore')+'</p>';
				rules.style.display = 'block';
				startGame.innerText = '重新开始';
				startGame.style.display = 'block';
				pausebtn.style.display = 'none';
				
				game.score = 0;
				game.chance = 100;

				window.removeEventListener('deviceorientation',controllBall,false);
			}
		},
		controll: function(gamma,beta) {

			snowball.ballX += Math.floor(gamma / 2);
			snowball.ballY += Math.floor(beta / 2);
	
			this.judjePosition(snowball.ballX, snowball.ballY, snowball.ballSize, game.platW, game.platH);	
			
			//this.drawSnowball(this.ballX, this.ballY);
		}
	};
	return Snowball;
})();