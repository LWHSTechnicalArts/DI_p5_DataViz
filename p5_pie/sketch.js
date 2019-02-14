var angles = [];

var table;
var row;
var time;
var sensor;

function preload() {
  //table is comma separated value "csv"
  //and has no header specifying the columns labels
  table = loadTable('assets/data.csv', 'csv', 'noHeader');
}

function setup() {
  createCanvas(720, 400);
  noStroke();
  noLoop();  // Run once and stop

  for (var r = 0; r < table.getRowCount(); r++) {
    row = table.getRow(r);
    //print it column by column
    //note: a row is an object, not an array
    time = row.getNum(0);
    sensor = row.getNum(1);
    sensor = map(sensor, 0, 23000, 1, 44);

    print(time); //optional but helpful
    print(sensor);
    angles.push(sensor);
  }
}

function draw() {
  background(100);
  pieChart(300, angles);
}

function pieChart(diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    var gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
    lastAngle += radians(angles[i]);
  }
}