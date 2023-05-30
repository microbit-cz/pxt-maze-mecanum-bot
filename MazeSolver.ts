


// - Maintain contact with left wall
// - Wall in front: Rotate right (if right side is clear, otherwise left) (until clear ?)
// - If left wall is null: Correct by sligth left turn

// if fl ---> right correction

let leftSensor = DigitalPin.P0;
let rightSensor = DigitalPin.P13;
let frontRightSensor = DigitalPin.P12;
let frontLeftSensor = DigitalPin.P7; // works only when display is disabled

led.enable(false); // this makes P7 show correct value, display does not works tho :(

pins.setPull(leftSensor, PinPullMode.PullNone);
pins.setPull(frontLeftSensor, PinPullMode.PullNone);
pins.setPull(frontRightSensor, PinPullMode.PullNone);
pins.setPull(rightSensor, PinPullMode.PullNone);

const minWallDist = 12;

let solve = false;
let debug = false;

mecanumRobot.setServo(90);

input.onButtonPressed(Button.B, function () {
    CarHandler.Test();
})

input.onButtonPressed(Button.A, function () {

    if (debug){
        CarHandler.Test();
        return;
    }

    solve = !solve;
})

const servoCheckCountdown = 1000; // in ms
const speed = 50;

let checkC = 0;

// TO DO: use fl & fr sensors
basic.forever(function() {

    console.log(mecanumRobot.ultra());

    UpdateDeltatime();

    if (debug) return;
    if (!solve) { CarHandler.StopCar(); return; }

    console.log(solve);

    let l = pins.digitalReadPin(leftSensor) === 0;
    let fl = pins.digitalReadPin(frontLeftSensor) === 0;
    let fr = pins.digitalReadPin(frontRightSensor) === 0;
    let r = pins.digitalReadPin(rightSensor) === 0;

    let fDist = mecanumRobot.ultra();

    let f = true;

    if (fDist < minWallDist){
        console.log("rotate");
        
        if (l || fl) CarHandler.RotateRight(90);
        else CarHandler.RotateLeft(90);

        f = false;
    }
    else{
        if (!l) {
            console.log("left turn");
            CarHandler.LeftTurn(speed, 2);

            f = false;
        }

        if (fl){
            console.log("left turn");
            CarHandler.RightTurn(speed, 4);

            f = false;
        }

        if (!fl && !l && checkC <= 0) ReturnToLeftWall();
    }

    if (f){
        console.log("Forward")
        CarHandler.GoForward(speed);
    }

    console.log(`time: ${checkC} ${deltaTime}`);
    checkC -= deltaTime;
})

function ReturnToLeftWall(){
    let dist = GetDistances();

    if (dist[0] > minWallDist * 2 && dist[1] > minWallDist){
        CarHandler.RotateLeft(90);
    }

    checkC = servoCheckCountdown;

    console.log(`Get distance: ${dist}`);
}

let deltaTime = 0;
let lastTime = 0;

function UpdateDeltatime() {
    let cTime = input.runningTime();
    deltaTime = cTime - lastTime;
    lastTime = cTime
}

const turnTime = 350;

const frontLeftAngle = 130;
const leftAngle = 170;

function GetLeftWallDistance() : number{
    let u = mecanumRobot.ultra();

    basic.pause(100);

    if (u < minWallDist * 2) CarHandler.StopCar();

    mecanumRobot.setServo(170);

    basic.pause(turnTime);
    let fDist = mecanumRobot.ultra();

    mecanumRobot.setServo(90);

    basic.pause(turnTime);

    return fDist;
}

function GetLeftFrontDistance(): number {
    mecanumRobot.setServo(130);

    basic.pause(turnTime);
    let fDist = mecanumRobot.ultra();

    mecanumRobot.setServo(90);

    basic.pause(turnTime);

    return fDist;
}

function GetDistances(): number[]{
    if (mecanumRobot.ultra() < minWallDist * 2) CarHandler.StopCar();
    basic.pause(100);

    let arr : number[] = [];

    mecanumRobot.setServo(frontLeftAngle);
    basic.pause(turnTime);
    music.playTone(500, 10);
    arr.push(mecanumRobot.ultra());

    mecanumRobot.setServo(leftAngle);
    basic.pause(turnTime);
    music.playTone(500, 10);
    arr.push(mecanumRobot.ultra());

    mecanumRobot.setServo(90);
    basic.pause(turnTime);

    return arr;
}