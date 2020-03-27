// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let r = 0;
let time;
let sensor;
let dataForward=0;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(600, 600);
    ellipseMode(CENTER);
    frameRate(10);       //control timing
    background(50);
}

function draw() {

    background(50,100);
    if (r >= table.getRowCount()) { //if there is no more data return to top row
        r = 0;
        background(50);     //clear animation
    }
    row=table.getRow(dataForward);
    time = row.getNum(0);
    sensor = row.getNum(1);

    print(time); //optional but helpful
    print(sensor);

    let scaled_time = map(time, 0, 50, 30, 255); //remap the time variable
    let scaled_sensor = map(sensor, 40, 30000, 25, 127); //remap the sensor variable
    noStroke();
    fill(125 + scaled_sensor); //fill color determined by time

    ellipse(width / 2, height / 2, scaled_sensor * 2, scaled_sensor * 2); //size determined by CSV data

    noStroke();
    textSize(15);
    textAlign(CENTER);
    text("seconds " + parseInt(time), 50, (scaled_time*2)); 
    text("intensity " + parseInt(sensor), width-60, (scaled_time*2));
    text("press left or right arrows to navigate data", width / 2, 20); 
    stroke(255);
    strokeWeight(0.5);
    line(0, (scaled_time * 2), width, (scaled_time * 2));
    r++;

}

function keyPressed() {
 
    if (keyCode === LEFT_ARROW && dataForward > 0) {
        dataForward--;
    } else if (keyCode === RIGHT_ARROW && dataForward < table.getRowCount()-1) {
        dataForward++;
    }
}
