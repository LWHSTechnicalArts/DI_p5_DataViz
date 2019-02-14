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
    frameRate(2);       //control timing
    background(50);
}

function draw() {

    background(50,100);
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
    noStroke();
    fill(sensor, 255 - sensor, 255); //fill color determined by time

    ellipse(width / 2, height / 2, sensor * 2, sensor * 2); //size determined by CSV data

    noStroke();
    textSize(10);
    textAlign(LEFT);
    text("Seconds " + parseInt(time), 10, (time*2)); 
    text("Intensity " + parseInt(sensor), width-70, (time*2));
    stroke(255);
    strokeWeight(0.5);
    line(65, (time * 2), width - 70, (time * 2));

    r++;

}
