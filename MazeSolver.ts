


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

input.onButtonPressed(Button.A, function () {

    if (debug){
        CarHandler.Test();
        return;
    }

    solve = !solve;
})

const servoCheckCountdown = 1000; // in ms
const speed = 30;

// TO DO: use fl & fr sensors
basic.forever(function() {

    if (debug) return;
    if (!solve) { CarHandler.StopCar(); return; }

    let l = pins.digitalReadPin(leftSensor) === 0;
    let fl = pins.digitalReadPin(frontLeftSensor) === 0;
    let fr = pins.digitalReadPin(frontRightSensor) === 0;
    let r = pins.digitalReadPin(rightSensor) === 0;

    let fDist = mecanumRobot.ultra();

    let f = true;

    let checkC = 0;

    if (fDist < minWallDist){
        console.log("rotate");
        
        if (l || fl) CarHandler.RotateRight(45);
        else CarHandler.RotateLeft(45);

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

        if (!fl && !l){
            let dist = GetLeftWallDistance();

            if (dist > minWallDist && checkC <= 0){
                CarHandler.RotateLeft(45);
                checkC = servoCheckCountdown;
            }

            console.log(`Get distance: ${dist}`);
        }
    }

    if (f){
        console.log("Forward")
        CarHandler.GoForward(speed);
    }

    checkC - deltaTime;
})

let deltaTime = 0;
let lastTime = 0;

function UpdateDeltatime() {
    let cTime = input.runningTime();
    deltaTime = cTime - lastTime;
    lastTime = cTime
}

const turnTime = 250;

function GetLeftWallDistance() : number{
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