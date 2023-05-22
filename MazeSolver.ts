


// - Maintain contact with left wall
// - Wall in front: Rotate right (if right side is clear, otherwise left) (until clear ?)
// - If left wall is null: Correct by sligth left turn

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

input.onButtonPressed(Button.A, function () {
    solve = !solve;
})

// TO DO: use fl & fr sensors
basic.forever(function() {
    if(!solve){
        CarHandler.StopAll();
        return;
    }

    let l = pins.digitalReadPin(leftSensor) === 0;
    let fl = pins.digitalReadPin(frontLeftSensor) === 0;
    let fr = pins.digitalReadPin(frontRightSensor) === 0;
    let r = pins.digitalReadPin(rightSensor) === 0;

    let fDist = mecanumRobot.ultra();

    console.log(`${l}, ${fl}, ${fr}, ${r}, ${fDist}`);

    let speed = 30;

    let f = true;

    if (fDist < minWallDist){
        console.log("rotate");

        CarHandler.StopAll();

        if (!l) CarHandler.RotateLeft(90);
        else CarHandler.RotateRight(90);

        f = false;
    }
    else{
        if (!l) {
            console.log("left turn");
            CarHandler.LeftTurn(speed, 1.5);

            f = false;
        }
    }

    if (f){
        console.log("Forward")
        CarHandler.GoForward(speed);
    }
})

