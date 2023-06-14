namespace BasicMazeSolver{

    const minWallDist = 12;
    const servoCheckCountdown = 1000; // in ms
    const maxSpeed = 50;

    let turning = false;

    let speed = maxSpeed;

    let checkC = 0;

    let goForward = false;

    // TO DO: use fl & fr sensors
    export function Update() {

        let l = CarHandler.GetLeftSensorState();
        let fl = CarHandler.GetLeftFrontSensorState();
        let r = CarHandler.GetRightSensorState();
        let fr = CarHandler.GetRightFrontSensorState();

        let fDist = mecanumRobot.ultra();
        let f = true; // go forward

        if (l) turning = false;

        if (fDist < minWallDist) {
            console.log("rotate");

            if (l || fl) CarHandler.RotateRight(90);
            else if (r && l) CarHandler.RotateLeft(180);
            else CarHandler.RotateLeft(90);

            f = false;
        }
        else {
            if (fl || l) speed = maxSpeed;

            if (fl) {
                console.log("right turn");
                CarHandler.RightTurn(speed, 4);
                f = false;
            }
            else if (!fl && !l && !turning && checkC <= 0) {
                speed = maxSpeed / 2;
                if (goForward) CarHandler.GoForward(speed);
                ReturnToLeftWall();
                f = false;
            }
            else if (!l) {
                console.log("left turn");
                CarHandler.LeftTurn(speed, 2);
                f = false;
            }
        }

        if (f) {
            console.log("Forward")
            CarHandler.GoForward(speed);
        }

        goForward = f;

        console.log(`time: ${checkC} ${Time.deltaTime}`);
        checkC -= Time.deltaTime;
    }

    /** if wall is close enought: slight left correction, othervise 90° turn */
    function ReturnToLeftWall() {

        if (GetLeftWallDistance() > minWallDist * 2) {
            CarHandler.RotateLeft(90);
            turning = true;
        }
        else {
            speed = maxSpeed;
            CarHandler.LeftTurn(speed, 8);
        }

        checkC = servoCheckCountdown;
    }

    const turnTime = 350;

    const frontLeftAngle = 130;
    const leftAngle = 170;

    function GetLeftWallDistance(): number {
        Measure_TryStopCar();

        mecanumRobot.setServo(170);
        basic.pause(turnTime);

        let v = mecanumRobot.ultra();

        mecanumRobot.setServo(90);
        basic.pause(turnTime);

        return v;
    }

    function Measure_TryStopCar() { if (mecanumRobot.ultra() < minWallDist * 2) CarHandler.StopCar(); }
}