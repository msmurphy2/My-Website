var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var CubeSuperMan = undefined;
var SpinningCubeSuperMan = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    CubeSuperMan = function CubeSuperMan(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    CubeSuperMan.prototype.init = function(drawingState) {
		
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["texCube-vs", "texCube-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                    0,0,3,	0,4,0,	0,4,6,
					0,4,0,	0,5,1,	0,4,1,	
					0,5,5,	0,4,5,	0,4,6,
					0,5,1,	0,4,1,	0,4,5,
					0,5,1,	0,5,5,	0,4,5, //x=0
					1,0,3,	1,4,0,	1,4,6,
					1,4,0,	1,5,1,	1,4,1,	
					1,5,5,	1,4,5,	1,4,6,
					1,5,1,	1,4,1,	1,4,5,
					1,5,1,	1,5,5,	1,4,5, //x = 1
					1,4,0,	0,4,0,	0,0,3,
					1,4,0,	1,0,3,	0,0,3,
					1,5,1,	0,5,1,	0,4,0,
					1,5,1,	1,4,0,	0,4,0,
					1,5,5,	0,5,5,	0,5,1,
					1,5,5,	1,5,1,	0,5,1,
					1,4,6,	0,4,6,	0,5,5,
					1,4,6,	1,5,5,	0,5,5,
					1,0,3,	0,0,3,	0,4,6,
					1,0,3,	1,4,6,	0,4,6,
                ] },
				vnormal: { numComponents: 3, data: [
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24,0,0,	-24,0,0,	-24,0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,
					-24, 0,0,	-24, 0,0,	-24, 0,0,//
					0,-3,-4,	0,-3,-4,	0,-3,-4,
					0,-3,-4,	0,-3,-4,	0,-3,-4,
					0,1,-1,		0,1,-1,		0,1,-1,
					0,1,-1,		0,1,-1,		0,1,-1,
					0,4,0,		0,4,0,		0,4,0,
					0,4,0,		0,4,0,		0,4,0,
					0,1,1,		0,1,1,		0,1,1,		
					0,1,1,		0,1,1,		0,1,1,
					0,-3,-4,	0,-3,-4,	0,-3,-4,
					0,-3,-4,	0,-3,-4,	0,-3,-4,
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
				]}
				};
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
			var tex = gl.createTexture();
			
			gl.activeTexture(gl.TEXTURE1);
				gl.bindTexture(gl.TEXTURE_2D, tex);
				gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA, 1,1,0,gl.RGBA, gl.UNSIGNED_BYTE, null);
			var image = new Image();
			image.crossOrigin = "anonymous";
			
			image.onload = function() {
				gl.activeTexture(gl.TEXTURE1);
				gl.bindTexture(gl.TEXTURE_2D, tex);
				gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				};
			image.src = "superman.jpeg"; 
		}
		
    };
				
    CubeSuperMan.prototype.draw = function(drawingState) {
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
			shaderProgram.program.texSampler = gl.getUniformLocation(shaderProgram.program, "texSampler");
			gl.uniformli(shaderProgram.program.texSampler, 1);
			twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
        
    };
    CubeSuperMan.prototype.center = function(drawingState) {
        return this.position;
    };


    ////////
    // constructor for Cubes
    SpinningCubeSuperMan = function SpinningCubeSuperMan(name, position, size, color, axis) {
        CubeSuperMan.apply(this,arguments);
    };
    SpinningCubeSuperMan.prototype = Object.create(CubeSuperMan.prototype);
    SpinningCubeSuperMan.prototype.draw = function(drawingState) {
		// we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var theta = -Number(drawingState.realtime)/500.0;
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
			shaderProgram.program.texSampler = gl.getUniformLocation(shaderProgram.program, "texSampler");
			gl.uniform1i(shaderProgram.program.texSampler, 1);
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
grobjects.push(new SpinningCubeSuperMan("Blue Superman",[0,1,  -2.5],0.2,  [0.1,0.9,1]));
grobjects.push(new SpinningCubeSuperMan("Pink Superman",[ 0,1,  2.5],0.2, [0.9,0,0.4]));
