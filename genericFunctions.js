var canvas = document.createElement("canvas");
canvas.setAttribute('style', 'border: 1px solid');
var context = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var keysDown = {};
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

var m_w = 123456789; var m_z = 987654321; var mask = 0xffffffff;
m_w = new Date().getTime();

function randomDouble () {
	m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
	m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
	var result = ((m_z << 16) + m_w) & mask;
	result /= 4294967296;
	return result + 0.5;
}

function randomBetween (start,end) { 
	return start + randomDouble() * (end-start); 
}

function clear () {
	canvas.width = canvas.width; 
}

function drawBox (x,y,w,h,color) {
	context.fillStyle = color; context.fillRect(x,y,w,h); 
}

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    var denominator, a, b, numerator1, numerator2, result = { x: null, y: null, onLine1: false, onLine2: false };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) return false;
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    if (a >= 0 && a <= 1) result.onLine1 = true;
    if (b >= 0 && b <= 1) result.onLine2 = true;
    return result.onLine1 && result.onLine2;
}

function lengthOfLine(x1, y1, x2, y2) {
	var a2 = Math.pow((x1-x2),2);
	var b2 = Math.pow((y1-y2),2);
	return Math.sqrt(a2+b2);
}

function drawLine(x1,y1,x2,y2) { 
	context.moveTo(x1,y1); context.lineTo(x2,y2); context.stroke(); 
}
