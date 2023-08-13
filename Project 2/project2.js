function setup(){
    var canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    var slider4 = document.getElementById("slider4");
    slider1.value = 0;
    slider2.value = 0;
    slider3.value = 0;
    slider4.value = 5;
    var rotation = 0;
    var rotation2 = 0;

    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var a = slider1.value*0.005*Math.PI;
        var n = slider2.value*0.005*Math.PI;
        var g = slider3.value*0.005*Math.PI;
        var g1 = slider3.value*-0.005*Math.PI;
        var r = slider4.value;
        rotation += 5;
        rotation2 += 5;

        function body(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(0,-100);
            context.lineTo(-90, -100);
            context.lineTo(-90, -140);
            context.lineTo(-97, -140);
            context.lineTo(-97, -170);
            context.lineTo(-103, -170);
            context.lineTo(-103, -140);
            context.lineTo(-110, -140);
            context.lineTo(-110, -100);
            context.lineTo(-200, -100);
            context.lineTo(-200, -60);
            context.lineTo(-210, -60);
            context.lineTo(-210, -10);
            context.lineTo(-200, -10);
            context.lineTo(-200,100);
            context.lineTo(0,100);
            context.closePath();
            context.fill();
        }

        function armFirst(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(0,35);
            context.lineTo(50,30);
            context.lineTo(70,0);
            context.lineTo(50,-30);
            context.lineTo(0,-35);
            context.closePath();
            context.fill();
        }

        function armPiece(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(30,20);
            context.lineTo(90,20);
            context.lineTo(120,0);
            context.lineTo(90,-20);
            context.lineTo(30,-20);
            context.closePath();
            context.fill();
        }

        function decoration(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(10,0);
            context.lineTo(10,40);
            context.lineTo(0, 40);
            context.closePath();
            context.fill();
        }

        function hook(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0,0);
            context.lineTo(80,0);
            context.lineTo(90,50);
            context.lineTo(85,50);
            context.lineTo(75, 20);
            context.lineTo(30, 20);
            context.closePath();
            context.fill();
        }

        function circle(color, radius, strokeStyle, lineWidth){
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.fillStyle = color;
            context.arc(0, 0, radius, 0, 2 * Math.PI);
            context.fill();
            context.stroke();        
        }

        function wheelLine(radius, strokeStyle, lineWidth){
            var radians = rotation*0.005*Math.PI;
            context.save();
            context.rotate(radians * r);
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.moveTo(radius * 0.5, 0);
            context.lineTo(-radius * 0.5, 0);
            context.lineTo(0,0);
            context.lineTo(0,radius * 0.5);
            context.lineTo(0,-radius * 0.5);
            context.stroke();
            context.restore();
        }

        function wheelLine2(radius, strokeStyle, lineWidth){
            var radians = rotation2*0.005*Math.PI;
            context.save();
            context.rotate(radians);
            context.beginPath();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.moveTo(radius * 0.5, 0);
            context.lineTo(-radius * 0.5, 0);
            context.stroke();
            context.restore();
        }

        function screen(color){
            context.beginPath();
            context.fillStyle = color;
            context.lineWidth = 3;
            context.strokeStyle = "black";
            context.moveTo(0, 0);
            context.lineTo(60, 0);
            context.lineTo(60, 50);
            context.lineTo(0, 50);
            context.closePath();
            context.fill();
            context.stroke();
        }

        function axes(color) {
            context.strokeStyle=color;
            context.beginPath();
            // Axes
            context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
            // Arrowheads
            context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
            context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
            // X-label
            context.moveTo(130,-5);context.lineTo(140,5);
            context.moveTo(130,5);context.lineTo(140,-5);
            // Y-label
            context.moveTo(-5,130);context.lineTo(0,135);context.lineTo(5,130);
            context.moveTo(0,135);context.lineTo(0,142);
            
            context.stroke();
        }

        function ground(color){
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(50, 0);
            context.lineTo(-250, 0);
            context.lineTo(-250, 15);
            context.lineTo(50, 15);
            context.closePath();
            context.fill();
        }
        
        //axes("black"); // the separate initial axes

        // start robotic arm
        context.translate(400, 300);
        body("grey");
        armFirst("grey");  // the first body part
        context.save();

        context.translate(70, 0);
        context.rotate(a);
        armPiece("#4572D3"); // the first arm piece
        context.save();
       
        context.translate(120, 0); 
        context.rotate(n);
        context.scale(0.7, 0.7);
        armPiece("#4572D3"); // the second arm piece
        context.save();
        
        context.translate(120, 0);
        context.rotate(-45 * Math.PI * 0.005);
        context.rotate(g);
        hook("#2881AA");  // the first hook
        context.restore();

        context.save();
        context.translate(120, 0);
        context.rotate(g1);
        context.rotate(-90 * Math.PI * 0.005);
        context.scale(-1, 1);
        hook("#2881AA"); // the second hook
        circle("#5E8543", 20, "#013066", 8);
        
        context.restore();
        circle("#5E8543", 20, "#013066", 8);

        context.restore();
        circle("#5E8543", 20, "#013066", 8);
        context.restore();
        // robotic arm section ends
        
        // start decoration and wheels
        context.save();
        context.translate(-180, -80);
        decoration("#99C30B");
        context.save();
        context.translate(20, 0);
        context.scale(1, 0.8);
        decoration("#E0B00B");
        context.save();
        context.translate(20, 0);
        context.scale(1, 0.8);
        decoration("#E0650B");
        context.save();
        context.translate(20, 0);
        context.scale(1, 0.8);
        decoration("#E33711");
        context.restore();
        context.restore();
        context.restore();
        context.save();
        context.translate(5, 70);
        circle("#095C95", 10, "black", 4);
        context.restore();
        context.save();
        context.translate(90, 0);
        screen("#5AE4F2");
        context.restore(); // back to the axes after the first translation
        context.save();
        context.translate(80, -90);
        context.scale(0.8, 0.8);
        circle("#E0AC0B", 10, "black", 4);
        wheelLine2(70, "black", 5);
        context.restore();
        // decoration section ends
        
        // start decoration and wheels --> wheel section
        context.save();
        context.translate(0, 180);
        circle("orange", 40, "black", 10); // the first wheel
        context.save();
        
        context.translate(160, 0);
        circle("orange", 40, "black", 10); // the second wheel
        context.restore();
        // wheel section ends

        wheelLine(40, "black", 10); // the first wheelLine rotation

        context.save();
        context.translate(160, 0);
        wheelLine(40, "black", 10); // the second wheelLine rotation
        context.restore();

        context.restore();
        context.restore();
        context.save();
        context.translate(0, 145);
        ground("#362404");
        context.restore();
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}

window.onload = setup();