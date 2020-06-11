// Given the CSV file is in the project's "assets" folder:

let table;
let row;
let r = 0;
let time;
let sensorx;
let sensory;
let sensorz;
let dataForward = 0;
let color;

let autoPlay = false;

function preload() {
  //table is comma separated value "csv"
  //and has no header specifying the columns labels
  table = loadTable("assets/googlesheets2.csv", "csv", "noHeader");
}

function setup() {
  //setup look
  createCanvas(600, 600);
  ////////ellipseMode(CENTER);
  frameRate(5); //control timing
  let color = dataForward + 10;
  background(color);
}

function draw() {
  background(50, 100);
  if (r >= table.getRowCount()) {
    //if there is no more data return to top row
    r = 0;
    background(50); //clear animation
  }
  row = table.getRow(dataForward);
  time = row.getString(0); //Felix: changed to get String so it's treating this data as text
  sensorx = row.getNum(1);
  sensory = row.getNum(2);
  sensorz = row.getNum(3);

  print(time); //optional but helpful
  print(sensorx);
  print(dataForward);

  //let scaled_time = map(time, 0.0, 50, 30.0, 255); //remap the time variable      //Felix: no need to scale time
  let scaled_sensorx = map(sensorx, 0, 7.25, -50, 50); //remap the sensor variable  //Felix: remapped your values which are very small, to make them bigger
  let scaled_sensory = map(sensorx, -1.5, 1.5, -50, 50); //remap the sensor variable  //Felix: remapped your values which are very small, to make them bigger
  let scaledline = map(sensorx + sensory, -50, 50, 0.1, 5);

  /////////ellipse(width / 2, height / 2, scaled_sensor * 2, scaled_sensor * 2); //size determined by CSV data

  noStroke();
  textSize(15);
  textAlign(CENTER);
  textStyle(NORMAL);
  fill(50); // these 3 lines draw invisible squares (same color as background) over the text so they change instantly instead of fading.
  rect(25, 25, 120, 40); //the actual rectangles
  rect(465, 25, 120, 40); //the actual rectangles
  fill(200);
  text("time " + time, 80, 50);
  text("intensity " + parseFloat(sensorx), width - 80, 50); //Felix: changed to parseFloat since a decimal is required, also removed time as the y value and set to 100
  text("press left or right arrows to navigate data", width / 2, 550);
  textSize(10);
  text("37° 45' 38.0556'' N", 300, 74);
  text("122° 25' 51.8448'' W", 300, 86);
  textSize(10);
  text("FELIX FEIN 2020", width / 2, 576);
  textSize(30);
  textStyle(ITALIC);
  text("BREEZE", 300, 55);

  ellipse(520, 550, 30, 30); //play button
  ellipse(560, 550, 30, 30); //stop button
  fill(0);
  textSize(7);
  text("PLAY", 519, 552);
  text("STOP", 559, 552);

  stroke(255);
  let linestroke = scaledline;
  strokeWeight(linestroke);
  line(
    300 - scaled_sensorx,
    300 - scaled_sensory,
    300 + scaled_sensorx,
    300 + scaled_sensory
  ); //Felix: removed time as the y value and set to 100
  
  r++;

  if (autoPlay == true) {       //this tests to see if "autoplay" is on or off             
    dataForward++;
    if (dataForward >= table.getRowCount() - 1) {    //data will loop so it doesn't stop at the end of the rows
      dataForward = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && dataForward > 0) {
    dataForward--;
  } else if (keyCode === RIGHT_ARROW && dataForward < table.getRowCount() - 1) {
    dataForward++;
  }
}

function mousePressed() {             //this function tests to see if you click within a certain radius of a circle
  // Check if mouse is inside the circle
  let p = dist(mouseX, mouseY, 520, 550);
  if (p < 20) {
    fill(100);
    ellipse(520, 550, 30, 30); //play button
    autoPlay = true;
  }

    let s = dist(mouseX, mouseY, 560, 550);
    if (s < 20) {
      fill(100);
      ellipse(560, 550, 30, 30); //stop button
      autoPlay = false;
    }
}