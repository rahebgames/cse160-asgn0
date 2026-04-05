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

  const drawButton = document.getElementById("draw");
  drawButton.addEventListener("click", handleDrawEvent);

  const operationButton = document.getElementById("draw-operation");
  operationButton.addEventListener("click", handleDrawOperationEvent);

  let v1 = new Vector3([1,2,3]);
  console.log(v1.magnitude());
}

function handleDrawEvent() {
  clearCanvas();

  const v1Div = document.getElementById("v1");
  const v1 = getInputVector(v1Div);
  const v2Div = document.getElementById("v2");
  const v2 = getInputVector(v2Div);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  return [v1, v2];
}

function handleDrawOperationEvent() {
  const [v1, v2] = handleDrawEvent();
  let v1temp = new Vector3(v1.elements);
  let v2temp = new Vector3(v2.elements);

  const selectElement = document.getElementById("operation");
  const operation = selectElement.value;

  const scalarElement = document.getElementById("scalar");
  const scalar = scalarElement.value;

  let v3, v4;
  switch(operation) {
    case "add":
      v3 = v1temp.add(v2temp);
      break;

    case "sub":
      v3 = v1temp.sub(v2temp);
      break;

    case "mul":
      v3 = v1temp.mul(scalar);
      v4 = v2temp.mul(scalar);
      break;

    case "div":
      v3 = v1temp.div(scalar);
      v4 = v2temp.div(scalar);
      break;
  }

  if (v3) drawVector(v3, "green");
  if (v4) drawVector(v4, "green");
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
