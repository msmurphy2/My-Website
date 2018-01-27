function setup() {
	var canvas = document.getElementById('myCanvas');
	var x = 100;
	var y = 150;
	var leftAngle = Math.PI/4;
	var rightAngle = -Math.PI/4;
	
	function draw() {
		var context = canvas.getContext('2d');
		canvas.width = canvas.width;
		this.context = context;
		
		function drawDroid() {
			//body
			this.context.beginPath();
			this.context.rect(x,y,100,100);
			this.context.fillStyle = "#32cd32";
			this.context.fill();
		
			//head
			this.context.beginPath();
			this.context.arc(x+50,y-5,50,0,Math.PI, true);
			this.context.closePath();
			this.context.fillStyle = "#32cd32";
			this.context.fill();
		
			//left eye
			this.context.beginPath();
			this.context.arc(x+35,y-30,5,0,360,false);
			this.context.closePath();
			this.context.fillStyle = "white";
			this.context.fill();
		
			//right eye
			this.context.beginPath();
			this.context.arc(x+65,y-30,5,0,360,false);
			this.context.closePath();
			this.context.fillStyle = "white";
			this.context.fill();
			
			//left antenna
			this.context.beginPath();
			this.context.moveTo(x+30,y-50);
			this.context.lineTo(x+15,y-70);
			this.context.lineTo(x+20,y-70);
			this.context.lineTo(x+35,y-50);
			this.context.closePath();
			this.context.fillStyle = "#32cd32";
			this.context.fill();

			//right antenna
			this.context.beginPath();
			this.context.moveTo(x+65,y-50);
			this.context.lineTo(x+80,y-70);
			this.context.lineTo(x+85,y-70);
			this.context.lineTo(x+70,y-50);
			this.context.closePath();
			this.context.fillStyle = "#32cd32";
			this.context.fill();
		
			//left leg
			this.context.beginPath();
			this.context.rect(x+60,y+100,20,20);
			this.context.fillStyle = "#32cd32";
			this.context.fill();

			//right leg
			this.context.beginPath();
			this.context.rect(x+20,y+100,20,20);
			this.context.fillStyle = "#32cd32";
			this.context.fill();
		}
		
		function drawLeftArm() {
			//left arm
			this.context.beginPath();
			this.context.rect(-20,0,20,90); //x-25,y
			this.context.fillStyle = "#32cd32";
			this.context.strokeStyle = "black";
			this.context.fill();
			this.context.stroke();
		}
		
		function drawRightArm() {
			//right arm
			this.context.beginPath();
			this.context.rect(0,0,20,90);
			this.context.fillStyle = "#32cd32";
			this.context.strokeStyle = "black";
			this.context.fill();
			this.context.stroke();
		}
		
		function update() {
			leftAngle += 0.05;
			rightAngle -= 0.05;
		}
		
		context.save();
		drawDroid();
		context.save();
		context.translate(x,y);
		context.rotate(leftAngle);	
		drawLeftArm();
		context.rotate(-leftAngle);
		context.save();
		context.translate(100,0);
		context.rotate(rightAngle); 
		drawRightArm();
		context.restore();
		context.restore();
		context.restore();
		x = (x+2)%200;
		y = (y+2)%300;
		window.requestAnimationFrame(update);
		window.requestAnimationFrame(draw);
	}
	window.requestAnimationFrame(draw);
}
window.onload = setup;