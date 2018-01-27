
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var CubeHouse = undefined;
 
// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    CubeHouse = function CubeHouse(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [0,0.4,1];
    }
    CubeHouse.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["texCube-vs", "texCube-fs"]);
			
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                    .5, .5, .5,  -.5, .5, .5,  -.5,0, .5,   	.5, .5, .5, -.5,0, .5,   .5,0, .5,	//front
           .5, .5, .5,   .5,0, .5,   .5,0,-.5,   	.5, .5, .5,.5,0,-.5,   .5, .5,-.5,//right
          -.5, .5, .5,  -.5, .5,-.5,  -.5,0,-.5,  	-.5, .5, .5,-.5,0,-.5,  -.5,0, .5,//left
          -.5,0,-.5,   .5,0,-.5,   .5,0, .5,  	-.5,0,-.5,.5,0, .5,  -.5,0, .5,//bottom
           .5,0,-.5,  -.5,0,-.5,  -.5, .5,-.5,   	.5,0,-.5,-.5, .5,-.5,   .5, .5,-.5,//back 
		   .5, 1, 0,  -.5, 1, 0,  -.5, .5, .5,   .5, 1, 0,  -.5, .5, .5,   .5, .5, .5,	//top front
		   .5, 1, 0,   .5, .5, .5,   .5, .5, -.5,   .5, 1, 0, .5, .5, -.5,  .5, .5, -.5,	//top right
		  -.5, 1, 0,  -.5, .5, .5,  -.5, .5, -.5, 	-.5, 1, 0, -.5, .5, -.5, -.5, .5, -.5,//top left
		   .5,1,0, 	 -.5,1,0,	-.5,.5,-.5, 	.5,1,0, 	-.5,.5,-.5, 	.5,.5,-.5,//top back
					 
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-.5,0,0,-.5,0,0,-.5,
					0,0,-.5,0,0,-.5,0,0,-.5,
					-.5,0,0,-.5,0,0,-.5,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					.5,0,0,.5,0,0,.5,0,0,
					.5,0,0,.5,0,0,.5,0,0,
					0,1,0,0,1,0,0,1,0,
					0,1,0,0,1,0,0,1,0,
					0,0,.5,0,0,.5,0,0,.5,
					0,0,.5,0,0,.5,0,0,.5,
					0,-.5,-.5,0,-.5,-.5,0,-.5,-.5,
					0,-.5,-.5,0,-.5,-.5,0,-.5,-.5,
					-.5,0,0,-.5,0,0,-.5,0,0,
					0,0,0,0,0,0,0,0,0,
					-.5,0,0,-.5,0,0,-.5,0,0,
					0,0,0,0,0,0,0,0,0,
					0,.5,-.5,0,.5,-.5,0,.5,-.5,
					0,.5,-.5,0,.5,-.5,0,.5,-.5,
                ]},
				vtexcoord : {numComponents:2, data: [
					0,0,	0,1,	1,1,
					0,0,	0,1,	1,0,
					0,0,	0,1,	1,0,
					0,0,	0,1,	1,0,
					0,0,	0,1,	1,0,
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
					
				]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
			var tex2 = gl.createTexture();
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, tex2);
				gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA, 1,1,0,gl.RGBA, gl.UNSIGNED_BYTE, null);
			var image2 = new Image();
				image2.onload = function(image2,tex2)  
			{
				gl.bindTexture(gl.TEXTURE_2D, tex2);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,null);
        
        
gl.generateMipmap(gl.TEXTURE_2D);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				};
				
				image2.src = "https://lh3.googleusercontent.com/CYmpL674CC5fhz5PYPj8RGR3TP5FvyWWFTsattKnHIZKmFAk4jsZIM-oUSzx5bF1MfuQ1i-4qTmnflS39NfsrfYe4CrQk6M55RIyGuez_WzY0UBRZkREjiOjhAHbox206O4N0DdtcIYSrhEW6c2mumsbZILhvKKQS-qd8DPzTl95VABCZ0pXvmvN10YxUqEdasvQNBg0jDoYvXh9nXS7OIdnqTVWQxxn41RJlw4sg1ArlcC8T3LHSFapC9Ay67e1wPf-DIgFBEs45M9RhB2Lq89_wUL_Y5ZnyGdAuR3USCPt69vuY8h7XyuaPID_4fAgWU4YlI198r-GZ9c5RJII0qZ8G_1x4ng9u6rwCLWodHUHnmPEm7qGZnGxuOonjmY_WRj7KkX2hQhiTuyS9ATHS1E3zT_MFUepX4D7gSs-iZ2j-auT9wNacpHyErcq_55qzF-UeStkRgoOQ8OI8ylyUJr4TasYs56jasNjmhQeTahrgxJSmJVEPALJImunZjoNMEv_GfBxDw-abBFWgBXN3KjonSyk-hXTbZ0ERcujipBvJ9SFJphDkWkEoNn56xRLsII=s256-no";
		}

    };
    CubeHouse.prototype.draw = function(drawingState) {
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
			shaderProgram.texSampler2 = gl.getUniformLocation(shaderProgram.program, "texSampler2");
			gl.uniform1i(shaderProgram.texSampler2, 0);
			//initTexThenDraw();
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
			
    };
    CubeHouse.prototype.center = function(drawingState) {
        return this.position;
    }
})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new CubeHouse("Green House",[ 0,-1, 2.5],1, [0.5,1,0]));
grobjects.push(new CubeHouse("Blue House",[ -2.5,-1, 0],1, [0.1,0.9,1]));
grobjects.push(new CubeHouse("L. Green House",[ 2.5,-1, 0],1, [0,0.9,0.4]));
grobjects.push(new CubeHouse("Pink House",[ 0,-1, -2.5],1, [0.9,0,0.4]));
