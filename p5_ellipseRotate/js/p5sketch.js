// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;

let radius = 250;   //this is the radius of the ring of ellipses
let angle = 0;

let x;
let y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(30, 140, 250);
    translate(width/2, height/2);    //this will make your zero,zero point be the center of the canvas, not the upper left corner
    ellipseMode(CENTER);
    
    //location variables
    x = 0;
    y = 0;
    angle = TWO_PI/(table.getRowCount());   //set rotation angle, TW0_PI is a full circle

    //iterate thorough all rows of CSV file
    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        mapped_time = map(time, 0, 50, 30, 255); //remap the time variable
        mapped_sensor = map(sensor, 40, 30000, 10, (width / table.getRowCount()) * 2); //remap the sensor variable
        //look of ellipses
        fill(0, mapped_time, mapped_time, 220); //time changes the fill color
        strokeWeight(1);
        stroke(mapped_time);    //change the stroke color as the time increases.

        //line(0,0,x - radius, y)
        ellipse(x - radius, y, mapped_sensor, mapped_sensor);


        textAlign(CENTER);
        fill(255);
        text(parseInt(sensor), x - radius/1.2, y); //printing sensor value as int to avoid decimal places
        rotate(angle);    //rotate before drawing next ellipse
    }
}

function draw() {
    //nothing here
}
