// Based on DrawTriangle.js (c) 2012 matsuda

let canvas;
let ctx;

function main() {  
  canvas = document.getElementById("draw-area");  
  if (!canvas) { 
    console.log("Failed to retrieve the <canvas> element");
    return false; 
  } 

  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const button = document.getElementById("draw");
  button.addEventListener("click", handleDrawEvent);
}

function handleDrawEvent() {
  clearCanvas();

  const v1Div = document.getElementById("v1");
  const v1 = getInputVector(v1Div);
  const v2Div = document.getElementById("v2");
  const v2 = getInputVector(v2Div);

  drawVector(v1, "red");
  drawVector(v2, "blue");
}

function drawVector(v, color) {
  const canvasCenter = {x: canvas.width / 2.0, y: canvas.height / 2.0};

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvasCenter.x, canvasCenter.y);
  ctx.lineTo(canvasCenter.x + v.elements[0] * 20, canvasCenter.y + -v.elements[1] * 20);
  ctx.stroke();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getInputVector(div) {
  const xElement = div.querySelector("#x");
  const yElement = div.querySelector("#y");

  const x = xElement.value ? xElement.value : 0;
  const y = yElement.value ? yElement.value : 0;
  
  return new Vector3([x, y, 0]);
}
