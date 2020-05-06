//Based on example by: Copyright(c) 2019 by Engin Arslan(https: //codepen.io/enginarslan/pen/aJJmZP)
//Modified to work with spreadsheet by AKleindolph 2019

let data = [];
let scaled_data = [];
let maxData;
let table;

let sensor;
let scaled_sensor;


function preload() {
  //table is comma separated value "csv"
  //and has no header specifying the columns labels
  table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  rectMode(BOTTOM);

for (let r = 0; r < table.getRowCount(); r++) {
  row = table.getRow(r);
  time = row.getNum(0);
  sensor = row.getNum(1);
  
  print(time); //optional but helpful
  print(sensor); 

  time = map(time, 0, 50, 30, 255); //remap the time variable
  scaled_sensor = map(sensor, 40, 30000, 25, 450); //remap the sensor variable
  data.push(sensor);
  scaled_data.push(scaled_sensor);
  }
  maxData = max(data);
}

function draw() {
  background(43, 53, 63);
  fill(139, 171, 203);
  stroke(89, 86, 74);

  let angleSeparation = 360 / data.length;
  let padding = 10;

  if (frameCount <= 400) {
    maxValue = constrain(frameCount * 2, 0, 400);
  } else {
    maxValue = 400;
  }
  let offset = 200;
  let dataMultiplier = (height/2-offset-padding) / maxData;

  for (let i = 0; i < data.length; i = i + 1) {
    push();
    let currentData = data[i];
    let currentScaledData = scaled_data[i];
    let finalHeight = currentData * dataMultiplier;
    let animatedHeight = map(maxValue, 0, 400, 0, finalHeight);
    translate(width / 2, height / 2);
    rotate(angleSeparation * i);
    if (currentData > 15000){
      fill (0,200,255);
    }
    else{
      fill(139, 171, 203);
    }
    rect(0, offset, angleSeparation*2, animatedHeight);
    text(Math.floor(currentData), 0, offset);
    pop();
  }
}
