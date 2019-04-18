
var PxPorCm = 50,
		height_canvas = 400,
		Xo = 0,
		Yo = 0,
		alfa = 60 * Math.PI /180,
		atg = 0,
		DArc = 0,
		Dalfa = 0,
		vtg = 0,
		x = 0,
		y = 0,
		dt = 0.005,
		c =0,
		k = -0.1,
		t = 0,
		long_cuerda = 300, // cm longitud de pendulo
		g = 9.8, // gravity m/s2x
		mass = 0.1,
		sample_time = 5; // Senconds

window.onload = function() {
	start()
};


function start(){

	var canvasElement = document.getElementById('canvasElement')

	canvasElement.style.background = "#f3f3f3";

	var canvas = document.createElement("canvas");
	canvas.width = canvasElement.clientWidth;
	// canvas.height = canvasElement.clientHeight;
	canvas.height = height_canvas;


	canvasElement.appendChild(canvas);
	var ctx = canvas.getContext("2d");


	var init = function(alfa){
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		x  = canvas.width /2;
		var puntos_finales = line_Ang({
										x1 : x,
										y1 : y,
										l : long_cuerda,
										ang : alfa,
										color : 'black'
									},ctx);

		// punto alto
		punto({
				centroX : puntos_finales.desp_X + x,
				centroY : puntos_finales.desp_Y + y,
				radio : 10
		},ctx);

		linea({x1 : 0,
					y1 : 0,
					x2:  400,
					y2: 0 ,
					color : 'black'
		},ctx);

		line_Ang({
					x1 : puntos_finales.desp_X + x,
					y1 : puntos_finales.desp_Y + y,
					l :  mass * g * PxPorCm,
					ang : 0 * Math.PI / 180,
					color : 'blue'
		},ctx);

		line_Ang({
					x1 : puntos_finales.desp_X + x,
					y1 : puntos_finales.desp_Y + y,
					// l :  0.1 * PxPorCm,
					l :  mass * g * Math.cos(alfa) * PxPorCm,
					ang : alfa,
					color : 'red'
		},ctx);

		var state = 0;
		state = (alfa > 0)?-1:1;

		line_Ang({
					x1 : puntos_finales.desp_X + x,
					y1 : puntos_finales.desp_Y + y,
					l :  mass * g * Math.sin(alfa) * PxPorCm,
					ang : alfa - (90 * Math.PI / 180),
					// ang : alfa,
					color : 'green'
		},ctx);
	}

	setInterval(function () {

		t = t + dt;
		// reduccion del movimiento por friccion

		atg = g * Math.sin(alfa) + k * vtg; // aceleracion tangengial m / s2
		vtg = vtg + atg * dt;
		DArc = vtg * dt;
		Dalfa = DArc / (long_cuerda / 1000);
		alfa = alfa - Dalfa;

		var fx = (Math.round(mass * g * Math.cos(alfa) * 100) / 100);
		var fy = (Math.round(mass * g * Math.sin(alfa) * 100) / 100);
		var tenss = Math.sqrt((fx * fx) + (fy * fy));

		document.getElementById("angle_time").innerHTML = "Angle alpha: "  + Math.round(alfa * 100) / 100;
		document.getElementById("force_x").innerHTML = "Force on X: "  + fx;
		document.getElementById("force_y").innerHTML = "Force on Y: "  + fy;
		document.getElementById("tension").innerHTML = "Tension force: "  + Math.round(tenss * 100) / 100;
		document.getElementById("time").innerHTML = "Time: " + Math.round(t) + " seg";
		init(alfa)
		// init()

	}, sample_time);
}
