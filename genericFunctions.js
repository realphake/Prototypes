var canvas = document.createElement("canvas");
canvas.setAttribute('style', 'border: 1px solid');
var context = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

var keysDown = {};
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

var m_w = new Date().getTime(); 
var m_z = 987654321; 
var mask = 0xffffffff;

function seed(i) {
    m_w = i;
}

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

function fillBox (x,y,w,h,color) {
	context.fillStyle = color; context.fillRect(x,y,w,h); 
	context.fillStyle = "black"; 
}

function drawCircle(x,y,r,color) {
	context.beginPath(); context.strokeStyle = color;
	context.arc(x,y,r,0,2*Math.PI);
	context.stroke(); context.strokeStyle = "black";
}

function fillCircle(x,y,r,color) {
	context.beginPath(); context.fillStyle = color;
	context.arc(x,y,r,0,2*Math.PI);
	context.fill(); context.fillStyle = "black";
}

function writeText(text,x,y, color) {
	context.fillStyle = color; context.fillText(text,x,y);
	context.fillStyle = "black"; 
}

function drawLine(x1,y1,x2,y2, color) {
	context.beginPath(); context.strokeStyle = color;
	context.moveTo(x1,y1); context.lineTo(x2,y2); 
	context.stroke(); context.strokeStyle = "black";
}

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, 
		line2StartX, line2StartY, line2EndX, line2EndY) {
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) -
			((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    return result;
};

function angleOfLine(line1StartX, line1StartY, line1EndX, line1EndY) {
	var angle = Math.atan2(line1StartY - line1EndY, line1StartX - line1EndX);
	return angle;
}

function lineFrom(startX,startY,length,angle) {
	var output = {};
	output.x2 = Math.cos(angle) * length; output.y2 = Math.sin(angle) * length;
	output.x2 += startX; output.y2 += startY;
	output.x1 = startX; output.y1 = startY;
	return output;
}

function lengthOfLine(x1, y1, x2, y2) {
	var a2 = Math.pow((x1-x2),2);
	var b2 = Math.pow((y1-y2),2);
	return Math.sqrt(a2+b2);
}
