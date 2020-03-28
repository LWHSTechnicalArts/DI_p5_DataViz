// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let r = 0;
let time;
let sensor;

let x = 0;
let y = 0;
let z = 0;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1000, 800, WEBGL);
    noStroke();
    fill(204, 120);
    background(0);
    frameRate(30);
}

function draw() {

    orbitControl();    //allows mouse drags

    background(250);
    rotateY(frameCount * 0.01);

    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        time = map(time, 0, 50, 0, 255); //remap the time variable
        sensor = map(sensor, 40, 30000, 10, (width / table.getRowCount()) * 2); //remap the sensor variable

        x = time;
        y = 0;
        z = 0;

        var sd = 60; // Define a standard deviation

        x = (x * 3) 
        y = (y * 2)  


        push();
        translate(x, y, z);
        rotateX(-0.5);
        rotateY(1);
        normalMaterial();
        sphere(sensor);
        pop();
    }

}
