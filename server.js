var PxPorCm = 10,
		Xo = 0,
		Yo = 0,
		alfa = 30 * Math.PI /180,
		atg = 0,
		DArc = 0,
		Dalfa = 0,
		vtg = 0,
		x = 200,
		y = 0,
		dt = 0.005,
		c =0,
		k = -0.1,
		t = 0,
		l = 0.3, // metros longitud de pendulo
		g = 9.8; // gravity m/s2x



window.onload = function() {
	console.log('hi')
    document.body.style.background = "#f3f3f3";

	var canvas = document.createElement("canvas");
	canvas.width = 800;
    canvas.height = 400;
    document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");

	
	

	var init = function(){
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		
		var puntos_finales = line_Ang({
										x1 : x,
										y1 : y,
										l : l * PxPorCm * 100,
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
					x2:  200,
					y2: 0 ,
					color : 'black'
		},ctx);
		line_Ang({
					x1 : puntos_finales.desp_X + x,
					y1 : puntos_finales.desp_Y + y,
					l :  0.1 * PxPorCm * 100,
					ang : 0 * Math.PI / 180,
					color : 'blue'
				},ctx);
		
		line_Ang({
					x1 : puntos_finales.desp_X + x,
					y1 : puntos_finales.desp_Y + y,
					l :  0.1 * PxPorCm * 100,
					ang : alfa,
					color : 'red'
		},ctx);
	}
	
	//init(alfa)

	setInterval(function () {
		t = t + dt;
		// reduccion del movimiento por friccion 
		
		atg = g * Math.sin(alfa) + k * vtg; // aceleracion tangengial m / s2
		vtg = vtg + atg * dt;
		DArc = vtg * dt;
		Dalfa = DArc / l; 
		alfa = alfa - Dalfa;
		//console.log(alfa * 180 / Math.PI)
		init(alfa)
		
	}, 1);

	
};