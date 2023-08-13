function setup(){
    var canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    var slider4 = document.getElementById("slider4");
    slider1.value = -60;
    slider2.value = -50;
    slider3.value = -30;
    slider4.value = 2;
    var rotation = 0;
    var rotation2 = 0;
    var tParameter1 = 1.0;   // for the first car
    var tParameter2 = 1.333;  // for the second car
    var tParameter3 = 1.667;  // for the third car

    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var a = slider1.value*0.005*Math.PI; // arm rotation
        var n = slider2.value*0.005*Math.PI; // arm rotation
        var g = slider3.value*0.005*Math.PI; // for the first hook rotation
        var g1 = slider3.value*-0.005*Math.PI; // for the second hook rotation
        var r = slider4.value;
        
        tParameter1 += 0.005 * r * 0.2;
        tParameter2 += 0.005 * r * 0.2;
        tParameter3 += 0.005 * r * 0.2;
        
        if(tParameter1 > 2.95){
            tParameter1 = 0.1;
        }
        if(tParameter2 > 2.95){
            tParameter2 = 0.1;
        }
        if(tParameter3 > 2.95){
            tParameter3 = 0.1;
        }
        
        rotation += 5;
        rotation2 += 5;

        var stack = [ mat3.create() ];
        function moveToTx(loc){
            var res=vec2.create();
            vec2.transformMat3(res,loc,stack[0]);
            context.moveTo(res[0],res[1]);
        }

        function lineToTx(loc){
            var res=vec2.create();
            vec2.transformMat3(res,loc,stack[0]);
            context.lineTo(res[0],res[1]);
        }

        function body(color){
            context.beginPath();
            context.fillStyle = color;
            moveToTx([0,0]);
            lineToTx([0,-100]);
            lineToTx([-90, -100]);
            lineToTx([-90, -140]);
            lineToTx([-97, -140]);
            lineToTx([-97, -170]);
            lineToTx([-103, -170]);
            lineToTx([-103, -140]);
            lineToTx([-110, -140]);
            lineToTx([-110, -100]);
            lineToTx([-200, -100]);
            lineToTx([-200, -60]);
            lineToTx([-210, -60]);
            lineToTx([-210, -10]);
            lineToTx([-200, -10]);
            lineToTx([-200,100]);
            lineToTx([0,100]);
            context.closePath();
            context.fill();
        }

        function armFirst(color){
            context.beginPath();
            context.fillStyle = color;
            moveToTx([0,0]);
            lineToTx([0,35]);
            lineToTx([50,30]);
            lineToTx([70,0]);
            lineToTx([50,-30]);
            lineToTx([0,-35]);
            context.closePath();
            context.fill();
        }

        function armPiece(color){
            context.beginPath();
            context.fillStyle = color;
            moveToTx([0,0]);
            lineToTx([30,20]);
            lineToTx([90,20]);
            lineToTx([120,0]);
            lineToTx([90,-20]);
            lineToTx([30,-20]);
            context.closePath();
            context.fill();
        }

        function decoration(color){
            context.beginPath();
            context.fillStyle = color;
            moveToTx([0,0]);
            lineToTx([10,0]);
            lineToTx([10,40]);
            lineToTx([0, 40]);
            context.closePath();
            context.fill();
        }

        function hook(color){
            context.beginPath();
            context.fillStyle = color;
            moveToTx([0,0]);
            lineToTx([80,0]);
            lineToTx([90,50]);
            lineToTx([85,50]);
            lineToTx([75, 20]);
            lineToTx([30, 20]);
            context.closePath();
            context.fill();
        }

        function circle(color, radius, strokeStyle, lineWidth){
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.fillStyle = color;
            var res = vec2.create();
            vec2.transformMat3(res,[0,0],stack[0]);
            context.arc(res[0], res[1], radius, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
        }

        function wheelLine(radius, strokeStyle, lineWidth){
            var radians = rotation*0.005*Math.PI;
            stack.unshift(mat3.clone(stack[0]));
            mat3.rotate(stack[0],stack[0],radians * r);
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            moveToTx([radius * 0.5, 0]);
            lineToTx([-radius * 0.5, 0]);
            lineToTx([0,0]);
            lineToTx([0,radius * 0.5]);
            lineToTx([0,-radius * 0.5]);
            context.stroke();
            stack.shift(); 
        }

        function wheelLine2(radius, strokeStyle, lineWidth){
            var radians = rotation2*0.005*Math.PI;
            stack.unshift(mat3.clone(stack[0]));
            mat3.rotate(stack[0],stack[0],radians);
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            moveToTx([radius * 0.5, 0]);
            lineToTx([-radius * 0.5, 0]);
            context.stroke();
            stack.shift(); 
        }

        function wheelLine3(radius, strokeStyle, lineWidth){
            var radians = rotation*0.005*Math.PI;
            stack.unshift(mat3.clone(stack[0]));
            mat3.rotate(stack[0],stack[0],radians);
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            moveToTx([radius * 0.5, 0]);
            lineToTx([-radius * 0.5, 0]);
            lineToTx([0,0]);
            lineToTx([0,radius * 0.5]);
            lineToTx([0,-radius * 0.5]);
            context.stroke();
            stack.shift(); 
        }

        var Rstart = 100.0;
	    var Rslope = 90.0;
        var Cspiral = function(t) {
            var R = Rslope * t + Rstart;
            var x = R * Math.cos(2.0 * Math.PI * t);
            var y = R * Math.sin(2.0 * Math.PI * t);
            return [x,y];
        }

        var Cspiral_tangent = function(t) {
            var R = Rslope * t + Rstart;
            var Rprime = Rslope;
            var x = Rprime * Math.cos(2.0 * Math.PI * t)
                    - R * 2.0 * Math.PI * Math.sin(2.0 * Math.PI * t);
            var y = Rprime * Math.sin(2.0 * Math.PI * t)
                    + R * 2.0 * Math.PI * Math.cos(2.0 * Math.PI * t);
            return [x,y];
        }

        function drawTrajectory(t_begin,t_end,intervals,C,color, lineWidth) {
            context.strokeStyle=color;
            context.lineWidth = lineWidth;
            context.beginPath();
            moveToTx(C(t_begin));
            for(var i=1;i<=intervals;i++){
                var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
                lineToTx(C(t));
            }
            context.stroke();
        }

        function screen(color){
            context.beginPath();
            context.fillStyle = color;
            context.lineWidth = 3;
            context.strokeStyle = "black";
            moveToTx([0, 0]);
            lineToTx([60, 0]);
            lineToTx([60, 50]);
            lineToTx([0, 50]);
            context.closePath();
            context.fill();
            context.stroke();
        }

        function axes(color) {
            context.strokeStyle=color;
            context.beginPath();
            // Axes
            moveToTx([120,0]);lineToTx([0,0]);lineToTx([0,120]);
            // Arrowheads
            moveToTx([110,5]);lineToTx([120,0]);lineToTx([110,-5]);
            moveToTx([5,110]);lineToTx([0,120]);lineToTx([-5,110]);
            // X-label
            moveToTx([130,-5]);lineToTx([140,5]);
            moveToTx([130,5]);lineToTx([140,-5]);
            // Y-label
            moveToTx([-5,130]);lineToTx([0,135]);lineToTx([5,130]);
            moveToTx([0,135]);lineToTx([0,142]);
            context.stroke();
        }

        function drawCar1(){
            var arm_to_canvas = mat3.create();
            mat3.fromTranslation(arm_to_canvas,[50, 79]);
            mat3.scale(arm_to_canvas,arm_to_canvas,[0.5,-0.5]);
            mat3.multiply(stack[0],stack[0],arm_to_canvas);
            body("grey");
            armFirst("grey");  // the first body part
            stack.unshift(mat3.clone(stack[0]));

            var first_to_arm = mat3.create();
            mat3.fromTranslation(first_to_arm,[70,0]);
            mat3.rotate(first_to_arm,first_to_arm,a);
            mat3.multiply(stack[0],stack[0],first_to_arm);
            armPiece("#4572D3"); // the first arm piece
            stack.unshift(mat3.clone(stack[0]));
       
            var second_to_arm = mat3.create();
            mat3.fromTranslation(second_to_arm,[120,0]);
            mat3.rotate(second_to_arm,second_to_arm,n);
            mat3.scale(second_to_arm,second_to_arm,[0.7,0.7]);
            mat3.multiply(stack[0],stack[0],second_to_arm);
            armPiece("#4572D3"); // the second arm piece
            stack.unshift(mat3.clone(stack[0]));
        
            var firstHook_to_arm = mat3.create();
            mat3.fromTranslation(firstHook_to_arm,[120,0]);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,-45 * Math.PI * 0.005);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,g);
            mat3.multiply(stack[0],stack[0],firstHook_to_arm);
            hook("#2881AA");  // the first hook
            stack.shift(); 

            stack.unshift(mat3.clone(stack[0]));
            var secondHook_to_arm = mat3.create();
            mat3.fromTranslation(secondHook_to_arm,[120,0]);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,g1);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,-90 * Math.PI * 0.005);
            mat3.scale(secondHook_to_arm,secondHook_to_arm,[-1,1]);
            mat3.multiply(stack[0],stack[0],secondHook_to_arm);
            hook("#2881AA"); // the second hook
            circle("#5E8543", 8, "#013066", 3);
        
            stack.shift(); 
            circle("#5E8543", 9, "#013066", 4);

            stack.shift(); 
            circle("#5E8543", 10, "#013066", 4);
            stack.shift(); 
            // robotic arm section ends
        
            // start decoration and wheels
            stack.unshift(mat3.clone(stack[0]));
            var decoration1_to_arm = mat3.create();
            mat3.fromTranslation(decoration1_to_arm,[-180,-80]);
            mat3.multiply(stack[0],stack[0],decoration1_to_arm);
            decoration("#99C30B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration2_to_arm = mat3.create();
            mat3.fromTranslation(decoration2_to_arm,[20,0]);
            mat3.scale(decoration2_to_arm,decoration2_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration2_to_arm);
            decoration("#E0B00B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration3_to_arm = mat3.create();
            mat3.fromTranslation(decoration3_to_arm,[20,0]);
            mat3.scale(decoration3_to_arm,decoration3_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration3_to_arm);
            decoration("#E0650B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration4_to_arm = mat3.create();
            mat3.fromTranslation(decoration4_to_arm,[20,0]);
            mat3.scale(decoration4_to_arm,decoration4_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration4_to_arm);
            decoration("#E33711");
        
            stack.shift(); 
            stack.shift(); 
            stack.shift(); 
            stack.unshift(mat3.clone(stack[0]));
            var decoration5_to_arm = mat3.create();
            mat3.fromTranslation(decoration5_to_arm,[5,70]);
            mat3.multiply(stack[0],stack[0],decoration5_to_arm);
            circle("#095C95", 5, "black", 2);
            stack.shift();
            stack.unshift(mat3.clone(stack[0]));

            var decoration6_to_arm = mat3.create();
            mat3.fromTranslation(decoration6_to_arm,[90,0]);
            mat3.multiply(stack[0],stack[0],decoration6_to_arm);
            screen("#5AE4F2");
            stack.shift(); // back to the axes after the first translation

            stack.unshift(mat3.clone(stack[0]));
            var decoration7_to_arm = mat3.create();
            mat3.fromTranslation(decoration7_to_arm,[80,-90]);
            mat3.scale(decoration7_to_arm,decoration7_to_arm,[0.8,0.8]);
            mat3.multiply(stack[0],stack[0],decoration7_to_arm);
            circle("#E0AC0B", 5, "black", 2);
            wheelLine2(70, "black", 3);
            stack.shift();
            // decoration section ends
            
            // start decoration and wheels --> wheel section
            stack.unshift(mat3.clone(stack[0]));
            var firstWheel_to_arm = mat3.create();
            mat3.fromTranslation(firstWheel_to_arm,[0,180]);
            mat3.multiply(stack[0],stack[0],firstWheel_to_arm);
            circle("orange", 20, "black", 5); // the first wheel
            stack.unshift(mat3.clone(stack[0]));
            
            var secondWheel_to_arm = mat3.create();
            mat3.fromTranslation(secondWheel_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheel_to_arm);
            circle("orange", 20, "black", 5); // the second wheel
            stack.shift();
            // wheel section ends

            wheelLine(40, "black", 5); // the first wheelLine rotation
            stack.unshift(mat3.clone(stack[0]));
            var secondWheelLine_to_arm = mat3.create();
            mat3.fromTranslation(secondWheelLine_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheelLine_to_arm);
            wheelLine(40, "black", 5); // the second wheelLine rotation
            stack.shift();
            stack.shift();
            stack.shift();
            wheelLine3(40, "black", 6);
        }

        function drawCar2(){
            var arm_to_canvas = mat3.create();
            mat3.fromTranslation(arm_to_canvas,[50, 79]);
            mat3.scale(arm_to_canvas,arm_to_canvas,[0.5,-0.5]);
            mat3.multiply(stack[0],stack[0],arm_to_canvas);
            body("#212643");
            armFirst("#212643");  // the first body part
            stack.unshift(mat3.clone(stack[0]));

            var first_to_arm = mat3.create();
            mat3.fromTranslation(first_to_arm,[70,0]);
            mat3.rotate(first_to_arm,first_to_arm,a);
            mat3.multiply(stack[0],stack[0],first_to_arm);
            armPiece("#083D31"); // the first arm piece
            stack.unshift(mat3.clone(stack[0]));
       
            var second_to_arm = mat3.create();
            mat3.fromTranslation(second_to_arm,[120,0]);
            mat3.rotate(second_to_arm,second_to_arm,n);
            mat3.scale(second_to_arm,second_to_arm,[0.7,0.7]);
            mat3.multiply(stack[0],stack[0],second_to_arm);
            armPiece("#083D31"); // the second arm piece
            stack.unshift(mat3.clone(stack[0]));
        
            var firstHook_to_arm = mat3.create();
            mat3.fromTranslation(firstHook_to_arm,[120,0]);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,-45 * Math.PI * 0.005);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,g);
            mat3.multiply(stack[0],stack[0],firstHook_to_arm);
            hook("#1E5995");  // the first hook
            stack.shift(); 

            stack.unshift(mat3.clone(stack[0]));
            var secondHook_to_arm = mat3.create();
            mat3.fromTranslation(secondHook_to_arm,[120,0]);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,g1);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,-90 * Math.PI * 0.005);
            mat3.scale(secondHook_to_arm,secondHook_to_arm,[-1,1]);
            mat3.multiply(stack[0],stack[0],secondHook_to_arm);
            hook("#1E5995"); // the second hook
            circle("#000000", 8, "#1E5995", 3);
        
            stack.shift(); 
            circle("#000000", 9, "#1E5995", 4);

            stack.shift(); 
            circle("#000000", 10, "#1E5995", 4);
            stack.shift(); 
            // robotic arm section ends
        
            // start decoration and wheels
            stack.unshift(mat3.clone(stack[0]));
            var decoration1_to_arm = mat3.create();
            mat3.fromTranslation(decoration1_to_arm,[-180,-80]);
            mat3.multiply(stack[0],stack[0],decoration1_to_arm);
            decoration("#99C30B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration2_to_arm = mat3.create();
            mat3.fromTranslation(decoration2_to_arm,[20,0]);
            mat3.scale(decoration2_to_arm,decoration2_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration2_to_arm);
            decoration("#E0B00B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration3_to_arm = mat3.create();
            mat3.fromTranslation(decoration3_to_arm,[20,0]);
            mat3.scale(decoration3_to_arm,decoration3_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration3_to_arm);
            decoration("#E0650B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration4_to_arm = mat3.create();
            mat3.fromTranslation(decoration4_to_arm,[20,0]);
            mat3.scale(decoration4_to_arm,decoration4_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration4_to_arm);
            decoration("#E33711");
        
            stack.shift(); 
            stack.shift(); 
            stack.shift(); 
            stack.unshift(mat3.clone(stack[0]));
            var decoration5_to_arm = mat3.create();
            mat3.fromTranslation(decoration5_to_arm,[5,70]);
            mat3.multiply(stack[0],stack[0],decoration5_to_arm);
            circle("#095C95", 5, "black", 2);
            stack.shift();
            stack.unshift(mat3.clone(stack[0]));

            var decoration6_to_arm = mat3.create();
            mat3.fromTranslation(decoration6_to_arm,[90,0]);
            mat3.multiply(stack[0],stack[0],decoration6_to_arm);
            screen("#5AE4F2");
            stack.shift(); // back to the axes after the first translation

            stack.unshift(mat3.clone(stack[0]));
            var decoration7_to_arm = mat3.create();
            mat3.fromTranslation(decoration7_to_arm,[80,-90]);
            mat3.scale(decoration7_to_arm,decoration7_to_arm,[0.8,0.8]);
            mat3.multiply(stack[0],stack[0],decoration7_to_arm);
            circle("blue", 5, "black", 2);
            wheelLine2(70, "black", 3);
            stack.shift();
            // decoration section ends
            
            // start decoration and wheels --> wheel section
            stack.unshift(mat3.clone(stack[0]));
            var firstWheel_to_arm = mat3.create();
            mat3.fromTranslation(firstWheel_to_arm,[0,180]);
            mat3.multiply(stack[0],stack[0],firstWheel_to_arm);
            circle("blue", 20, "black", 5); // the first wheel
            stack.unshift(mat3.clone(stack[0]));
            
            var secondWheel_to_arm = mat3.create();
            mat3.fromTranslation(secondWheel_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheel_to_arm);
            circle("blue", 20, "black", 5); // the second wheel
            stack.shift();
            // wheel section ends

            wheelLine(40, "black", 5); // the first wheelLine rotation
            stack.unshift(mat3.clone(stack[0]));
            var secondWheelLine_to_arm = mat3.create();
            mat3.fromTranslation(secondWheelLine_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheelLine_to_arm);
            wheelLine(40, "black", 5); // the second wheelLine rotation
            stack.shift();
            stack.shift();
            stack.shift();
            wheelLine3(40, "black", 6);
        }

        function drawCar3(){
            var arm_to_canvas = mat3.create();
            mat3.fromTranslation(arm_to_canvas,[50, 79]);
            mat3.scale(arm_to_canvas,arm_to_canvas,[0.5,-0.5]);
            mat3.multiply(stack[0],stack[0],arm_to_canvas);
            body("#730B16");
            armFirst("#730B16");  // the first body part
            stack.unshift(mat3.clone(stack[0]));

            var first_to_arm = mat3.create();
            mat3.fromTranslation(first_to_arm,[70,0]);
            mat3.rotate(first_to_arm,first_to_arm,a);
            mat3.multiply(stack[0],stack[0],first_to_arm);
            armPiece("grey"); // the first arm piece
            stack.unshift(mat3.clone(stack[0]));
       
            var second_to_arm = mat3.create();
            mat3.fromTranslation(second_to_arm,[120,0]);
            mat3.rotate(second_to_arm,second_to_arm,n);
            mat3.scale(second_to_arm,second_to_arm,[0.7,0.7]);
            mat3.multiply(stack[0],stack[0],second_to_arm);
            armPiece("grey"); // the second arm piece
            stack.unshift(mat3.clone(stack[0]));
        
            var firstHook_to_arm = mat3.create();
            mat3.fromTranslation(firstHook_to_arm,[120,0]);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,-45 * Math.PI * 0.005);
            mat3.rotate(firstHook_to_arm,firstHook_to_arm,g);
            mat3.multiply(stack[0],stack[0],firstHook_to_arm);
            hook("grey");  // the first hook
            stack.shift(); 

            stack.unshift(mat3.clone(stack[0]));
            var secondHook_to_arm = mat3.create();
            mat3.fromTranslation(secondHook_to_arm,[120,0]);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,g1);
            mat3.rotate(secondHook_to_arm,secondHook_to_arm,-90 * Math.PI * 0.005);
            mat3.scale(secondHook_to_arm,secondHook_to_arm,[-1,1]);
            mat3.multiply(stack[0],stack[0],secondHook_to_arm);
            hook("grey"); // the second hook
            circle("#000000", 8, "#C88024", 3);
        
            stack.shift(); 
            circle("#000000", 9, "#C88024", 4);

            stack.shift(); 
            circle("#000000", 10, "#C88024", 4);
            stack.shift(); 
            // robotic arm section ends
        
            // start decoration and wheels
            stack.unshift(mat3.clone(stack[0]));
            var decoration1_to_arm = mat3.create();
            mat3.fromTranslation(decoration1_to_arm,[-180,-80]);
            mat3.multiply(stack[0],stack[0],decoration1_to_arm);
            decoration("#99C30B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration2_to_arm = mat3.create();
            mat3.fromTranslation(decoration2_to_arm,[20,0]);
            mat3.scale(decoration2_to_arm,decoration2_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration2_to_arm);
            decoration("#E0B00B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration3_to_arm = mat3.create();
            mat3.fromTranslation(decoration3_to_arm,[20,0]);
            mat3.scale(decoration3_to_arm,decoration3_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration3_to_arm);
            decoration("#E0650B");
            stack.unshift(mat3.clone(stack[0]));
            var decoration4_to_arm = mat3.create();
            mat3.fromTranslation(decoration4_to_arm,[20,0]);
            mat3.scale(decoration4_to_arm,decoration4_to_arm,[1,0.8]);
            mat3.multiply(stack[0],stack[0],decoration4_to_arm);
            decoration("#E33711");
        
            stack.shift(); 
            stack.shift(); 
            stack.shift(); 
            stack.unshift(mat3.clone(stack[0]));
            var decoration5_to_arm = mat3.create();
            mat3.fromTranslation(decoration5_to_arm,[5,70]);
            mat3.multiply(stack[0],stack[0],decoration5_to_arm);
            circle("#095C95", 5, "black", 2);
            stack.shift();
            stack.unshift(mat3.clone(stack[0]));

            var decoration6_to_arm = mat3.create();
            mat3.fromTranslation(decoration6_to_arm,[90,0]);
            mat3.multiply(stack[0],stack[0],decoration6_to_arm);
            screen("#5AE4F2");
            stack.shift(); // back to the axes after the first translation

            stack.unshift(mat3.clone(stack[0]));
            var decoration7_to_arm = mat3.create();
            mat3.fromTranslation(decoration7_to_arm,[80,-90]);
            mat3.scale(decoration7_to_arm,decoration7_to_arm,[0.8,0.8]);
            mat3.multiply(stack[0],stack[0],decoration7_to_arm);
            circle("grey", 5, "black", 2);
            wheelLine2(70, "black", 3);
            stack.shift();
            // decoration section ends
            
            // start decoration and wheels --> wheel section
            stack.unshift(mat3.clone(stack[0]));
            var firstWheel_to_arm = mat3.create();
            mat3.fromTranslation(firstWheel_to_arm,[0,180]);
            mat3.multiply(stack[0],stack[0],firstWheel_to_arm);
            circle("grey", 20, "black", 5); // the first wheel
            stack.unshift(mat3.clone(stack[0]));
            
            var secondWheel_to_arm = mat3.create();
            mat3.fromTranslation(secondWheel_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheel_to_arm);
            circle("grey", 20, "black", 5); // the second wheel
            stack.shift();
            // wheel section ends

            wheelLine(40, "black", 5); // the first wheelLine rotation
            stack.unshift(mat3.clone(stack[0]));
            var secondWheelLine_to_arm = mat3.create();
            mat3.fromTranslation(secondWheelLine_to_arm,[160,0]);
            mat3.multiply(stack[0],stack[0],secondWheelLine_to_arm);
            wheelLine(40, "black", 5); // the second wheelLine rotation
            stack.shift();
            stack.shift();
            stack.shift();
            wheelLine3(40, "black", 6);
        }
        var initialAxes_to_canvas = mat3.create();
	    mat3.fromTranslation(initialAxes_to_canvas,[700,400]);
	    mat3.scale(initialAxes_to_canvas,initialAxes_to_canvas,[1,-1]); // Flip the Y-axis
        mat3.multiply(stack[0],stack[0],initialAxes_to_canvas);
        circle("red", 25, "black", 8);
        drawTrajectory(0.0,3,100,Cspiral,"black", 9);

        // the first car
        stack.unshift(mat3.clone(stack[0]));
        var thirdCarAxes = mat3.create();
	    mat3.fromTranslation(thirdCarAxes,Cspiral(tParameter1));
        var tangent1 = Cspiral_tangent(tParameter1);
        var angle1 = Math.atan2(tangent1[1],tangent1[0]);
        mat3.rotate(thirdCarAxes,thirdCarAxes,angle1);
	    mat3.multiply(stack[0],stack[0],thirdCarAxes);
        drawCar1();
        stack.shift(); // back to initial axes

        // the second car
        stack.unshift(mat3.clone(stack[0]));
        var secondCarAxes = mat3.create();
        mat3.fromTranslation(secondCarAxes,Cspiral(tParameter2));
        var tangent2 = Cspiral_tangent(tParameter2);
        var angle2 = Math.atan2(tangent2[1],tangent2[0]);
        mat3.rotate(secondCarAxes,secondCarAxes,angle2);
        mat3.multiply(stack[0],stack[0],secondCarAxes);
        drawCar2();
        stack.shift(); // back to initial axes

        // the third car
        stack.unshift(mat3.clone(stack[0]));
        var thirdCarAxes = mat3.create();
	    mat3.fromTranslation(thirdCarAxes,Cspiral(tParameter3));
        var tangent3 = Cspiral_tangent(tParameter3);
        var angle3 = Math.atan2(tangent3[1],tangent3[0]);
        mat3.rotate(thirdCarAxes,thirdCarAxes,angle3);
	    mat3.multiply(stack[0],stack[0],thirdCarAxes);
        drawCar3();
        stack.shift(); // back to initial axes
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}

window.onload = setup();