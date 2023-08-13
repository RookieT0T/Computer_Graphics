function setup(){
    var canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    slider1.value = 0;
    slider2.value = 200;
    slider3.value = 3;
    var f = 190;

    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        var dx = slider1.value;
        var dy = slider2.value;
        var dz = slider3.value;

        // the first rectangle
        function first(color){
            context.lineWidth = 6;
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(100, 100);
            context.lineTo(250, 100);
            context.lineTo(250, 250);
            context.lineTo(100, 250);
            context.closePath();
            context.fillStyle = "#004";
            context.fill();
            context.stroke();
        }

        function firstEye(color){
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(110, 110);
            context.lineTo(150, 110);
            context.lineTo(150, 150);
            context.lineTo(110, 150);
            context.closePath();
            context.fill();
        }
        
        function firstEye2(color){
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(200, 110);
            context.lineTo(240, 110);
            context.lineTo(240, 150);
            context.lineTo(200, 150);
            context.closePath();
            context.fill();
        }

        function firstMouth(dy){
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(160, 190);
            context.lineTo(190, 190);
            context.lineTo(175, dy);
            context.closePath();
            context.stroke();
        }
        
        // the second rectangle
        function second(color){
            context.strokeStyle = color;
            context.lineWidth = 8;
            context.beginPath();
            context.moveTo(350, 100);
            context.lineTo(500, 100);
            context.lineTo(480, 250);
            context.lineTo(370, 250);
            context.closePath();
            context.stroke();
        }

        function secondMouth(color){
            context.fillStyle = color;
            context.beginPath();
            context.moveTo(400, 230);
            context.lineTo(450, 230);
            context.lineTo(470, 240);
            context.lineTo(380, 240);
            context.closePath();
            context.fill();
        }

        function secondEye(){
            context.strokeStyle = "#890";
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(370, 120);
            context.lineTo(400, 120);
            context.lineTo(395, 150);
            context.closePath();
            context.stroke();
        }

        function secondEye2(){
            context.strokeStyle = "#890";
            context.beginPath();
            context.moveTo(480, 120);
            context.lineTo(450, 120);
            context.lineTo(455, 150);
            context.closePath();
            context.stroke();
        }

        function secondNose(){
            context.strokeStyle = "#830";
            context.beginPath();
            context.rect(420, f, 10, 20);
            context.closePath();
            context.stroke();
            f = (f + 1) % 190;
            window.requestAnimationFrame(draw);
        }

        // the third rectangle
        function third(){
            context.fillStyle = "#CD7F32";
            context.beginPath();
            context.moveTo(680, 100);
            context.lineTo(700, 100);
            context.lineTo(710, 150);
            context.lineTo(780, 150);
            context.lineTo(760, 250);
            context.lineTo(620, 250);
            context.lineTo(600, 150);
            context.lineTo(670, 150);
            context.closePath();
            context.fill();
        }

        function thirdMouth(){
            context.strokeStyle = "#FFB6C1";
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(650, 230);
            context.lineTo(730, 230);
            context.closePath();
            context.stroke();
        }

        function thirdEye(dz){
            context.strokeStyle = "#000000";
            context.lineWidth = dz;
            context.beginPath();
            context.moveTo(630, 180);
            context.lineTo(660, 180);
            context.lineTo(640, 190);
            context.closePath();
            context.stroke();
        }

        function thirdEye2(){
            context.beginPath();
            context.moveTo(750, 180);
            context.lineTo(720, 180);
            context.lineTo(740, 190);
            context.closePath();
            context.stroke();
        }

        // first shape callers
        first("blue");
        firstEye("yellow");
        firstEye2("yellow");
        firstMouth(dy);

        // second shape callers
        second("green");
        secondMouth("red");
        secondEye();
        secondEye2();
        secondNose();
    
        // third shape callers
        context.save();
        context.translate(dx, 0);
        third();
        thirdMouth();
        thirdEye(dz);
        thirdEye2();
        context.restore();
    }

    // we don't need an event listener - we'll update all the time
    // we don't need to draw - since requestanimationframe does that
    //slider1.addEventListener("input", draw);
    //slider2.addEventListener("input", draw);
    //slider3.addEventListener("input", draw);
    //draw();
    window.requestAnimationFrame(draw);
}

window.onload = setup();