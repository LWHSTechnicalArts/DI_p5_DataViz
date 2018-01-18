// Given the CSV file "data.csv"
// in the project's "assets" folder:

var table;
var row;
var time;
var sensor;

var x;
var y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(100, 50, 200);
    ellipseMode(CENTER);
    //location variables
    y = height / 2;
    x = 10;

    //iterate thorough all rows of CSV file
    for (var r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        time = map(time, 0, 50, 0, 255); //remap the time variable
        sensor = map(sensor, 40, 30000, 10, (width / table.getRowCount()) * 2); //remap the sensor variable
        //look of ellipses
        fill(0, time, time, 150); //time changes the fill color
        strokeWeight(1);
        stroke(time);

        ellipse(x + (sensor / 2), y, sensor, sensor); //draw ellipse exactly where previous ellipse ends

        textAlign(CENTER);
        fill(255);
        text(parseInt(sensor), x + sensor / 2, y); //printing sensor value as int to avoid decimal places
        x += sensor; // add to the current value of x
    }
}

function draw() {
    //nothing here
}
