// Given the CSV file "data.csv"
// in the project's "assets" folder:

var table;
var row;
var time;
var sensor;
var room;
var pSensorData;
var img;

var x;
var y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/light.csv', 'csv', 'noHeader');
    img = loadImage('assets/lightbulb.png');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(200, 200, 210);

    beginShape(); //line graph starts here
    //iterate thorough all rows of CSV file
    for (var r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);
        room = row.getString(2);

        time = map(time, 7, 80, 0, width); //remap the time variable
        sensor = map(sensor, 200, 1000, height, 0); //remap the sensor variable

        print(parseInt(time) + " " + parseInt(sensor) + " " + room); //optional but helpful
        noFill();

        if ((sensor > pSensorData + 40) || (sensor < pSensorData - 40)) { //keeps data from being redundant
            x = time;
            y = sensor;

            //look of ellipses
            fill(255, 100, time, 220); //time changes the fill color
            strokeWeight(2);

            vertex(x, y);
            imageMode(CENTER);

            fill(0, 10, 80); //ellipse fill color
            image(img, x, y, (height/y)*(img.width/30), (height/y)*(img.height/30));
            fill(255); //text color
            textAlign(CENTER);
            textSize(20);
            text(room, x, y+40);
        }
        pSensorData = sensor; //saves current data to compare with next data
    }
    endShape(); //line graph ends here
    textSize(30);
    text("Room Luminosity", 200, height - 50); //Visualization Title
}

function draw() {
    //nothing here
}
