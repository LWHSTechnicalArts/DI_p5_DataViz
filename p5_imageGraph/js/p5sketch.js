// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;
let room;
let previousSensorData = 0; //must start at 0
let img;

let x;
let y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/light.csv', 'csv', 'noHeader');
    img = loadImage('assets/lightbulb.png');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(220, 230, 230);

    drawingContext.setLineDash([5, 5]);
    beginShape(); //line graph starts here
    //iterate thorough all rows of CSV file
    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);
        room = row.getString(2);

        mapped_time = map(time, 7, 80, 0, width); //remap the time variable
        mapped_sensor = map(sensor, 200, 1000, height, 0); //remap the sensor variable

        print(parseInt(mapped_time) + " " + parseInt(mapped_sensor) + " " + room); //optional but helpful
        noFill();

        if ((mapped_sensor > previousSensorData + 30) || (mapped_sensor < previousSensorData - 30)) { //keeps data from being redundant
            x = mapped_time;
            y = mapped_sensor;

            vertex(x, y);
            fill(0);
            ellipse(x,y,3,3);    //make a small dot
        }
        previousSensorData = mapped_sensor; //saves current data to compare with next data
    }
    endShape(); //line graph ends here

//draw images and text
for (let r = 0; r < table.getRowCount(); r++) {
    row = table.getRow(r);
    //print it column by column
    //note: a row is an object, not an array
    time = row.getNum(0);
    sensor = row.getNum(1);
    room = row.getString(2);

    mapped_time = map(time, 7, 80, 0, width); //remap the time variable
    mapped_sensor = map(sensor, 200, 1000, height, 0); //remap the sensor variable

    print(parseInt(mapped_time) + " " + parseInt(mapped_sensor) + " " + room); //optional but helpful
    noFill();

    if ((mapped_sensor > previousSensorData + 30) || (mapped_sensor < previousSensorData - 30)) { //keeps data from being redundant
        x = mapped_time;
        y = mapped_sensor;

        imageMode(CENTER);
        image(img, x, y, (height / y) * (img.width / 30), (height / y) * (img.height / 30));
        
        //look of text
        fill(180,10,150);
        textAlign(RIGHT);
        textSize(12);
        text(room, x-30, y+5);

        fill(100, 10, 100);
        textSize(9);
        text(sensor, x - 40, y + 20);

        drawingContext.setLineDash([30, 5]);
        line(0, height - 15, width, height - 15);
        fill(0);
        textSize(10);
        text("| " + parseInt(mapped_time) + " |", x, height - 5);
        
    }
     previousSensorData = mapped_sensor; //saves current data to compare with next data
}

    //Visualization Title
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text("Room-by-Room Light Intensity", 200, height - 50);

    textSize(11);
    text("Seconds in the Journey:", 60, height - 20);
}

function draw() {
    //nothing here
}
