// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;
let room;
let previousSensorData;

let x;
let y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/light.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1000, 600);
    background(200, 200, 210);

    beginShape(); //line graph starts here
    
    //iterate thorough all rows of CSV file
    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);
        room = row.getString(2);     //allows you to get word from a spreadsheet

        mapped_time = map(time, 7, 80, 0, width); //remap the time variable
        mapped_sensor = map(sensor, 200, 1000, height, 0); //remap the sensor variable

        print(parseInt(mapped_time) + " " + parseInt(mapped_sensor) + " " + room); //optional but helpful
        
        noFill();

        if ((mapped_sensor > previousSensorData + 20) || (mapped_sensor < previousSensorData - 20)) { //keeps data from being too redundant
            x = mapped_time;
            y = mapped_sensor;

            strokeWeight(1);
            vertex(x, y);  // bend point in main line

            //look of ellipses
            push()
            fill(255, 10, 80, 100); //ellipse fill color
            strokeWeight(0);
            ellipse(x, y, 60, 60); //ellipse for visual effect
            fill(0); //ellipse fill color
            ellipse(x, y, 10, 10); //ellipse for visual effect
            pop()

            //look of text
            fill(100); 
            textAlign(CENTER);
            textSize(20);
            text(room, x-50, y);

            line(0, height-15, width, height-15);
            fill(0); 
            textSize(8);
            text("| "+parseInt(mapped_time)+" |", x, height-5);
        }
        previousSensorData = mapped_sensor; //saves current data to compare with next data
    }

    endShape(); //line graph ends here
    
    //Visualization Title
    textSize(20);
    fill(0);
    text("Room-by-Room Light Intensity", 200, height - 50); 
   
    textSize(10);
    text("Seconds in the Journey:", 60, height - 5);
}

function draw() {
    //nothing here
}
