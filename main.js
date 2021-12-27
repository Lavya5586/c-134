img = "";
status = "";
objects = [];

function preload() {
    alarm = loadSound("emergency-alert.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotPoses);
}

function gotPoses(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Baby Detected!1";
            alarm.stop();

            fill("#55ff44");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#55ff44");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if (objects.length < 0)
        {
            document.getElementById("status").innerHTML = "Baby is not detected!!";
            alarm.play();
        }
    }

    else{
        document.getElementById("status").innerHTML = "Baby is not detected!!";
        alarm.play();
    }
}