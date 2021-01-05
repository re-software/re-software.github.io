class Doodle {
  constructor() {
    this.cont = document.querySelector("#cont");
    this.animationFrame = 0;
    this.left = 300;
    this.plates = [];

    this.pointSize = {
      width: 50,
      height: 50,
      top: 0,
      left: 0
    };
    const body = document.body.getBoundingClientRect();
    this.canvasSize = {
      width: 300,
      height: body.height
    };

    this.jump = 0;
    this.jumpHeight = 150;
    this.dir = "down";
    this.changeOffset = 0;
    this._score = 0;

    this._mode;
    this._setHandlers();
    this._showMenu();
  }

  start() {
    this._mode = "started";
    this._mainTheme = new Audio("romanJump.mp3");
    this._mainTheme.loop = true;
    this._mainTheme.play();

    this.cont.innerHTML = `
					<canvas id="canvas" class="canvas"></canvas>
					<div id="point" class="point"></div>
					<div id="plates"></div>
					<div id="score" class="score_cont"></div>
					<img src="dodl.PNG" id="dodl" style="display:none;">
				`;

    this.canvas = document.getElementById("canvas");

    this.canvas.width = this.canvasSize.width;
    this.canvas.height = this.canvasSize.height;

    this.ctx = canvas.getContext("2d");
    const ctx = this.ctx;

    this._generatePlates();

    const l = this.plates.length - 1;
    this.currentPlate = l;
    this.pointSize.top = this.plates[l].top - 40;
    this.pointSize.left = this.plates[l].left;
    this.left = this.plates[l].left;

    this.offsetY = -this.plates[this.currentPlate].top + 600;
    this._redraw();

    this.animationFrame = window.requestAnimationFrame(() => {
      this._draw(this);
    });
  }
  _draw(that) {
	const score = that.plates[that.currentPlate]._score;

    if (that._checkCollision() && that.dir !== "up") {
      that.dir = "up";
      that.jump = that.jumpHeight;
    }

    if (that.jump <= 0) {
      that.jump = 0;
      that.dir = "down";
    }

    if (that.jump > 400) {
		const name = localStorage.getItem("jump_game_username");
		that.end(score);
		const userdata = this._getUserData(name).then(doc=>{
			if(doc.data().score < score){
				this._saveUserData(name,score);
			}
		});
	}
	
    const speedUp = 8;
    let speedDown = 6;

    if (that.dir === "up") {
      that.pointSize.top = that.pointSize.top - speedUp;
      that.jump -= speedUp;
    } else if (that.dir === "down") {
      if (that.jump > that.jumpHeight - 30) {
        speedDown = 4;
      }
      if (that.jump > that.jumpHeight) {
        speedDown = 10;
      }
      that.pointSize.top = that.pointSize.top + speedDown;
    //   console.log("sin", Math.sin(that.jump));

      // that.pointSize.top = that.pointSize.top + Math.sin( that.jump );
      that.jump += speedDown;
    }

    that.pointSize.left = that.left;
    that._redraw();


    requestAnimationFrame(() => {
      that._draw(that);
    });
   
    that.cont.querySelector("#score").innerHTML = "Your score: " + score;

    if (score === that.plates[0]._score) {
	//   that._generatePlates(10, score+9,score+9);

	//   const l = this.plates.length - 1;
	// //   this.currentPlate = l;
	//   this.pointSize.top = this.plates[l].top - 40;
	//   this.pointSize.left = this.plates[l].left;
	// //   this.offsetY = -this.plates[this.currentPlate].top + 600;
	//   this.currentPlate = 0;
	//   that.dir = "up";
    }
  }
  // [todo] collect alcohol on platforms to get some bonuses;
  end(score=0) {
    this._mainTheme.pause();
	window.cancelAnimationFrame(this.animationFrame);

	this.offsetY = 0;
	this._mode = "failed";
	cont.innerHTML = `<div class="loose_screen">
					<div>
						YOU LOSE
					</div>
					<div>
						Your score : ${score}
					</div>
					<div>
						<button class="restart_button button gradient_button_2 primary" id="restart_btn" tabindex=1 autofocus>Restart</button>
					</div>
				</div>`;
	this.cont.querySelector("#restart_btn").addEventListener("click", () => {
	  this.start();
	});
  }
  _saveUserData(name,score){
	  	db.collection("players").doc(name).set({
			name,
			score
		}).then(function(docRef) {
   			console.log("User updated", docRef);
		})
		.catch(function(error) {
			console.error("Error updating user", error);
		});
  }
  _getUserData(name){
		return db.collection("players").doc(name).get();
  }
  _getAllUsers(){
	  let users = [];
	  return new Promise((res,rej)=>{
		  db.collection("players").get().then(all=>{
			all.forEach((doc) => {
				users.push(doc.data());
			});
			res(users);
		  })
	  })
  }
  _showMenu() {
	this._mode = "menu";
	const oldUsername = localStorage.getItem("jump_game_username")||`anal-clown_${(Math.random()).toFixed(5)}`;
	cont.innerHTML = `<div class="preload_spinner"></div>`
	this._getAllUsers().then(users=>{
		const maxUsers = users.filter(u=>u.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
		cont.innerHTML = `<div class="main_menu">
						<div class="game_name">
						<div class="game_name_background"></div>
							Jump with director
							<div class="username_wrap">
								<div class="username_hint">Your user name</div>
								<input class="username_input" id="usernameInput" type="text" value="${oldUsername}">
							</div>
							<div class="start_button">
								<button class="button gradient_button_2 danger" id="start_btn" tabindex=1 autofocus>Start</button>
							</div>
							<div class="users_score_wrap">
								<div class="users_score_header">Best players:</div>
								<ol class="users_list">
									${maxUsers.reduce((all,user)=>{
										all+=`<li class="user_score"><span class="name">${user.name}</span>:<span class="score">${user.score}</span></li>`;return all;
									},"")
									}
								</ol>
							</div>
							<div class="version">ver. 0.0.3</div>
						</div>
					</div>`;
	
		this.cont.querySelector("#start_btn").addEventListener("click", () => {
			let username = (cont.querySelector("#usernameInput").value)||oldUsername;
			if(username === "RussmanMom"){
				username = oldUsername;
			}
			localStorage.setItem("jump_game_username",username);
			const user = users.filter(u=>u.name===username)[0]||{score:0};
			this._saveUserData(username,user.score);
		  this.start();
		});
	})
  }
  _checkCollision() {
    const pointHeight = this.pointSize.height;
    const pointWidth = this.pointSize.width;

    const pointBottom = this.pointSize.top + 40;
    const pointLeft = this.pointSize.left;

    let collision = false;
    this.plates.map(plate => {
      const bottomCol =
        plate.top - pointBottom < 5 && plate.top - pointBottom > -5;
      const leftCol =
        plate.left <= pointLeft + pointWidth &&
        plate.left + plate.width > pointLeft;
      if (bottomCol && leftCol) {
        collision = true;
        if (this.currentPlate > plate.id) {
          this._score++;
		}
		console.log("check colision");
        this.currentPlate = plate.id;
        return collision;
      }
    });
    return collision;
  }

  _getRandomRange(from, to) {
    return Math.floor(from + (to - from + 1) * Math.random());
  }

  _generatePlates(count = 1000, score = 1000,startCount=0) {
	this.plates = [];
	let c = startCount;
    for (let i = 0; i < count; i++) {
      this.plates.push({
        id: i,
        width: this._getRandomRange(30, 150),
        height: 20,
        top: i * 100,
        left: this._getRandomRange(0, 250),
        _score: score - i
      });
    }
    this.plates.map(plate => {
      this.ctx.fillRect(plate.left, plate.top, plate.width, plate.height);
    });
  }
  _redraw() {
    const ctx = this.ctx;
    const ps = this.pointSize;
	console.log("plates",this.plates,this.currentPlate)
    const plt = -this.plates[this.currentPlate].top + 300;

    if (!this.offsetY) {
      this.offsetY = -this.plates[this.currentPlate].top + 300;
    } else if (this.offsetY - plt <= -150) {
      this.changeOffset = 300;
    }
    if (this.changeOffset) {
      let cameraSpeed = 10;
      if (this.changeOffset < 30) {
        cameraSpeed = 5;
      }
      this.changeOffset -= cameraSpeed;
      this.offsetY += cameraSpeed;
    }
    ctx.save();
    const offsetY = this.offsetY;
    ctx.translate(0, offsetY);

    this.ctx.clearRect(
      0,
      -offsetY,
      this.canvasSize.width,
      this.canvasSize.height
    );

    this.ctx.fillStyle = "lightgreen";
    this.plates.map(plate => {
      this.ctx.fillRect(plate.left, plate.top, plate.width, plate.height);
    });

    this.ctx.fillStyle = "red";

    ctx.drawImage(
      document.querySelector("#dodl"),
      ps.left,
      ps.top,
      ps.width,
      ps.height
    );
    ctx.restore();
  }

  _setHandlers() {
    document.addEventListener("keydown", e => {
      const step = 20;
	  const right = 290;
	  const left = -40;
      if (e.key === "ArrowLeft") {
        this.left = this.left - step <= left ? right : this.left - step;
      } else if (e.key === "ArrowRight") {
        this.left = this.left + step >= right ? left : this.left + step;
      }

      if (e.key === "Enter") {
        if (this._mode === "failed" || this._mode === "menu") {
          this.start();
        }
      }
    });
    // const handleOrientation = (event) => {
    // 	var x = event.beta;  // In degree in the range [-180,180]
    // 	var y = event.gamma; // In degree in the range [-90,90]
    // 	var maxY = 1000;
    // 	// output.innerHTML = "beta : " + x + "\n";
    // 	// output.innerHTML += "gamma: " + y + "\n";

    // 	// Because we don't want to have the device upside down
    // 	// We constrain the x value to the range [-90,90]
    // 	if (x > 90) { x = 90 };
    // 	if (x < -90) { x = -90 };

    // 	// To make computation easier we shift the range of
    // 	// x and y to [0,180]
    // 	x += 90;
    // 	y += 90;

    // 	// 10 is half the size of the ball
    // 	// It center the positioning point to the center of the ball
    // 	this.p.style.left = y;//(maxY * y / 180 - 10) + "px";
    // 	const step = 5;
    // 	this.left = y < 90 ? this.left - step : this.left + step;

    // 	// this.cont.innerHTML = "beta : " + x + "\n"+"gamma: " + y + "\n";
    // 	console.log(x, y);
    // }

    // window.addEventListener('deviceorientation', handleOrientation);
  }
}
