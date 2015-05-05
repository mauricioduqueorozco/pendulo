var linea = function(datos, ctx){
	ctx.beginPath();
	ctx.strokeStyle = datos.color; 
	ctx.moveTo(datos.x1, datos.y1);
		ctx.lineTo(datos.x2, datos.y2);
	ctx.closePath();
	ctx.stroke();
};

var line_Ang = function(datos, ctx){
	var longitud = datos.l;
	var angulo = - datos.ang + (90  * Math.PI / 180);

	var desp_X = Math.cos(angulo) * longitud;
	var desp_Y = Math.sin(angulo) * longitud;

	ctx.beginPath();
	ctx.strokeStyle = datos.color; 
	ctx.moveTo(datos.x1, datos.y1);
		ctx.lineTo(desp_X + datos.x1, desp_Y + datos.y1);
	ctx.closePath();
	ctx.stroke();
	return({desp_X,
			desp_Y});
};

var circulo = function(datos, ctx){
	
	rad = (Math.PI/180)*360;
	ctx.beginPath();
	
		centroX = datos.centroX;
		centroY = datos.centroY;
		R = datos.radio;

		ctx.strokeStyle = datos.color; //red
		ctx.arc(centroX,centroY,R,0,rad,true);

	ctx.closePath();
	ctx.stroke();
				
};

var punto = function(datos, ctx){
	
	rad = (Math.PI/180)*360;
	ctx.beginPath();
	
		centroX = datos.centroX;
		centroY = datos.centroY;
		R = datos.radio;

		ctx.strokeStyle = 'red'; //red
		ctx.arc(centroX,centroY,R,0,rad,true);
	ctx.closePath();
	ctx.stroke();
				
};