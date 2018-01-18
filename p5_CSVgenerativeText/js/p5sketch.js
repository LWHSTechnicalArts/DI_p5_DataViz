var articles = ["a", "the", "some", "more than one", "exactly one", "a quantity of"];
var locations = ["inside", "close to", "with", "beside", "near", "far from", "at", "above", "around"];
var nouns = ["dog", "cat", "hamster", "toad", "woman", "man", "rat", "elephant", "police", "teacher", "American"];
var nouns2 = ["goat", "fish", "shark", "bird", "child", "baby", "snake", "yak", "llama", "clam", "slug"];
var verb = ["eat", "nibble", "play", "lounge", "complain", "love", "snuggle", "sing", "dance", "howl", "cry", "faint", "bleed"];
var action = ["can", "did", "will", "might", "may", "can't", "didn't", "will never", "could"];
var frequency = ["on Friday", "sometimes", "never", "way too often", "on occasion", "if the timing is right", "on Wednesday", "in October", "at 5:30pm"];
var punctuation = ["?", "!", "!!!", "."];

var table;
var row;
var time;
var sensor;

var ptime;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('assets/light.csv', 'csv', 'noHeader');
}

function setup() {
    //setup look
    createCanvas(1200, 600);
    background(30);
    textSize(25);

    fill(255);
    textAlign(LEFT, CENTER);
    text("data driven storytime", width / 2, 30);

    for (var r = 0; r < table.getRowCount(); r++) {
        row = table.getRow(r);
        //print it column by column
        //note: a row is an object, not an array
        time = row.getNum(0);
        sensor = row.getNum(1);

        print(time); //optional but helpful
        print(sensor);

        if ((time > ptime + 5) || (time < ptime - 5)) {
            fill(150, time * 4, 255);
            text(articles[parseInt(map(sensor, 200, 1000, 0, articles.length))] + " " +
                nouns[parseInt(map(sensor, 200, 1000, 0, nouns.length))] + " " +
                action[parseInt(map(sensor, 200, 1000, 0, action.length))] + " " +
                verb[parseInt(map(sensor, 200, 1000, 0, verb.length))] + " " +
                locations[parseInt(map(sensor, 200, 1000, 0, locations.length))] + " " +
                articles[parseInt(map(sensor, 200, 1000, 0, articles.length))] + " " +
                nouns2[parseInt(map(sensor, 200, 1000, 0, nouns2.length))] + " " +
                frequency[parseInt(map(sensor, 200, 1000, 0, frequency.length))] + " " +
                punctuation[parseInt(map(sensor, 200, 1000, 0, punctuation.length))], 10, time * 5);
        }
        ptime = time;
    }
}

function draw() {
    //nothing here
}
