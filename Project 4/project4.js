function setup() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    slider1.value = 190; // change curve shape
    slider2.value = 300; // change curve shape
    slider3.value = 0; // change the visibility of a curve
    var tParam1 = 0; // time parameter for the first rocket
    var tParam2 = 0; // time parameter for UFO
    var tParam3 = 1.5; // time paramter for the second rocket
    var tParam4 = -3.5; // time parameter for the satellite

    function draw(){
	canvas.width = canvas.width;
    var userValue1 = slider1.value * 0.01;
    var userValue2 = slider2.value * 0.01;
    var visibility = slider3.value;
    
	tParam1 += 0.008;
    tParam2 += 0.005;
    tParam3 += 0.008;
    tParam4 += 0.005;

    if(tParam1 > 8){
        tParam1 = 0;
    }

    if(tParam3 > 8){
        tParam3 = 0;
    }

    if(tParam2 > 2.3){
        tParam2 = 0;
    }

    if(tParam4 > 7.995){
        tParam4 = -3.5;
    }
	
	function moveToTx(loc,Tx){
        var res=vec2.create(); 
        vec2.transformMat3(res,loc,Tx); 
        context.moveTo(res[0],res[1]);
    }

	function lineToTx(loc,Tx){
        var res=vec2.create(); 
        vec2.transformMat3(res,loc,Tx); 
        context.lineTo(res[0],res[1]);
    }
	
    function circle(color, radius, strokeStyle, lineWidth, Tx){
        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.fillStyle = color;
        var res = vec2.create();
        vec2.transformMat3(res,[0,0], Tx);
        context.arc(res[0], res[1], radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }

	function drawObject(color,Tx, lineWidth){
	    context.beginPath();
	    context.fillStyle = color;
        context.lineWidth = lineWidth;
        context.strokeStyle = "black";
	    moveToTx([-0.2,-0.1],Tx);
	    lineToTx([-0.2,0.1],Tx);
        lineToTx([-0.25,0.15],Tx);
        lineToTx([-0.15,0.15],Tx);
        lineToTx([-0.1,0.1],Tx);
        lineToTx([0.2,0.12],Tx);
      	lineToTx([0.3,0],Tx);
	    lineToTx([0.2,-0.12],Tx);
        lineToTx([-0.1,-0.1],Tx);
        lineToTx([-0.15,-0.15],Tx);
        lineToTx([-0.25,-0.15],Tx);
	    context.closePath();
	    context.fill();
        context.stroke();
	}

    function drawFire(Tx){
        context.beginPath();
        context.fillStyle = "#E83B09";
        moveToTx([0,0],Tx);
        lineToTx([-0.35,-0.08],Tx);
        lineToTx([-0.25,0],Tx);
        lineToTx([-0.35,0.08],Tx);
        context.closePath();
	    context.fill();
    }

    function drawUFO(Tx){
        context.beginPath();
        circle("#777B79", 25, "#5E4AEE", 4, Tx);
        circle("#549FB7", 11, "black", 4, Tx);
    }

    function drawSatellite(Tx){
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = "black";
        context.fillStyle = "#DE8138";
        moveToTx([-0.2,-0.1],Tx);
        lineToTx([-0.2,0.1],Tx);
        lineToTx([-0.15,0.1],Tx);
        lineToTx([-0.15,0.15],Tx);
        lineToTx([-0.2,0.15],Tx);
        lineToTx([-0.2,0.25],Tx);
        lineToTx([0,0.25],Tx);
        lineToTx([0,0.15],Tx);
        lineToTx([-0.1,0.15],Tx);
        lineToTx([-0.1,0.1],Tx);
        lineToTx([0.15,0.1],Tx);
        lineToTx([0.2,0],Tx);
        lineToTx([0.15,-0.1],Tx);
        lineToTx([-0.1,-0.1],Tx);
        lineToTx([-0.1,-0.15],Tx);
        lineToTx([0,-0.15],Tx);
        lineToTx([0,-0.25],Tx);
        lineToTx([-0.2,-0.25],Tx);
        lineToTx([-0.2,-0.15],Tx);
        lineToTx([-0.15,-0.15],Tx);
        lineToTx([-0.15,-0.1],Tx);
        context.closePath();
	    context.fill();
        context.stroke();
    }

	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t); // 1 * 4 matrix or b(u)
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0]; // origin
	var d0=[1,2.3];

	var p1=[userValue1,1]; // on the first quadrant
	var d1=[2,0];

	var p2=[userValue2,0]; // on positive x axis
	var d2=[0,-2];

    var p3=[userValue1,-1]; // on the fourth quadrant
    var d3=[-2,0];

    var p4=[0, 0]; // pass across the origin
    var d4=[-1,2.3];

    var p5=[-userValue1,1]; // on the second quadrant
    var d5=[-2,0];

    var p6=[-userValue2,0]; // on negative x axis
    var d6=[0,-2];

    var p7=[-userValue1,-1]; // on the third quadrant
    var d7=[2,0];

	var P0 = [p0,d0,p1,d1];
	var P1 = [p1,d1,p2,d2];
    var P2 = [p2,d2,p3,d3];
    var P3 = [p3,d3,p4,d4];
    var P4 = [p4,d4,p5,d5];
    var P5 = [p5,d5,p6,d6];
    var P6 = [p6,d6,p7,d7];
    var P7 = [p7,d7,p0,d0];
    
	var C0 = function(t) {return Cubic(Hermite,P0,t);};
	var C1 = function(t) {return Cubic(Hermite,P1,t);};
    var C2 = function(t) {return Cubic(Hermite,P2,t);};
    var C3 = function(t) {return Cubic(Hermite,P3,t);};
    var C4 = function(t) {return Cubic(Hermite,P4,t);};
    var C5 = function(t) {return Cubic(Hermite,P5,t);};
    var C6 = function(t) {return Cubic(Hermite,P6,t);};
    var C7 = function(t) {return Cubic(Hermite,P7,t);};

	var C0prime = function(t) {return Cubic(HermiteDerivative,P0,t);};
	var C1prime = function(t) {return Cubic(HermiteDerivative,P1,t);};
    var C2prime = function(t) {return Cubic(HermiteDerivative,P2,t);};
    var C3prime = function(t) {return Cubic(HermiteDerivative,P3,t);};
    var C4prime = function(t) {return Cubic(HermiteDerivative,P4,t);};
	var C5prime = function(t) {return Cubic(HermiteDerivative,P5,t);};
    var C6prime = function(t) {return Cubic(HermiteDerivative,P6,t);};
    var C7prime = function(t) {return Cubic(HermiteDerivative,P7,t);};

    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else if(t < 2){
            var u = t-1.0;
            return C1(u);
        } else if(t < 3){
            var u = t-2.0;
            return C2(u);
        } else if(t < 4){
            var u = t-3.0;
            return C3(u);
        }
        else if(t < 5){
            var u = t-4.0;
            return C4(u);
        }
        else if(t < 6){
            var u = t-5.0;
            return C5(u);
        }
        else if(t < 7){
            var u = t-6.0;
            return C6(u);
        }
        else {
            var u = t-7.0;
            return C7(u);
        }
	}

    var Ccomp_tangent1 = function(t){
        if (t<1){
            var u = t;
            return C0prime(u);
        } else if (t < 2){
            var u = t-1.0;
            return C1prime(u);
        } else if(t < 3){
            var u = t-2.0;
            return C2prime(u);
        } else if(t < 4){
            var u = t-3.0;
            return C3prime(u);
        }
        else if(t < 5){
            var u = t-4.0;
            return C4prime(u);
        }
        else if(t < 6){
            var u = t-5.0;
            return C5prime(u);
        }
        else if(t < 7){
            var u = t-6.0;
            return C6prime(u);
        }
        else {
            var u = t-7.0;
            return C7prime(u);
        }
	}

    var firstCurve1 = function(t) {
        var x = t;
        var y = 0.5 * t * t;
        return [x,y];
    }

    var secondCurve1 = function(t) {
        var x = 0.5 * t * t + 0.5;
        var y = t - 0.5;
        return [x,y];
    }

    var thirdCurve1 = function(t) {
        var x = 1.5 * t * t - 3.5;
        var y = t * t - t * (t - 3) - 4.5;
        return [x,y];
    }

    var fourthCurve1 = function(t){
        var x = -t;
        var y = t * (t - 2) * (t - 1);
        return [x,y];
    }

    var completeCurve1 = function(t) {
        if(t < 1){
            return firstCurve1(t);
        }
        else if(t < 2){
            return secondCurve1(t);
        }
        else {
            return thirdCurve1(t);
        }
    }

    ///////////////////////////////////////////

    var firstCurve2 = function(t) {
        var x = t;
        var y = t * t + 2 * t ;
        return [x,y];
    }

    var firstCurve1_Deri = function(t){
        var x = 1;
        var y = 2 * t + 2;
        return [x,y];
    }

    var secondCurve2 = function(t){
        var x = t;
        var y = 0.5 * t * t + t - 0.5;
        return [x,y];
    }

    var secondCurve2_Deri = function(t){
        var x = 1;
        var y = 0.5 * 2 * t + 1;
        return [x,y];
    }

    var completeCurve2 = function(t){
        if(t < -1){
            return secondCurve2(t);
        }
        else if(t < 0){
            return firstCurve2(t);
        }
        else{
            return Ccomp(t);
        }
    }

    var completeCurve2_Deri = function(t){
        if(t < -1){
            return secondCurve2_Deri(t);
        }
        else if(t < 0){
            return firstCurve1_Deri(t);
        }
        else{
            return Ccomp_tangent1(t);
        }
    }

    function drawTrajectory(tbegin,tend,intervals,C,Tx,color,lineWidth){
	    context.strokeStyle=color;
        context.lineWidth = lineWidth;
	    context.beginPath();
        moveToTx(C(tbegin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*tbegin+(i/intervals)*tend;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}

	var axes_to_canvas = mat3.create();
	mat3.fromTranslation(axes_to_canvas,[650,400]);
	mat3.scale(axes_to_canvas,axes_to_canvas,[150,-150]); // Flip the Y-axis

    // moon
    var planet1_to_axes = mat3.create();
    mat3.fromTranslation(planet1_to_axes,[-1.82, 0]);
    var planet1_to_canvas = mat3.create();
    mat3.multiply(planet1_to_canvas, axes_to_canvas, planet1_to_axes);
    circle("#A7A492", 100, "#F7EB8B", 5, planet1_to_canvas);

    // single piecewise-defined curve
    drawTrajectory(-0.4,0,100,fourthCurve1,axes_to_canvas,"black", 6);

    // piecewise-defined curve for UFO
    drawTrajectory(0.0,1.0,100,firstCurve1,axes_to_canvas,"#C0B1FB", 5);
    drawTrajectory(1.0,2.0,100,secondCurve1,axes_to_canvas,"#D55E8F", 5);
    drawTrajectory(2.0,2.2,100,thirdCurve1,axes_to_canvas,"#6A48F6", 5);
    var UFO_to_axes = mat3.create();
    mat3.fromTranslation(UFO_to_axes,completeCurve1(tParam2));
    var UFO_to_canvas = mat3.create();
    mat3.multiply(UFO_to_canvas, axes_to_canvas, UFO_to_axes);
    drawUFO(UFO_to_canvas);
    circle("#53A9CA", 8, "black", 2, UFO_to_canvas);

    // parametric cubic curve by Hermite, the infinity symbol
	drawTrajectory(0.0,1.0,100,C0,axes_to_canvas,"#98B4B9",7);
	drawTrajectory(0.0,1.0,100,C1,axes_to_canvas,"#50B1CB",7);
    drawTrajectory(0.0,1.0,100,C2,axes_to_canvas,"#428FA4",7);
    drawTrajectory(0.0,1.0,100,C3,axes_to_canvas,"#357282",7);
    drawTrajectory(0.0,1.0,100,C4,axes_to_canvas,"#1F6882",7);
    drawTrajectory(0.0,1.0,100,C5,axes_to_canvas,"#133139",7);
    drawTrajectory(0.0,1.0,100,C6,axes_to_canvas,"#2B6F81",7);
    drawTrajectory(0.0,1.0,100,C7,axes_to_canvas,"#2F89A1",7);

	var rocket1_to_axes = mat3.create();
	mat3.fromTranslation(rocket1_to_axes,Ccomp(tParam1));
	var rocket1_to_canvas = mat3.create();
    var tangent1 = Ccomp_tangent1(tParam1);
    var angle = Math.atan2(tangent1[1],tangent1[0]);
	mat3.rotate(rocket1_to_axes,rocket1_to_axes,angle);
	mat3.multiply(rocket1_to_canvas, axes_to_canvas, rocket1_to_axes);
    //drawFire(rocket1_to_canvas);
	//drawObject("#758D96",rocket1_to_canvas, 4);
    //circle("#53A9CA", 8, "black", 4, rocket1_to_canvas);

    var rocket2_to_axes = mat3.create();
    mat3.fromTranslation(rocket2_to_axes,Ccomp(tParam3));
    var rocket2_to_canvas = mat3.create();
    var tangent2 = Ccomp_tangent1(tParam3);
    var angle = Math.atan2(tangent2[1],tangent2[0]);
    mat3.rotate(rocket2_to_axes,rocket2_to_axes,angle);
    mat3.multiply(rocket2_to_canvas, axes_to_canvas, rocket2_to_axes);
    //drawFire(rocket2_to_canvas);
	//drawObject("#EBB0ED",rocket2_to_canvas, 4);
    //circle("#53A9CA", 8, "black", 4, rocket2_to_canvas);

    // piecewise-defined curve for satellite
    if(visibility == 0){
        drawTrajectory(-3.5,-1,100,secondCurve2,axes_to_canvas,"#C4897D", 6);
        drawTrajectory(-1,0,100,firstCurve2,axes_to_canvas,"#98311E", 6);
    }
    var Sat_to_axes = mat3.create();
    mat3.fromTranslation(Sat_to_axes,completeCurve2(tParam4));
    var tangent3 = completeCurve2_Deri(tParam4);
    var angle3 = Math.atan2(tangent3[1],tangent3[0]);
    mat3.rotate(Sat_to_axes,Sat_to_axes,angle3);
    var Sat_to_canvas = mat3.create();
    mat3.multiply(Sat_to_canvas, axes_to_canvas, Sat_to_axes);
    drawSatellite(Sat_to_canvas);
    circle("#53A9CA", 8, "black", 4, Sat_to_canvas);

    // draw the first rocket here is to prevent line segment from covering the rocket
    drawFire(rocket1_to_canvas);
	drawObject("#758D96",rocket1_to_canvas, 4);
    circle("#53A9CA", 8, "black", 4, rocket1_to_canvas);

    // draw the second rocket here is to prevent line segment from covering the rocket
    drawFire(rocket2_to_canvas);
	drawObject("#EBB0ED",rocket2_to_canvas, 4);
    circle("#53A9CA", 8, "black", 4, rocket2_to_canvas);
    window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
    draw();
}
window.onload = setup;