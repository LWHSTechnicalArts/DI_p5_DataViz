// Given the CSV file "data.csv"
// in the project's "assets" folder:

var table;
var row;
var r = 0;
var time;
var sensor;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(600, 600);
    ellipseMode(CENTER);
    frameRate(1);       //control timing
    background(50);
}

function draw() {

    background(50,50);
    if (r >= table.getRowCount()) { //if there is no more data return to top row
        r = 0;
        background(50);     //clear animation
    }
    row=table.getRow(r);
    time = row.getNum(0);
    sensor = row.getNum(1);

    print(time); //optional but helpful
    print(sensor);

    time = map(time, 0, 50, 30, 255); //remap the time variable
    sensor = map(sensor, 40, 30000, 25, 200); //remap the sensor variable
    //look of ellipses
    stroke(255 - time, time, 255);
    strokeWeight(10);
    fill(sensor, 255 - sensor, 255); //fill color determined by time

    ellipse(width / 2, height / 2, sensor * 2, sensor * 2); //size determined by CSV data

    noStroke();
    textSize(30);
    textAlign(LEFT);
    text("Time " + parseInt(time), 10, (time*2)+20); 
    text("Value " + parseInt(sensor), width-150, (time*2)+20); 

    r++;

}
