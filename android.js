function setup() {
	var canvas = document.getElementById('myCanvas');
	
	var x = 100;
	var y = 150;
	function draw() {
		var context = canvas.getContext('2d');
		canvas.width = canvas.width;
		this.context = context;
		
		//body
		context.beginPath();
		context.rect(x,y,100,100);
		context.fillStyle = "#32cd32";
		context.fill();
		
		//head
		context.beginPath();
		context.arc(x+50,y-5,50,0,Math.PI, true);
		context.closePath();
		context.fillStyle = "#32cd32";
		context.fill();
		
		//left eye
			context.beginPath();
			context.arc(x+35,y-30,10,0,360,false);
			context.closePath();
			context.fillStyle = 'white';
			context.fill();
		
		//right eye
			context.beginPath();
			context.arc(x+65,y-30,10,0,360,false);
			context.closePath();
			context.fillStyle = 'white';
			context.fill();
			
		//left antenna
		context.beginPath();
		context.moveTo(x+30,y-50);
		context.lineTo(x+15,y-70);
		context.lineTo(x+20,y-70);
		context.lineTo(x+35,y-50);
		context.closePath();
		context.fillStyle = "#32cd32";
		context.fill();

		//right antenna
		context.beginPath();
		context.moveTo(x+65,y-50);
		context.lineTo(x+80,y-70);
		context.lineTo(x+85,y-70);
		context.lineTo(x+70,y-50);
		context.closePath();
		context.fillStyle = "#32cd32";
		context.fill();
		
		//left arm
		context.beginPath();
		context.rect(x-25,y,20,90);
		context.fillStyle = "#32cd32";
		context.fill();
	
		//right arm
		context.beginPath();
		context.rect(x+105,y,20,90);
		context.fillStyle = "#32cd32";
		context.fill();
		
		//left leg
		context.beginPath();
		context.rect(x+60,y+100,20,20);
		context.fillStyle = "#32cd32";
		context.fill();

		//right leg
		context.beginPath();
		context.rect(x+20,y+100,20,20);
		context.fillStyle = "#32cd32";
		context.fill();

		x = (x+2)%200;
		y = (y+2)%300;
		window.requestAnimationFrame(draw);
	}
	window.requestAnimationFrame(draw);
}
window.onload = setup;