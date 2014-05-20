var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var keysDown = {};
var m_w = new Date().getTime(); 
var m_z = 987654321; 
var mask = 0xffffffff;
var mouse = {
	isDown: false,
	wentDownAt: {x: 320, y: 240},
	isNowAt: {x: 320, y: 240}
};

canvas.setAttribute('style', 'border: 1px solid');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
addEventListener("keydown", keyWentDown, false);
addEventListener("keyup", keyWentUp, false);
canvas.addEventListener("mousedown", handleMouseDown, false);
canvas.addEventListener("mouseup", handleMouseUp, false);
canvas.addEventListener("mousemove", handleMouseMove, false);

function handleMouseDown (e) {
	mouse.isDown = true;
	mouse.wentDownAt.x = e.pageX - canvas.offsetLeft;
	mouse.wentDownAt.y = e.pageY - canvas.offsetTop;
};

function handleMouseUp (e) {
	mouse.isDown = false;
};

function handleMouseMove (e) {
	mouse.isNowAt.x = e.pageX - canvas.offsetLeft;
	mouse.isNowAt.y = e.pageY - canvas.offsetTop;
};

function keyWentDown (e) { 
	keysDown[e.keyCode] = true; 
}

function keyWentUp (e) { 
	delete keysDown[e.keyCode];
}

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
	return start + randomDouble() * ( end - start ); 
}

function clear () {
	canvas.width = canvas.width; 
}

function fillBox (x,y,w,h,color) {
	context.fillStyle = color;
	context.fillRect(x,y,w,h); 
	context.fillStyle = "black"; 
}

function drawCircle(x,y,r,color) {
	context.beginPath();
	context.strokeStyle = color;
	context.arc(x,y,r,0,2*Math.PI);
	context.stroke();
	context.strokeStyle = "black";
}

function fillCircle(x,y,r,color) {
	context.beginPath();
	context.fillStyle = color;
	context.arc(x,y,r,0,2*Math.PI);
	context.fill();
	context.fillStyle = "black";
}

function writeText(text,x,y, color) {
	context.fillStyle = color;
	context.fillText(text,x,y);
	context.fillStyle = "black"; 
}

function drawLine(x1,y1,x2,y2, color) {
	context.beginPath();
	context.strokeStyle = color;
	context.moveTo(x1,y1);
	context.lineTo(x2,y2); 
	context.stroke();
	context.strokeStyle = "black";
}

function checkLineIntersection(line1, line2) {
	var result = { x: null, y: null, onLine1: false, onLine2: false };
	var denominator = ((line2.y2 - line2.y1) * (line1.x2 - line1.x1)) - ((line2.x2 - line2.x1) * (line1.y2 - line1.y1));
    if (denominator == 0) return result;
	found = findAandB(line1, line2, denominator);
    result.x = line1.x1 + (found.a * (line1.x2 - line1.x1));
    result.y = line1.y1 + (found.a * (line1.y2 - line1.y1));
    if (found.a >= 0 && found.a <= 1) result.onLine1 = true;
    if (found.b >= 0 && found.b <= 1) result.onLine2 = true;
    return result;
}

function findAandB (line1, line2, denominator) {
    var numerator1 = ((line2.x2 - line2.x1) * (line1.y1 - line2.y1)) - ((line2.y2 - line2.y1) * (line1.x1 - line2.x1));
    var numerator2 = ((line1.x2 - line1.x1) * (line1.y1 - line2.y1)) - ((line1.y2 - line1.y1) * (line1.x1 - line2.x1));
    var foundA = numerator1 / denominator;
    var foundB = numerator2 / denominator;
	return {a: foundA, b: foundB};
}

function angleOfLine(line1StartX, line1StartY, line1EndX, line1EndY) {
	var angle = Math.atan2(line1StartY - line1EndY, line1StartX - line1EndX);
	return angle;
}

function lineFrom(startX,startY,length,angle) {
	var output = {};
	output.x2 = Math.cos(angle) * length + startX;
	output.y2 = Math.sin(angle) * length + startY;
	output.x1 = startX;
	output.y1 = startY;
	return output;
}

function lengthOfLine(x1, y1, x2, y2) {
	var a2 = Math.pow((x1-x2),2);
	var b2 = Math.pow((y1-y2),2);
	return Math.sqrt(a2+b2);
}
