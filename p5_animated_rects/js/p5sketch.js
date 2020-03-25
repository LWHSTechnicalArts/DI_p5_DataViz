// Given the CSV file "data.csv"
// in the project's "assets" folder:

let table;
let row;
let time;
let sensor;
let spacing = 50;
let centerJustify = 150

var data = [];
var maxData;

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
    background(230, 230, 230);
    rectMode(CENTER);
    //location variables

    x = 0;
    y = 0;

    //iterate thorough all rows of CSV file
    for (let r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        data.push(sensor); 
    }
    maxData = max(data);
}

function draw() {
    background(43, 53, 63);
    fill(255, 255, 255, 200);
    stroke(0);
    strokeWeight(2);

    let padding = 150;

    if (frameCount <= 500) {  
        maxValue = constrain(frameCount * 8, 0, 500);     //controls size of animation
    } else {
        maxValue = 500;   //this must match final parameter in maxCount
    }

    let dataMultiplier = (height / 2 - padding) / maxData;

    for (let i = 1; i < data.length; i = i + 1) {
        push();
        let currentData = data[i];
        let finalHeight = currentData * dataMultiplier;
        let animatedHeight = map(maxValue, 0, 500, 0, finalHeight);
        translate((i*spacing)+centerJustify, height/2);
        rect(0, 0, animatedHeight, animatedHeight,40);
        text(parseInt(currentData), i-30, 100);
        pop();
    }
}
