song1 = "";
song2 = "";
leftWristY = 0;
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1status = "";
song2status = "";

function preload() {
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}

function setup() {
    canvas = createCanvas(500, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 450);
    stroke('#FF0000');
    fill('#FF0000');

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1status = song1.isPlaying();
        song2.stop();

        if(song1status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Song Name - Song 1";
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2status = song2.isPlaying();
        song1.stop();

        if(song2status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song Name - Song 2";
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist Y = " + leftWristY + " " + "Right Wrist Y = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x - 60;
        rightWristX = results[0].pose.rightWrist.x - 60;
        console.log("Left Wrist X = " + leftWristX + " " + "Right Wrist X = " + rightWristX);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}