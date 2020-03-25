// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;
let spacing = 50;

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
    background(255);
    rectMode(CORNERS);
    //location variables

    x = 50;
    y = height - 50;

    //draw graph lines
    stroke(100);
    for (let i = 0; i < height; i += 50) {
        line(20, i, 1000, i);
        text(550 - parseInt(i), 20, i);
    }

    //iterate thorough all rows of CSV file
    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        scaled_time = map(time, 0, 50, 30, 255); //remap the time variable
        scaled_sensor = map(sensor, 40, 30000, 25, 450); //remap the sensor variable
        //look of ellipses
        fill(255, 100, scaled_time, 220); //time changes the fill color
        strokeWeight(2);
        stroke(0);

        rect(x, y, x + spacing, y - scaled_sensor);


        textAlign(CENTER);
        fill(255);
        //text(parseInt(sensor), x + (spacing / 2), y + 10); //printing sensor value as int to avoid decimal places
        x += spacing;
    }
    noStroke();
}

function draw() {
    //nothing here
}
