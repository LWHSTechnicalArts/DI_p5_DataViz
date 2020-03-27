// CSV file "data.csv" is in the project's "assets" folder:

let table;
let row;
let time;
let sensor;
let spacing = 150;

let x;
let y;
let i =40;
var frameNumber = 0;

let dataTitle = "data!"

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(170, 0, 26);
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

        scaled_time = map(time, 0, 50, 30, 255); //remap the time variable
        scaled_sensor = map(sensor, 40, 30000, 25, 150); //remap the sensor variable
        //look of ellipses
        fill(255, 100, scaled_time, 220); //time changes the fill color
        strokeWeight(2);
        stroke(scaled_time);

        rect(x, y, scaled_sensor, scaled_sensor, 20);

        textAlign(CENTER);
        fill(255);
        noStroke();
        text(parseInt(sensor), x, y); //printing sensor value as int to avoid decimal places

        x += spacing;                //creates a new row if the x value becomes to close to the right of the canvas
        if (x > width - spacing) {
            x = spacing;
            y += spacing;
        }
    }
}

function draw() {
//text animation
    while (i < width) {
        // get ith element of data array
        let d = dataTitle[i];
        // place text at a random place
        fill(random(255),random(255));
        textSize(15)
        text(dataTitle, i, height-30);
        i = i + 100;
    }

    frameNumber++;
    if (frameNumber > 5) {
        frameNumber = 0;
        i=40;
        fill(170, 0, 26);
        rectMode(CORNER)
        rect(0,height-80,width,height);
    }
}
