


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

const minWallDist = 10;

let solve = false;

mecanumRobot.setServo(90);

input.onButtonPressed(Button.A, function () {
    //CarHandler.Test();
    solve = !solve;

    //console.log(GetLeftWallDistance());
})

// TO DO: use fl & fr sensors
basic.forever(function() {
    //return;

    if(!solve){
        CarHandler.StopAll();
        return;
    }

    let l = pins.digitalReadPin(leftSensor) === 0;
    let fl = pins.digitalReadPin(frontLeftSensor) === 0;
    let fr = pins.digitalReadPin(frontRightSensor) === 0;
    let r = pins.digitalReadPin(rightSensor) === 0;

    let fDist = mecanumRobot.ultra();

    //console.log(`${l}, ${fl}, ${fr}, ${r}, ${fDist}`);

    let speed = 30;

    let f = true;

    if (fDist < minWallDist){
        console.log("rotate");

        CarHandler.StopAll();

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

        if(fl){
            console.log("left turn");
            CarHandler.RightTurn(speed, 2);

            f = false;
        }

        if(!fl && !l){
            if(GetLeftWallDistance() > 12){
                CarHandler.RotateLeft(45);
            }

            console.log(`Get distance: ${GetLeftWallDistance()}`);
        }
    }

    if (f){
        console.log("Forward")
        CarHandler.GoForward(speed);
    }
})

const turnTime = 250;

function GetLeftWallDistance() : number{
    mecanumRobot.setServo(170);

    basic.pause(turnTime);
    let fDist = mecanumRobot.ultra();

    mecanumRobot.setServo(90);

    basic.pause(turnTime);

    return fDist;
}