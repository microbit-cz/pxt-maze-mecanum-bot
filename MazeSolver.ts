// --- SENSORS SETTINGS ---
// left: 1.5x size of the car
// right: 1.2x size of the car

namespace BasicMazeSolver{

    const minWallDist = 12;
    const maxSpeed = 50;

    let turning = false;

    let speed = maxSpeed;

    let goForward = false;

    // TO DO: use fl & fr sensors
    export function Update() {

        let l = CarHandler.GetLeftSensorState();
        let fl = CarHandler.GetLeftFrontSensorState();
        let r = CarHandler.GetRightSensorState();
        //let fr = CarHandler.GetRightFrontSensorState();

        let fDist = mecanumRobot.ultra();
        let f = true; // go forward

        if (l)
        { 
            turning = false;
            speed = maxSpeed;
        }

        if (fDist < minWallDist) {
            
            if (l) CarHandler.RotateRight(90);
            else if (r && l) CarHandler.RotateLeft(180);
            else CarHandler.RotateLeft(90);

            f = false;
        }
        else {
            //if (fl || l) speed = maxSpeed;

            f = false;

            if (fl) CarHandler.RightTurn(speed, 4);
            else if (!fl && !l && !turning) {
                speed = maxSpeed / 2;
                if (goForward) CarHandler.GoForward(speed);
                ReturnToLeftWall();
            }
            else if (!l) CarHandler.LeftTurn(speed, 2);
            
            else f = true;
        }

        if (f) CarHandler.GoForward(speed);

        goForward = f;
    }

    /** if wall is close enought: slight left correction, othervise 90° turn */
    function ReturnToLeftWall() {

        if (GetLeftWallDistance() > minWallDist * 2) {
            CarHandler.RotateLeft(90);
            turning = true;
        }
        else {
            speed = maxSpeed;
            CarHandler.RotateLeft(30);
        }
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