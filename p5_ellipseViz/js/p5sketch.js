// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;

let x;
let y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
  //setup look of the background
  createCanvas(1000, 600); //canvas size in pixels
  background(100, 70, 200); //background color in RGB
  ellipseMode(CENTER); //draw ellipses from the center

  x = 10;  // set a starting x value that is 10 pixels from the left
  y = height / 2; //set a starting y value in the center of the canvas

  for (let r = 0; r < table.getRowCount(); r++) {    //iterate thorough all rows of CSV file using a for loop, note: a row is an object, not an array
    row = table.getRow(r);
    time = row.getNum(0);     //grab the time value from column 0
    sensor = row.getNum(1);   //grab the sensor value from column 1

    print(time); //optional but helpful
    print(sensor);

    let mapped_time = map(time, 0, 50, 0, 255); //remap the time variable so the ellipses are bigger. first two numbers are original range, 2nd two are mapped range
    let mapped_sensor = map(sensor, 40, 30000, 10, (width / table.getRowCount()) * 2); //remap the sensor variable
    
    //look of ellipses
    fill(200, 100, 150); //time changes the fill color
    strokeWeight(3);    // stroke size for ellipses
    stroke(0);   //outline color for the ellipses

    ellipse(x + mapped_sensor / 2, y, mapped_sensor, mapped_sensor); //draw ellipse exactly where previous ellipse ends with a width and height the size of the data

    textAlign(CENTER);   //draw text from center
    fill(255);  //this will be the color of the text can be RGBA or Grayscale
    text(parseInt(sensor), x + mapped_sensor / 2, y); //printing sensor value as int to avoid decimal places
    x += mapped_sensor; // add to the current value of x so the next ellipse is further to the right
  }
}

function draw() {
    //nothing here
}
