var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var CubeStar = undefined;
var SpinningCubeStar = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    CubeStar = function CubeStar(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    CubeStar.prototype.init = function(drawingState) {
		
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["texCubeStar-vs", "texCubeStar-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                    0,0,0,   	0,1,.5,     0,.5,1.25,
		   0,1,.5,   	0,1.5,0,   	0,1.5,1,
		   0,1.5,.75, 	0,2,1.25, 	0,1.5,1.75,
		   0,1.5,2,   	0,1.5,2.5,  0,1,2, 
		   0,1,2,   	0,0,2.5,   	0,.5,1.25,
		   0,1,.5,   	0,1.5,1,   	0,.5,1.25,
		   0,.5,1.25, 	0,1.5,1,   	0,1,2,
		   0,1,2,   	0,1.5,1,   	0,1.5,2,	//x=0
		   1,0,0,   	1,1,.5,     1,.5,1.25,
		   1,1,.5,   	1,1.5,0,   	1,1.5,1,
		   1,1.5,.75, 	1,2,1.25, 	1,1.5,1.75,
		   1,1.5,2,   	1,1.5,2.5,  1,1,2, 
		   1,1,2,   	1,0,2.5,   	1,.5,1.25,
		   1,1,.5,   	1,1.5,1,   	1,.5,1.25,
		   1,.5,1.25, 	1,1.5,1,   	1,1,2,
		   1,1,2,   	1,1.5,1,   	1,1.5,2,	//x = 1
		   1,1,.5,   	0,1,.5,   	0,0,0,
		   1,1,.5,   	1,0,0,    	0,0,0,	//1
		   1,1.5,0,  	0,1.5,0,  	0,1,.5,
		   1,1.5,0,  	1,1,.5,   	0,1,.5,	//2
		   1,1.5,.75,  	0,1.5,.75,  0,1.5,0,
		   1,1.5,.75,  	1,1.5,0,  	0,1.5,0,	//3
		   1,2,1.25,  	0,2,1.25,  	0,1.5,.75, 
		   1,2,1.25,  	1,1.5,.75,  0,1.5,.75,	//4
		   1,1.5,1.75,  0,1.5,1.75, 0,2,1.25,
		   1,1.5,1.75,  1,2,1.25,  	0,2,1.25, //5
		   1,1.5,2.5,	0,1.5,2.5,	0,1.5,2,
		   1,1.5,2.5,	1,1.5,2,	0,1.5,2,//6
		   1,1,2,		0,1,2,		0,1.5,2.5,
		   1,1,2,		1,1.5,2.5,	0,1.5,2.5,//7
		   1,0,2.5,		0,0,2.5,	0,1,2,
		   1,0,2.5,		1,1,2,		0,1,2, //8
		   1,.5,1.25,	0,.5,1.25,	0,0,2.5,
		   1,.5,1.25,	1,0,2.5,	0,0,2.5,
		   1,0,0,		0,0,0,		0,.5,1.25,
		   1,0,0,		1,.5,1.25,	0,.5,1.25,//10
					 
                ] },
                vnormal : {numComponents:3, data: [
                    -1,0,0,-1,0,0,-1,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-.25,0,0,-.25,0,0,-.25,0,0,
					-1,0,0,-1,0,0,-1,0,0,
					-.625,0,0,-.625,0,0,-.625,0,0,
					-.875,0,0,-.875,0,0,-.875,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-1,0,0,-1,0,0,-1,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-.25,0,0,-.25,0,0,-.25,0,0,
					-1,0,0,-1,0,0,-1,0,0,
					-.625,0,0,-.625,0,0,-.625,0,0,
					-.875,0,0,-.875,0,0,-.875,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,//
					0,.5,-1,0,.5,-1,0,.5,-1,
					0,.5,-1,0,.5,-1,0,.5,-1,
					0,-.5,-.5,0,-.5,-.5,0,-.5,-.5,
					0,-.5,-.5,0,-.5,-.5,0,-.5,-.5,
					0,.75,0,0,.75,0,0,.75,0,
					0,.75,0,0,.75,0,0,.75,0,
					0,.5,-.5,0,.5,-.5,0,.5,-.5,
					0,.5,-.5,0,.5,-.5,0,.5,-.5,
					0,.5,.5,0,.5,.5,0,.5,.5,
					0,.5,.5,0,.5,.5,0,.5,.5,
					0,.5,0,0,.5,0,0,.5,0,
					0,.5,0,0,.5,0,0,.5,0,
					0,-.5,.5,0,-.5,.5,0,-.5,.5,
					0,-.5,.5,0,-.5,.5,0,-.5,.5,
					0,.5,1,0,.5,1,0,.5,1,
					0,.5,1,0,.5,1,0,.5,1,
					0,-1.25,-.5,0,-1.25,-.5,0,-1.25,-.5,
					0,-1.25,-.5,0,-1.25,-.5,0,-1.25,-.5,
					0,-1.25,.5,0,-1.25,.5,0,-1.25,.5,
					0,-1.25,.5,0,-1.25,.5,0,-1.25,.5,
					]},
				vtexcoord : {numComponents:2, data: [
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,//
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,//
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,1,
				]}
				};
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
			var texStar = gl.createTexture();
			
			gl.activeTexture(gl.TEXTURE2);
				gl.bindTexture(gl.TEXTURE_2D, texStar);
				gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA, 1,1,0,gl.RGBA, gl.UNSIGNED_BYTE, null);
			var imageStar = new Image();
			imageStar.crossOrigin = "anonymous";
			
			imageStar.onload = function() {
				gl.activeTexture(gl.TEXTURE2);
				gl.bindTexture(gl.TEXTURE_2D, texStar);
				gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageStar);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				};
			imageStar.src = "star.jpg"; 
		}
		
    };
				
    CubeStar.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
		var normal = modelM;
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM, normalMatrix: normal});
			shaderProgram.program.texSampler = gl.getUniformLocation(shaderProgram.program, "texSamplerStar");
			gl.uniformli(shaderProgram.program.texSamplerStar, 2);
			twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
        
    };
    CubeStar.prototype.center = function(drawingState) {
        return this.position;
    };


    ////////
    // constructor for Cubes
    SpinningCubeStar = function SpinningCubeStar(name, position, size, color, axis) {
        CubeStar.apply(this,arguments);
    };
    SpinningCubeStar.prototype = Object.create(CubeStar.prototype);
    SpinningCubeStar.prototype.draw = function(drawingState) {
		// we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var theta = Number(drawingState.realtime)/500.0;
		twgl.m4.rotateY(modelM, theta, modelM);
		twgl.m4.setTranslation(modelM,this.position,modelM);
		var normal = modelM;
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM, normalMatrix: normal});
			shaderProgram.program.texSampler = gl.getUniformLocation(shaderProgram.program, "texSamplerStar");
			gl.uniform1i(shaderProgram.program.texSampler, 2);
			twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
        
    };
    SpinningCubeSuperMan.prototype.center = function(drawingState) {
        return this.position;
    };
	
})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.
grobjects.push(new SpinningCubeStar("Green Star",[-2.5,1, 0],0.5, [0.5,1,0]) );
grobjects.push(new SpinningCubeStar("L. Green Star",[ 2.5,1, 0],0.5 , [0,0.9,0.4]));