// Given the CSV file "data.csv"
// in the project's "assets" folder:

var table;
var row;
var time;
var sensor;

var radius = 250;
var angle = 0;

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
    background(30, 140, 250);
    translate(width/2, height/2);
    ellipseMode(CENTER);
    //location variables

    x = 0;
    y = 0;
    angle = TWO_PI/(table.getRowCount());   //set rotation angle, TW0_PI is a full circle

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
        sensor = map(sensor, 40, 30000, 10, (width / table.getRowCount()) * 2); //remap the sensor variable
        //look of ellipses
        fill(0, time, time, 220); //time changes the fill color
        strokeWeight(1);
        stroke(time);

        line(0,0,x - radius, y)
        ellipse(x - radius, y, sensor, sensor);


        textAlign(CENTER);
        fill(255);
        text(parseInt(sensor), x - radius/1.4, y); //printing sensor value as int to avoid decimal places

        rotate(angle);    //rotate before drawing next ellipse
    }
}

function draw() {
    //nothing here
}
