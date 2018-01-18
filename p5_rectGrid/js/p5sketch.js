// Given the CSV file "data.csv"
// in the project's "assets" folder:

var table;
var row;
var time;
var sensor;
var spacing = 150;

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
    background(255, 0, 26);
    rectMode(CENTER);
    //location variables

    x = spacing;
    y = spacing;

    //iterate thorough all rows of CSV file
    for (var r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        time = map(time, 0, 50, 30, 255); //remap the time variable
        sensor = map(sensor, 40, 30000, 25, 200); //remap the sensor variable
        //look of ellipses
        fill(255, 100, time, 220); //time changes the fill color
        strokeWeight(1);
        stroke(time);

        rect(x, y, sensor, sensor);


        textAlign(CENTER);
        fill(255);
        text(parseInt(sensor), x, y); //printing sensor value as int to avoid decimal places

        x += spacing;
        if (x > width - spacing) {
            x = spacing;
            y += spacing;
        }
    }
}

function draw() {
    //nothing here
}
