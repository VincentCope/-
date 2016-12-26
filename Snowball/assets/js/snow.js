var snow = (function() {

	var Snow = function() {
		this.mount = 15;
		this.catchs = [];
		this.init();
	};
	Snow.prototype = {
		init: function() {
			this.getSnow(this.mount);
		},
		getSnow: function(mounts) {
			for(var i = 0; i < mounts; i++) {
				var obj = this.birnSnow();
				this.catchs.push(obj);
			}
		},
		birnSnow: function() {
			var _size = Math.ceil(Math.random() * 10) + 5,
				_posX = Math.ceil(Math.random() * game.platW),
				_posY = Math.ceil(Math.random() * -30),
				_color,
				_chance = game.chance/1000;
				
			_color = (Math.random() < _chance) ? '#F44336' : '#fff';
			
			return {
				size: _size,
				posX: _posX,
				posY: _posY,
				angle: Math.random() * 50,
				color: _color
			};
		},
		killSnow: function(i) {
			if(this.catchs.length === 0) {
				return false;
			}
			this.catchs.splice(i, 1);
		},
		judgePosition: function() {
			if(this.catchs.length === 0) return false;
			var speed = game.score/200,_h = 0.1,x = 0,y = 0,
			dis2 = function(x, y, x0, y0) {
				var dx = x - x0;
				var dy = y - y0;
				return dx * dx + dy * dy;
			};
			
			game.ctx1.save();
			game.ctx1.clearRect(0, 0, game.platW, game.platH);
			for(var i = 0; i < this.catchs.length; i++) {
				var obj = this.catchs[i];

				if(i % 3 === 0) {
					obj.posX += Math.ceil(Math.sin(_h) * 2);
				}

				obj.posX -= Math.ceil(Math.sin(_h) * 2);
				obj.posY += Math.ceil(Math.cos(_h + obj.angle) + obj.size/2 + speed);
				x = obj.posX;
				y = obj.posY;

				this.drawSnow(x, y, obj.size, obj.color);

				if(x > (game.platW + obj.size * 2) ||
					x < -obj.size * 2 ||
					y > (game.platH + obj.size * 2)) {
					this.catchs.splice(i, 1, this.birnSnow());
				}

				if(isStart) {
					var dis = dis2(x, y, snowball.ballX, snowball.ballY);
					var rs = Math.pow(obj.size + snowball.ballSize, 2);
					if (dis < rs) {
						if (obj.color === '#F44336') {
							snowball.ballSize -= /*obj.size / 10*/snowball.ballSize/2;
							game.chance -= 1;
							this.catchs.splice(i, 1, this.birnSnow());
						} else {
							game.score += 1;
							snowball.ballSize += obj.size / 20;
							game.chance += 1;
							this.catchs.splice(i, 1, this.birnSnow());	
						}
					}
				}
			}
			game.ctx1.restore();
		},
		drawSnow: function(x, y, size, color) {
			game.ctx1.beginPath();
			game.ctx1.moveTo(x, y);
			game.ctx1.arc(x, y, size, 0, 2 * Math.PI);
			game.ctx1.shadowBlur = 5;
			game.ctx1.shadowColor = "rgba(255, 255, 255, 0.6)";
			game.ctx1.fillStyle = color;
			game.ctx1.fill();
		}
	};
	return new Snow();
})();