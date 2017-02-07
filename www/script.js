window.addEventListener('load', function () {

	var context = document.getElementById("images");
	var canvas = context.getContext('2d');
 
    // создание изображения
    var myimg  = new Image();
    myimg.src = 'images/4.jpg';
    myimg.setAttribute('crossOrigin', '');
 
    // копируем изображение в canvas
    $(myimg).load(function(){
      canvas.drawImage(myimg, 0, 0, 320 , 160);
    });

	img = function img (el,x,y) {
		var d = document.createElement("div");
		d.className     = "frame";
		d.style.left    = 50 * x + "%";
		d.style.top     = 50 * y + "%";
		var circle      = document.createElement("div");
		circle.className = "circle";
		//circle.style.backgroundColor =

		circle.style.backgroundColor = getColor(el,x,y,canvas);

		circle.onmouseover = function () {
			var ok = check_dimentions(this.parentNode);
			if (ok) {
				div(this.parentNode);
				this.parentNode.removeChild(this);				
			}

		}

		d.appendChild(circle);
		el.appendChild(d);
	},
	div = function div (el) {
		img(el,0,0);
		img(el,1,0);
		img(el,0,1);
		img(el,1,1);
	};
	div(document.getElementById("screen"));
	window.ondragstart = function() { return false; } 
}, false);

function check_dimentions(node) {
		var logoTextRectangle = node.getBoundingClientRect();
		var left = logoTextRectangle.left;
		var right = logoTextRectangle.right;
		var top = logoTextRectangle.top;
		var bottom = logoTextRectangle.bottom;

		if (((right - left) < 6) || ((bottom - top) < 6)) {
			return false;
		}
		return true;
}


function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}

function toHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
}

function getColor(el,x,y,canvas) {

		var logoTextRectangle = el.getBoundingClientRect();
		var left = logoTextRectangle.left + ((logoTextRectangle.right - logoTextRectangle.left) / 2) * x - 400;
		var right = logoTextRectangle.left + ((logoTextRectangle.right - logoTextRectangle.left) / 2) + ((logoTextRectangle.right - logoTextRectangle.left) / 2) * x - 400;
		var top = logoTextRectangle.top + ((logoTextRectangle.bottom - logoTextRectangle.top) / 2) * y - 200;
		var bottom = logoTextRectangle.top + ((logoTextRectangle.bottom - logoTextRectangle.top) / 2) + ((logoTextRectangle.bottom - logoTextRectangle.top) / 2) * y - 200;




		var img_data = canvas.getImageData(left/2, top/4, 1, 1).data;
	    var R = img_data[0];
	    var G = img_data[1];
	    var B = img_data[2];  
	    var rgb = R + ',' + G + ',' + B;

	    var hex = rgbToHex(R,G,B);

	    return "#" + hex;
}