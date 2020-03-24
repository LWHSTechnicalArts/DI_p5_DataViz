function setup() {
    createCanvas(700, 600); //sets canvas size width and height
    background(220, 127, 150); //sets background color Red(0-255),Green(0-255),B(0-255)
}

function draw() {
    fill(140, 0, 140); //set the fill for the next shape drawn R,G,B,A + oprional 4th transparency parameter called alpha
    stroke(0); //set the stroke color for the next shape drawn, one parameter means grayscale but can be RGBA
    strokeWeight(5); // set the width of the next stroke drawn

    ellipse(100, 100, 100, 100);  //draw an ellipse using x and y parameters from the upper left corner of the canvas. then set width and height

    triangle(300, 200, 260, 300, 340, 300); //draw an triangle from 3 different x and y coordinates

    rectMode(CENTER);   //draw a shape from its center point instead of from its upper left corner
    rect(500, 100, 100, 100);   //draw a rectangle from an x and y point with a width and height

    line(100,500,500,500);   //draw a line from one x and y point to a 2nd x and y location
}

function mouseClicked() {
  background(random(255), 127, 150); //changes background color on mouse click
}
