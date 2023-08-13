function start() {

    // Get canvas, WebGL context
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;

    var angle1 = -100;
    var angle2 = -100;

    // first
    var vertexPos1 = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,   0, 0, 1,
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,   1, 0, 0,
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,   0, 1.5, 0,
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,  -1, 0, 0,
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,   0,-1.5, 0,
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1,   0, 0,-1,
        ]);

    var vertexColors1 = new Float32Array(
        [  0, .5, 0,   0, .5, 0,   0, .5, 0,   0, .5, 0,    0, 1, 1,
           .5, 0, 0,   .5, 0, 0,   .5, 0, 0,   .5, 0, 0,    1, 1, 0,
           0, 0, .5,   0, 0, .5,   0, 0, .5,   0, 0, .5,    1, 0, 1,
           .25, .25, 0,   .25, .25, 0,   .25, .25, 0,   .25, .25, 0,    1, 0, 1,
           0, 0.25, .25,   0, .25, .25,   0, .25, .25,   0, .25, .25,   0, 1, 1,
           .25, 0, .25,   .25, 0, .25,   .25, 0, .25,   .25, 0, .25,    1, 1, 0,
        ]);

    var vertexNormals1 = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0, 
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
          -1, 0, 0,  -1, 0, 0,  -1, 0, 0,   -1, 0, 0,  -1, 0, 0,
           0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,   0, -1, 0,
           0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0, -1,
        ]);
    
    var triangleIndices1 = new Uint8Array(
        [  0, 1, 4,   1, 2, 4,  4, 2, 3,  0, 4, 3,    // front
           5, 6, 9,   6, 7, 9,  9, 7, 8,  5, 9, 8,    // right
           10,11,14,  11,12,14, 14,12,13, 10,14,13,   // top
           15,16,19,  16,17,19, 19,17,18, 15,19,18,   // left
           20,21,24,  21,22,24, 24,22,23, 20,24,23,   // bottom
           25,26,29,  26,27,29, 29,27,28, 25,29,28,   // back
	    ]);

    var vertexTextureCoords1 = new Float32Array(
        [  0.5, 0.375,   0.25, 0.375,    0.25, 0.625,   0.5,  0.625,    0.375, 0.50,
           0.5, 0.375,   0.50, 0.625,    0.75, 0.625,   0.75, 0.375,    0.625, 0.50,
           0.5, 0.375,   0.50, 0.125,    0.25, 0.125,   0.25, 0.375,    0.375, 0.25,
           0.25,0.375,   0.00, 0.375,    0.00, 0.625,   0.25, 0.625,    0.125, 0.50,
           0.25,0.625,   0.50, 0.625,    0.50, 0.875,   0.25, 0.875,    0.375, 0.75,
           0.75,0.625,   1.00, 0.625,    1.00, 0.375,   0.75, 0.375,    0.875, 0.50,]);

    // second
    var vertexPos2 = new Float32Array(
        [  0,3.825-2.5,0,  -1.28,0.366,0,  -0.771,-1,0,  0.771,-1,0,  1.28,0.366,0,  0,0,0.5,  0,0,-0.5,
        ]);

    var vertexColors2 = new Float32Array(
        [  0, 0.4, 0.8,   0, 0.4, 0.8,   0, 0.4, 0.8,   0, 0.4, 0.8,  0, 0.4, 0.8,
           1, 0.0, 1.0,   1, 0.5, 0.0,   
        ]);
    
    var triangleIndices2 = new Uint8Array(
        [  0, 1, 5,     1, 2, 5,    5, 2, 3,    5, 3, 4,    0, 5, 4,   // front
           0, 4, 6,     4, 3, 6,    3, 2, 6,    1, 6, 2,    0, 6, 1,   // back
	    ]);
    
    var vertexNormals2 = new Float32Array(
        [  0, 0, 1,     0, 1, 0,    1, 0, 0,   0, 0, -1,   0, -1, 0,
          -1, 0, 0,     0, 0, 1,
        ]);
    
    var vertexTextureCoords2 = new Float32Array(
        [  0.5,0.1686,  0.18,0.4085,    0.3073,0.75,    0.6928,0.75,    0.82,0.4085,
           0.5,0.5,     0.5,0.5,
        ]);
   
    // third
    var vertexPos3 = new Float32Array(
        [  0.5,1.25,0,  0,0.75,0,  -0.5,1.25,0,   -1,0.75,0,  -1,0,0,  0,-1,0,  1,0,0, 1,0.75,0, 0,0,0.4, 0,0,-0.4,
        ]);

    var vertexColors3 = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,    0, 0.0, 1,
           1, 0, 0,   0, 0, 1,   0, 0, 1,   1, 0, 0,    1, 0.8, 0,
        ]);

    var triangleIndices3 = new Uint8Array(
        [   0, 1, 8,     1, 2, 8,    2, 3, 8,      3, 4, 8,      8, 5, 4,       8, 5, 6,     7, 8, 6,    0, 8, 7,    // front    
            2, 1, 9,     1, 0, 9,    0, 7, 9,      7, 6, 9,      9, 6, 5,       9, 5, 4,     3, 9, 4,    2, 9, 3,    // back
        ]);

    var vertexNormals3 = new Float32Array(
        [  0, 0, 1,   1, 0, 0,   0, 1, 0,   -1, 0, 0,    0, 0, -1,
           0, -1, 0,  0, 1, 0,   1, 0, 0,   0, -1, 0,   -1, 0, 0,
        ]);
    
    var vertexTextureCoords3 = new Float32Array(
        [  0.625,0.1875,  0.5,0.3125,    0.375,0.1875,    0.25,0.3125,    0.25,0.5,
           0.5,0.75,      0.75,0.5,      0.75,0.3125,     0.5,0.5,        0.5,0.5,
        ]);


    // Set up texture for the first shape
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2_1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture2_1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    var texture2_2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2_2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image4 = new Image();

    var texture2_3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture2_3);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image5 = new Image();

    var texture3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture3);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image3 = new Image();

    function initTextureThenDraw() 
    {
    image1.onload = function() { loadTexture(image1,texture1); };
    image1.crossOrigin = "anonymous";
    image1.src = "https://live.staticflickr.com/65535/52553594796_3d599d1d26_o.jpg"; // spacecraft

    image3.onload = function() { loadTexture(image3,texture3); };
    image3.crossOrigin = "anonymous";
    image3.src = "https://live.staticflickr.com/65535/52554207028_bd87c8fce1_o.jpg"; // nebula

    image2.onload = function() { loadTexture(image2,texture2_1); };
    image2.crossOrigin = "anonymous";
    image2.src = "https://live.staticflickr.com/65535/52554622807_74942c43fa_o.jpg"; // alien

    image4.onload = function() { loadTexture(image4,texture2_2); };
    image4.crossOrigin = "anonymous";
    image4.src = "https://live.staticflickr.com/65535/52555621593_6f8c690473_o.png"; // pure grey

    image5.onload = function() { loadTexture(image5,texture2_3); };
    image5.crossOrigin = "anonymous";
    image5.src = "https://live.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";

    window.setTimeout(draw,200);
    }

    function loadTexture(image,texture)
    {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    // Option 1 : Use mipmap, select interpolation mode
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    function draw(){

        var showObject = slider1.value;
        // angle for object rotation
        if(showObject == 0){
            angle1 = angle1 + 0.1;
            angle2 = angle2 + 0.1;
        }
        if(angle1 > 100){
            angle1 = -100;
        }
        if(angle2 > 100){
            angle2 = -100;
        }
	
        // Circle around the y-axis
        var eye = [100,50 * Math.sin(angle1*0.01*Math.PI),100];
        var target = [0,0,0];
        var up = [0,1,0];
	
        var tModel = mat4.create();
        mat4.rotate(tModel,tModel,angle2*0.01*Math.PI,[0,1,0]);
	
        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);      

        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);
	
        function firstDraw(){

            var tMVP = mat4.create();
            var tMVn = mat3.create();
            var tMV = mat4.create();
            var model = mat4.create();
            mat4.fromScaling(model,[10,10,10]);
            mat4.multiply(model,model,tModel);
            mat4.multiply(tMV,tCamera,model);
            mat3.normalFromMat4(tMVn,tMV);
            mat4.multiply(tMVP,tProjection,tMV);

            // Read shader source
            var vertexSource1 = document.getElementById("vertexShader1").text;
            var fragmentSource1 = document.getElementById("fragmentShader1").text;

            // Compile vertex shaders
            var vertexShader1 = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader1,vertexSource1);
            gl.compileShader(vertexShader1);
            if (!gl.getShaderParameter(vertexShader1, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vertexShader1)); return null; }
        
            // Compile fragment shaders
            var fragmentShader1 = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader1,fragmentSource1);
            gl.compileShader(fragmentShader1);
            if (!gl.getShaderParameter(fragmentShader1, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fragmentShader1)); return null; }
            
            // Attach the shaders and link
            var shaderProgram1 = gl.createProgram();
            gl.attachShader(shaderProgram1, vertexShader1);
            gl.attachShader(shaderProgram1, fragmentShader1);
            gl.linkProgram(shaderProgram1);
            if (!gl.getProgramParameter(shaderProgram1, gl.LINK_STATUS)) {
            alert("Could not initialize shaders"); }
            gl.useProgram(shaderProgram1);
            
            // with the vertex shader, we need to pass it positions
            // as an attribute - so set up that communication
            shaderProgram1.PositionAttribute = gl.getAttribLocation(shaderProgram1, "vPosition");
            gl.enableVertexAttribArray(shaderProgram1.PositionAttribute);
            
            shaderProgram1.ColorAttribute = gl.getAttribLocation(shaderProgram1, "vColor");
            gl.enableVertexAttribArray(shaderProgram1.ColorAttribute);
            
            shaderProgram1.NormalAttribute = gl.getAttribLocation(shaderProgram1, "vNormal");
            gl.enableVertexAttribArray(shaderProgram1.NormalAttribute);

            shaderProgram1.texcoordAttribute = gl.getAttribLocation(shaderProgram1, "vTexCoord");
            gl.enableVertexAttribArray(shaderProgram1.texcoordAttribute);

            // this gives us access to the matrix uniform
            shaderProgram1.MVPmatrix = gl.getUniformLocation(shaderProgram1,"uMVP");
            shaderProgram1.MVmatrix = gl.getUniformLocation(shaderProgram1,"uMV");
            shaderProgram1.MVNormalmatrix = gl.getUniformLocation(shaderProgram1,"uMVn");

            // the buffer for vertices of the first shape
            var trianglePosBuffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer1);
            gl.bufferData(gl.ARRAY_BUFFER, vertexPos1, gl.STATIC_DRAW);
            trianglePosBuffer1.itemSize = 3;
            trianglePosBuffer1.numItems = 30;

            // the buffer for colors of the first shape
            var colorBuffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
            gl.bufferData(gl.ARRAY_BUFFER, vertexColors1, gl.STATIC_DRAW);
            colorBuffer1.itemSize = 3;
            colorBuffer1.numItems = 30;
            
            // the buffer for normals of the first shape
            var triangleNormalBuffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer1);
            gl.bufferData(gl.ARRAY_BUFFER, vertexNormals1, gl.STATIC_DRAW);
            triangleNormalBuffer1.itemSize = 3;
            triangleNormalBuffer1.numItems = 30;

            // the buffer for indices of the first shape
            var indexBuffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer1);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices1, gl.STATIC_DRAW);

            // add the buffer for textures of the first shape
            var textureBuffer1 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer1);
            gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords1, gl.STATIC_DRAW);
            textureBuffer1.itemSize = 2;
            textureBuffer1.numItems = 30;
            
            // Clear screen, prepare for rendering
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
            // Set up uniforms & attributes
            gl.uniformMatrix4fv(shaderProgram1.MVPmatrix,false,tMVP);
            gl.uniformMatrix4fv(shaderProgram1.MVmatrix,false,tMV);
            gl.uniformMatrix3fv(shaderProgram1.MVNormalmatrix,false,tMVn);

            // Attach sampler to texture units
            shaderProgram1.texSampler1 = gl.getUniformLocation(shaderProgram1, "texSampler1");
            gl.uniform1i(shaderProgram1.texSampler1, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
            gl.vertexAttribPointer(shaderProgram1.ColorAttribute, colorBuffer1.itemSize,
                    gl.FLOAT,false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer1);
            gl.vertexAttribPointer(shaderProgram1.NormalAttribute, triangleNormalBuffer1.itemSize,
                        gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer1);
            gl.vertexAttribPointer(shaderProgram1.PositionAttribute, trianglePosBuffer1.itemSize,
                    gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer1);
            gl.vertexAttribPointer(shaderProgram1.texcoordAttribute, textureBuffer1.itemSize,
                    gl.FLOAT, false, 0, 0);


            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture1);
            // Do the drawing
            gl.drawElements(gl.TRIANGLES, triangleIndices1.length, gl.UNSIGNED_BYTE, 0);
        }

        function secondDraw(i){

            var modelR1 = mat4.create();
            var model = mat4.create();
            mat4.fromScaling(model,[7,7,7]);
            
            if(i == 0){
                mat4.fromTranslation(modelR1,[3.5,3.5,3.5]);
            }
            if(i == 1){
                mat4.fromTranslation(modelR1,[-3.5,3.5,-3.5]);
            }
            mat4.rotate(modelR1,modelR1,angle2*0.04*Math.PI,[0,1,0]);

            var modelR2 = mat4.create();
            mat4.rotate(modelR2,modelR2,angle2*0.01*Math.PI,[0,1,0]);

            var tMVP = mat4.create();
            var tMVn = mat3.create();
            var tMV = mat4.create();
            mat4.multiply(model,tModel,model);
            mat4.multiply(modelR1,model,modelR1);
            mat4.multiply(modelR1,modelR2,modelR1);
            mat4.multiply(tMV,tCamera,modelR1);
            mat3.normalFromMat4(tMVn,tMV);
            mat4.multiply(tMVP,tProjection,tMV);

            var vertexSource2 = document.getElementById("vertexShader2").text;
            var fragmentSource2 = document.getElementById("fragmentShader2").text;
    
            var vertexShader2 = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader2,vertexSource2);
            gl.compileShader(vertexShader2);
            if (!gl.getShaderParameter(vertexShader2, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vertexShader2)); return null; }
    
            var fragmentShader2 = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader2,fragmentSource2);
            gl.compileShader(fragmentShader2);
            if (!gl.getShaderParameter(fragmentShader2, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fragmentShader2)); return null; }
    
            var shaderProgram2 = gl.createProgram();
            gl.attachShader(shaderProgram2, vertexShader2);
            gl.attachShader(shaderProgram2, fragmentShader2);
            gl.linkProgram(shaderProgram2);
            if (!gl.getProgramParameter(shaderProgram2, gl.LINK_STATUS)) {
            alert("Could not initialize shaders"); }
            gl.useProgram(shaderProgram2);	   
            
            shaderProgram2.PositionAttribute = gl.getAttribLocation(shaderProgram2, "vPosition");
            gl.enableVertexAttribArray(shaderProgram2.PositionAttribute);
            
            shaderProgram2.ColorAttribute = gl.getAttribLocation(shaderProgram2, "vColor");
            gl.enableVertexAttribArray(shaderProgram2.ColorAttribute);
            
            shaderProgram2.NormalAttribute = gl.getAttribLocation(shaderProgram2, "vNormal");
            gl.enableVertexAttribArray(shaderProgram2.NormalAttribute);

            shaderProgram2.texcoordAttribute = gl.getAttribLocation(shaderProgram2, "vTexCoord");
            gl.enableVertexAttribArray(shaderProgram2.texcoordAttribute);
    
            // this gives us access to the matrix uniform
            shaderProgram2.MVPmatrix = gl.getUniformLocation(shaderProgram2,"uMVP");
            shaderProgram2.MVmatrix = gl.getUniformLocation(shaderProgram2,"uMV");
            shaderProgram2.MVNormalmatrix = gl.getUniformLocation(shaderProgram2,"uMVn");
    
            // the buffer for vertices of the second shape
            var trianglePosBuffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer2);
            gl.bufferData(gl.ARRAY_BUFFER, vertexPos2, gl.STATIC_DRAW);
            trianglePosBuffer2.itemSize = 3;
            trianglePosBuffer2.numItems = 7;
            
            // the buffer for colors of the second shape
            var colorBuffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
            gl.bufferData(gl.ARRAY_BUFFER, vertexColors2, gl.STATIC_DRAW);
            colorBuffer2.itemSize = 3;
            colorBuffer2.numItems = 7;
    
            // the buffer for normals of the second shape
            var triangleNormalBuffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer2);
            gl.bufferData(gl.ARRAY_BUFFER, vertexNormals2, gl.STATIC_DRAW);
            triangleNormalBuffer2.itemSize = 3;
            triangleNormalBuffer2.numItems = 7;
    
            // the buffer for indices of the second shape
            var indexBuffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices2, gl.STATIC_DRAW);

            // add the buffer for textures of the first shape
            var textureBuffer2 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer2);
            gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords2, gl.STATIC_DRAW);
            textureBuffer2.itemSize = 2;
            textureBuffer2.numItems = 7;
    
            // Clear screen, prepare for rendering
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
            // Set up uniforms & attributes
            gl.uniformMatrix4fv(shaderProgram2.MVPmatrix,false,tMVP);
            gl.uniformMatrix4fv(shaderProgram2.MVmatrix,false,tMV);
            gl.uniformMatrix3fv(shaderProgram2.MVNormalmatrix,false,tMVn);
            
            // Attach sampler to texture units
            shaderProgram2.texSampler1 = gl.getUniformLocation(shaderProgram2, "texSampler1");
            gl.uniform1i(shaderProgram2.texSampler1, 0);
            shaderProgram2.texSampler2 = gl.getUniformLocation(shaderProgram2, "texSampler2");
            gl.uniform1i(shaderProgram2.texSampler2, 1);
            shaderProgram2.texSampler3 = gl.getUniformLocation(shaderProgram2, "texSampler3");
            gl.uniform1i(shaderProgram2.texSampler3, 2);

            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
            gl.vertexAttribPointer(shaderProgram2.ColorAttribute, colorBuffer2.itemSize,
                       gl.FLOAT,false, 0, 0);
    
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer2);
            gl.vertexAttribPointer(shaderProgram2.NormalAttribute, triangleNormalBuffer2.itemSize,
                         gl.FLOAT, false, 0, 0);
    
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer2);
            gl.vertexAttribPointer(shaderProgram2.PositionAttribute, trianglePosBuffer2.itemSize,
                       gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer2);
            gl.vertexAttribPointer(shaderProgram2.texcoordAttribute, textureBuffer2.itemSize,
                    gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture2_1);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, texture2_2);
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, texture2_3);
            // Do the drawing
            gl.drawElements(gl.TRIANGLES, triangleIndices2.length, gl.UNSIGNED_BYTE, 0);
        }

        function thirdDraw(i){

            var modelR1 = mat4.create();
            var model = mat4.create();
            mat4.fromScaling(model,[7,7,7]);
            mat4.rotate(modelR1,modelR1,angle2*0.01*Math.PI,[0,1,0]);

            var modelR2 = mat4.create();
            if(i == 0){
                mat4.fromTranslation(modelR2,[-3.5,-3.5,3.5]);
            }
            if(i == 1){
                mat4.fromTranslation(modelR2,[3.5,-3.5,-3.5]);
            }
            mat4.rotate(modelR2,modelR2,angle2*0.04*Math.PI,[0,1,0]);

            var tMVP = mat4.create();
            var tMVn = mat3.create();
            var tMV = mat4.create();
            mat4.multiply(model,tModel,model);
            mat4.multiply(modelR2,model,modelR2);
            mat4.multiply(modelR2,modelR1,modelR2);
            mat4.multiply(tMV,tCamera,modelR2);
            mat3.normalFromMat4(tMVn,tMV);
            mat4.multiply(tMVP,tProjection,tMV);

            var vertexSource3 = document.getElementById("vertexShader3").text;
            var fragmentSource3 = document.getElementById("fragmentShader3").text;
    
            var vertexShader3 = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader3,vertexSource3);
            gl.compileShader(vertexShader3);
            if (!gl.getShaderParameter(vertexShader3, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vertexShader3)); return null; }
    
            var fragmentShader3 = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader3,fragmentSource3);
            gl.compileShader(fragmentShader3);
            if (!gl.getShaderParameter(fragmentShader3, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fragmentShader3)); return null; }
    
            var shaderProgram3 = gl.createProgram();
            gl.attachShader(shaderProgram3, vertexShader3);
            gl.attachShader(shaderProgram3, fragmentShader3);
            gl.linkProgram(shaderProgram3);
            if (!gl.getProgramParameter(shaderProgram3, gl.LINK_STATUS)) {
            alert("Could not initialize shaders"); }
            gl.useProgram(shaderProgram3);	   
            
            shaderProgram3.PositionAttribute = gl.getAttribLocation(shaderProgram3, "vPosition");
            gl.enableVertexAttribArray(shaderProgram3.PositionAttribute);
            
            shaderProgram3.ColorAttribute = gl.getAttribLocation(shaderProgram3, "vColor");
            gl.enableVertexAttribArray(shaderProgram3.ColorAttribute);
            
            shaderProgram3.NormalAttribute = gl.getAttribLocation(shaderProgram3, "vNormal");
            gl.enableVertexAttribArray(shaderProgram3.NormalAttribute);
                
            shaderProgram3.texcoordAttribute = gl.getAttribLocation(shaderProgram3, "vTexCoord");
            gl.enableVertexAttribArray(shaderProgram3.texcoordAttribute);

            // this gives us access to the matrix uniform
            shaderProgram3.MVPmatrix = gl.getUniformLocation(shaderProgram3,"uMVP");
            shaderProgram3.MVmatrix = gl.getUniformLocation(shaderProgram3,"uMV");
            shaderProgram3.MVNormalmatrix = gl.getUniformLocation(shaderProgram3,"uMVn");
    
            // the buffer for vertices of the second shape
            var trianglePosBuffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer3);
            gl.bufferData(gl.ARRAY_BUFFER, vertexPos3, gl.STATIC_DRAW);
            trianglePosBuffer3.itemSize = 3;
            trianglePosBuffer3.numItems = 10;
            
            // the buffer for colors of the second shape
            var colorBuffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer3);
            gl.bufferData(gl.ARRAY_BUFFER, vertexColors3, gl.STATIC_DRAW);
            colorBuffer3.itemSize = 3;
            colorBuffer3.numItems = 10;
    
            // the buffer for normals of the second shape
            var triangleNormalBuffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer3);
            gl.bufferData(gl.ARRAY_BUFFER, vertexNormals3, gl.STATIC_DRAW);
            triangleNormalBuffer3.itemSize = 3;
            triangleNormalBuffer3.numItems = 10;
    
            // the buffer for indices of the second shape
            var indexBuffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer3);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices3, gl.STATIC_DRAW);

            // add the buffer for textures of the first shape
            var textureBuffer3 = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer3);
            gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords3, gl.STATIC_DRAW);
            textureBuffer3.itemSize = 2;
            textureBuffer3.numItems = 10;
    
            // Clear screen, prepare for rendering
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
            // Set up uniforms & attributes
            gl.uniformMatrix4fv(shaderProgram3.MVPmatrix,false,tMVP);
            gl.uniformMatrix4fv(shaderProgram3.MVmatrix,false,tMV);
            gl.uniformMatrix3fv(shaderProgram3.MVNormalmatrix,false,tMVn);

            // Attach sampler to texture units
            shaderProgram3.texSampler1 = gl.getUniformLocation(shaderProgram3, "texSampler1");
            gl.uniform1i(shaderProgram3.texSampler1, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer3);
            gl.vertexAttribPointer(shaderProgram3.ColorAttribute, colorBuffer3.itemSize,
                       gl.FLOAT,false, 0, 0);
    
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer3);
            gl.vertexAttribPointer(shaderProgram3.NormalAttribute, triangleNormalBuffer3.itemSize,
                         gl.FLOAT, false, 0, 0);
    
            gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer3);
            gl.vertexAttribPointer(shaderProgram3.PositionAttribute, trianglePosBuffer3.itemSize,
                       gl.FLOAT, false, 0, 0);
                
            gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer3);
            gl.vertexAttribPointer(shaderProgram3.texcoordAttribute, textureBuffer3.itemSize,
                        gl.FLOAT, false, 0, 0);
           
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture3);
            // Do the drawing
            gl.drawElements(gl.TRIANGLES, triangleIndices3.length, gl.UNSIGNED_BYTE, 0);
        }

        firstDraw();
        secondDraw(0);
        secondDraw(1);
        thirdDraw(0);
        thirdDraw(1);
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
    draw();
    initTextureThenDraw();
}

window.onload=start;