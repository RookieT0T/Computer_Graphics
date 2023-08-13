function setup() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");
    slider1.value = 190; // change curve shape
    slider2.value = 0; // change the rotation angle of camera
    slider3.value = 0; // change the visibility of a curve
    var tParam1 = 0; // time parameter for the first rocket
    var tParam2 = 0; // time parameter for the third rocket
    var tParam3 = 1.5; // time paramter for the second rocket
    var tParam4 = -3.5; // time parameter for the satellite

    function draw(){
	canvas.width = canvas.width;
    var userValue1 = slider1.value * 0.01;
    var visibility = slider3.value;
    var viewAngle = slider2.value*0.02*Math.PI;
    
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
        tParam2 = 0.2;
    }

    if(tParam4 > 0){
        tParam4 = -3.5;
    }

	function moveToTx(loc,Tx){
        var res=vec3.create(); 
        vec3.transformMat4(res,loc,Tx); 
        context.moveTo(res[0],res[1]);
    }

	function lineToTx(loc,Tx){
        var res=vec3.create(); 
        vec3.transformMat4(res,loc,Tx); 
        context.lineTo(res[0],res[1]);
    }
	
    function circle(color, radius, strokeStyle, lineWidth, Tx){
        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.fillStyle = color;
        var res = vec3.create();
        vec3.transformMat4(res,[0,0,0], Tx);
        context.arc(res[0], res[1], radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }

	function drawObject(color,Tx, lineWidth){
	    context.beginPath();
	    context.fillStyle = color;
        context.lineWidth = lineWidth;
        context.strokeStyle = "black";
	    moveToTx([-0.2,-0.1,0],Tx);
	    lineToTx([-0.2,0.1,0],Tx);
        lineToTx([-0.25,0.15,0],Tx);
        lineToTx([-0.15,0.15,0],Tx);
        lineToTx([-0.1,0.1,0],Tx);
        lineToTx([0.2,0.12,0],Tx);
      	lineToTx([0.3,0,0],Tx);
	    lineToTx([0.2,-0.12,0],Tx);
        lineToTx([-0.1,-0.1,0],Tx);
        lineToTx([-0.15,-0.15,0],Tx);
        lineToTx([-0.25,-0.15,0],Tx);
	    context.closePath();
	    context.fill();
        context.stroke();
	}

    function drawFire(Tx){
        context.beginPath();
        context.fillStyle = "#E83B09";
        moveToTx([0,0,0],Tx);
        lineToTx([-0.35,-0.08,0],Tx);
        lineToTx([-0.25,0,0],Tx);
        lineToTx([-0.35,0.08,0],Tx);
        context.closePath();
	    context.fill();
    }

    function drawWing(Tx, color){
        context.beginPath();
        context.lineWidth = 3;
        context.fillStyle = color;
        moveToTx([-0.18,0,-0.1],Tx);
        lineToTx([0,0,0],Tx);
        lineToTx([-0.18,0,0.1],Tx);
        context.closePath();
	    context.fill();
        context.stroke();
    }

    function drawDecoration(Tx){
        context.beginPath();
        context.fillStyle = "black";
        moveToTx([0.2,0.12,0],Tx);
        lineToTx([0.3,0,0],Tx);
        lineToTx([0.2,-0.12,0],Tx);
        lineToTx([0.1,0,0],Tx);
        context.closePath();
	    context.fill();
    }

    function drawSatellite(Tx){
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = "black";
        context.fillStyle = "#DE8138";
        moveToTx([-0.2,-0.1,0],Tx);
        lineToTx([-0.2,0.1,0],Tx);
        lineToTx([-0.15,0.1,0],Tx);
        lineToTx([-0.15,0.15,0],Tx);
        lineToTx([-0.2,0.15,0],Tx);
        lineToTx([-0.2,0.25,0],Tx);
        lineToTx([0,0.25,0],Tx);
        lineToTx([0,0.15,0],Tx);
        lineToTx([-0.1,0.15,0],Tx);
        lineToTx([-0.1,0.1,0],Tx);
        lineToTx([0.15,0.1,0],Tx);
        lineToTx([0.2,0,0],Tx);
        lineToTx([0.15,-0.1,0],Tx);
        lineToTx([-0.1,-0.1,0],Tx);
        lineToTx([-0.1,-0.15,0],Tx);
        lineToTx([0,-0.15,0],Tx);
        lineToTx([0,-0.25,0],Tx);
        lineToTx([-0.2,-0.25,0],Tx);
        lineToTx([-0.2,-0.15,0],Tx);
        lineToTx([-0.15,-0.15,0],Tx);
        lineToTx([-0.15,-0.1,0],Tx);
        context.closePath();
	    context.fill();
        context.stroke();
    }

    function drawSatelliteDeco(Tx){
        context.beginPath();
        context.lineWidth = 4;
        context.fillStyle = "grey";
        moveToTx([-0.1,-0.1,0],Tx);
        lineToTx([0.1,-0.1,0],Tx);
        lineToTx([0.1,0.1,0],Tx);
        lineToTx([-0.1,0.1,0],Tx);
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
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0,0]; // origin
	var d0=[1,2.3,0];

	var p1=[userValue1,1,-1]; // on the first quadrant
	var d1=[2,0,0];

	var p2=[3,0,0.5]; // on positive x axis
	var d2=[0,-2,0];

    var p3=[userValue1,-1,0]; // on the fourth quadrant
    var d3=[-2,0,0];

    var p4=[0, 0, 0]; // pass across the origin
    var d4=[-1,2.3, 0];

    var p5=[-userValue1,1,0]; // on the second quadrant
    var d5=[-2,0,0];

    var p6=[-3,0,-0.5]; // on negative x axis
    var d6=[0,-2,0];

    var p7=[-userValue1,-1,1]; // on the third quadrant
    var d7=[2,0,0];

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

    var secondCurve1 = function(t){
        var x = 0.5 * t * t;
        var y = t;
        var z = t;
        return [x,y,z];
    }

    var secondCurve1_Deri = function(t){
        var x = t;
        var y = 1;
        var z = 1;
        return [x,y,z];
    }

    var thirdCurve1 = function(t){
        var x = 1.5 * t * t - 4;
        var y = t * t - t * (t - 3) - 4;
        var z = 3 * t - 4;
        return [x,y,z];
    }

    var thirdCurve1_Deri = function(t){
        var x = 3 * t;
        var y = 3;
        var z = 3;
        return [x,y,z];
    }

    var fourthCurve1 = function(t){
        var x = -t;
        var y = t * (t - 2) * (t - 1);
        var z = 0;
        return [x,y,z];
    }

    var completeCurve1 = function(t){
        if(t < 2){
            return secondCurve1(t);
        }
        else {
            return thirdCurve1(t);
        }
    }

    var completeCurve1_Deri = function(t){
        if(t < 2){
            return secondCurve1_Deri(t);
        }
        else {
            return thirdCurve1_Deri(t);
        }
    }

    ///////////////////////////////////////////

    var firstCurve2 = function(t){
        var x = t;
        var y = t * t + 2 * t;
        var z = 0;
        return [x,y,z];
    }

    var firstCurve2_Deri = function(t){
        var x = 1;
        var y = 2 * t + 2;
        var z = 1;
        return [x,y,z];
    }

    var secondCurve2 = function(t){
        var x = t;
        var y = 0.5 * t * t + t - 0.5;
        var z = 0;
        return [x,y,z];
    }

    var secondCurve2_Deri = function(t){
        var x = 1;
        var y = 0.5 * 2 * t + 1;
        var z = 1;
        return [x,y,z];
    }

    var completeCurve2 = function(t){
        if(t < -1){
            return secondCurve2(t);
        }
        else{
            return firstCurve2(t);
        }
    }

    var completeCurve2_Deri = function(t){
        if(t < -1){
            return secondCurve2_Deri(t);
        }
        else{
            return firstCurve2_Deri(t);
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

    var CameraCurve = function(angle){
        var distance = 150.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 50;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0],eye[1],eye[2]];
    }

    // Create Camera (lookAt) transform
    var eye = CameraCurve(viewAngle);
    var target = vec3.fromValues(0,0,0); 
    var up = vec3.fromValues(0,80,0);
    //var upObserver = vec3.fromValues(0,1,0);
	var lookAtMatrix = mat4.create();
    mat4.lookAt(lookAtMatrix, eye, target, up);
      
    // Create ViewPort transform
    var viewPortMatrix = mat4.create();
	mat4.fromTranslation(viewPortMatrix,[600,440,0]);
	mat4.scale(viewPortMatrix,viewPortMatrix,[150,-150,1]);

    // Create Projection transform
    var projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix,-1,1,-1,1,-1,1);

    // Create combined ultimate transformation matrix
    var combinedMatrix = mat4.create();
    mat4.multiply(combinedMatrix,viewPortMatrix,projectionMatrix);
    mat4.multiply(combinedMatrix,combinedMatrix,lookAtMatrix);

    // moon
    var planet_to_axes = mat4.create();
    mat4.fromTranslation(planet_to_axes,[-1.82, 0, 0]);
    var planet1_to_canvas = mat4.create();
    mat4.multiply(planet1_to_canvas, combinedMatrix, planet_to_axes);
    circle("#4B4941", 100, "#F7EB8B", 5, planet1_to_canvas);

    // single piecewise-defined curve
    drawTrajectory(-0.4,0,100,fourthCurve1,combinedMatrix,"black", 6);

    // piecewise-defined curve for rocket 3
    drawTrajectory(0.0,2.0,100,secondCurve1,combinedMatrix,"#C0B1FB", 5);
    drawTrajectory(2.0,2.2,100,thirdCurve1,combinedMatrix,"#6A48F6", 5);

    // ultimate matrix for rocket 3
    var rocket3_to_axes = mat4.create();
    mat4.fromTranslation(rocket3_to_axes,completeCurve1(tParam2));
    var tangent4 = completeCurve1_Deri(tParam2);
    var rocket3_rotate = mat4.create();
    var eyeRocket3 = vec3.fromValues(0,0,0);
    mat4.lookAt(rocket3_rotate, eyeRocket3, tangent4, completeCurve1(tParam2));
    mat4.invert(rocket3_rotate, rocket3_rotate);
    mat4.multiply(rocket3_to_axes, rocket3_to_axes, rocket3_rotate);
    mat4.rotateY(rocket3_to_axes, rocket3_to_axes, Math.PI/2);
    var rocket3_ultimateTMatrix = mat4.create();
    mat4.multiply(rocket3_ultimateTMatrix,combinedMatrix , rocket3_to_axes);

    // parametric cubic curve by Hermite, the infinity symbol
	drawTrajectory(0.0,1.0,100,C0,combinedMatrix,"#98B4B9",7);
	drawTrajectory(0.0,1.0,100,C1,combinedMatrix,"#50B1CB",7);
    drawTrajectory(0.0,1.0,100,C2,combinedMatrix,"#428FA4",7);
    drawTrajectory(0.0,1.0,100,C3,combinedMatrix,"#357282",7);
    drawTrajectory(0.0,1.0,100,C4,combinedMatrix,"#1F6882",7);
    drawTrajectory(0.0,1.0,100,C5,combinedMatrix,"#133139",7);
    drawTrajectory(0.0,1.0,100,C6,combinedMatrix,"#2B6F81",7);
    drawTrajectory(0.0,1.0,100,C7,combinedMatrix,"#2F89A1",7);

    // ultimate matrix for rocket 1
	var rocket1_to_axes = mat4.create();
	mat4.fromTranslation(rocket1_to_axes,Ccomp(tParam1));    
	var rocket1_ultimateTMatrix = mat4.create();
    var tangent1 = Ccomp_tangent1(tParam1);
    var rocket1_rotate = mat4.create();
    var eyeRocket1 = vec3.fromValues(0,0,0);
    mat4.lookAt(rocket1_rotate, eyeRocket1, tangent1, Ccomp(tParam1));
    mat4.invert(rocket1_rotate, rocket1_rotate);
    mat4.multiply(rocket1_to_axes, rocket1_to_axes, rocket1_rotate);
    mat4.rotateY(rocket1_to_axes, rocket1_to_axes, Math.PI/2);
	mat4.multiply(rocket1_ultimateTMatrix, combinedMatrix, rocket1_to_axes);

    // ultimate matrix for rocket 2
    var rocket2_to_axes = mat4.create();
    mat4.fromTranslation(rocket2_to_axes,Ccomp(tParam3));
    var rocket2_ultimateTMatrix = mat4.create();
    var tangent2 = Ccomp_tangent1(tParam3);
    var rocket2_rotate = mat4.create();
    var eyeRocket2 = vec3.fromValues(0,0,0);
    mat4.lookAt(rocket2_rotate, eyeRocket2, tangent2, Ccomp(tParam3));
    mat4.invert(rocket2_rotate, rocket2_rotate);
    mat4.multiply(rocket2_to_axes, rocket2_to_axes, rocket2_rotate);
    mat4.rotateY(rocket2_to_axes, rocket2_to_axes, Math.PI/2);
    mat4.multiply(rocket2_ultimateTMatrix, combinedMatrix, rocket2_to_axes);

    // piecewise-defined curve for satellite
    if(visibility == 0){
        drawTrajectory(-3.5,-1,100,secondCurve2,combinedMatrix,"#C4897D", 6);
        drawTrajectory(-1,0,100,firstCurve2,combinedMatrix,"#98311E", 6);
    }
    var Sat_to_axes = mat4.create();
    mat4.fromTranslation(Sat_to_axes,completeCurve2(tParam4));
    var tangent3 = completeCurve2_Deri(tParam4);
    var angle3 = Math.atan2(tangent3[1],tangent3[0]);
    mat4.rotateZ(Sat_to_axes,Sat_to_axes,angle3);
    var Sat_ultimateTMatrix = mat4.create();
    mat4.multiply(Sat_ultimateTMatrix, combinedMatrix, Sat_to_axes);
    drawSatellite(Sat_ultimateTMatrix);
    drawSatelliteDeco(Sat_ultimateTMatrix);

    // draw the first rocket here is to prevent line segment from covering the rocket
    drawFire(rocket1_ultimateTMatrix);
    drawWing(rocket1_ultimateTMatrix,"#758D96");
	drawObject("#758D96",rocket1_ultimateTMatrix, 4);
    drawDecoration(rocket1_ultimateTMatrix);

    // draw the second rocket here is to prevent line segment from covering the rocket
    drawFire(rocket2_ultimateTMatrix);
    drawWing(rocket2_ultimateTMatrix,"#EBB0ED");
	drawObject("#EBB0ED",rocket2_ultimateTMatrix, 4);
    drawDecoration(rocket2_ultimateTMatrix);

    // draw the third rocket here is to prevent line segment from covering the rocket
    drawFire(rocket3_ultimateTMatrix);
    drawWing(rocket3_ultimateTMatrix, "#E83B09");
    drawObject("#D34D4D",rocket3_ultimateTMatrix, 4);
    drawDecoration(rocket3_ultimateTMatrix);
    window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
    draw();
}
window.onload = setup;