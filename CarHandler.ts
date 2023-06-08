namespace CarHandler {

    let leftSensor = DigitalPin.P0;
    let rightSensor = DigitalPin.P13;
    let frontRightSensor = DigitalPin.P12;
    let frontLeftSensor = DigitalPin.P7; // works only when display is disabled

    export function SetupSensors(){
        pins.setPull(leftSensor, PinPullMode.PullNone);
        pins.setPull(frontLeftSensor, PinPullMode.PullNone);
        pins.setPull(frontRightSensor, PinPullMode.PullNone);
        pins.setPull(rightSensor, PinPullMode.PullNone);

        led.enable(false); // this makes P7 show correct value, display does not works tho :(
    }

    export function GetLeftSensorState() { return pins.digitalReadPin(leftSensor) === 0; }
    export function GetRightSensorState() { return pins.digitalReadPin(leftSensor) === 0; }
    export function GetLeftFrontSensorState() { return pins.digitalReadPin(leftSensor) === 0; }
    export function GetRightFrontSensorState() { return pins.digitalReadPin(leftSensor) === 0; }

    // ---- MOVEMENT ----
    export function Gobackward(speed: number) { GoForward(-speed); }
    export function GoForward(speed: number) { Move(speed, speed); }

    /** does not work with ks4031 for some reason */
    export function WeirdMove(speed: number) {
        RightFrontWheel(speed);
        RightBackWheel(-speed);

        LeftFrontWheel(speed);
        LeftBackWheel(-speed);
    }

    export function StopCar() { Move(0, 0); }

    function Move(rSpeed: number, lSpeed: number) {
        RightFrontWheel(rSpeed);
        RightBackWheel(rSpeed);

        LeftFrontWheel(lSpeed);
        LeftBackWheel(lSpeed);
    }

    export function Test(){
        for(let i = 0; i < wheels.length; i++) TestWheel(i);
    }

    function TestWheel(wheel : number){
        for (let i = 0; i < 8; i++) {
            let sp = i % 2 === 0 ? 100 : - 100;
            SetWheel(wheel, sp);
            basic.pause(500);
        }

        SetWheel(wheel, 0);
    }

    // ROTATION
    const defAngleTime = 750; // how long does it take to rotate 180° at "rotateSpeed" in ms
    const rotateSpeed = 80; // -100 -> 100

    export function RotateRight(angle: number) { Rotate(-angle); }

    export function RotateLeft(angle: number) { Rotate(angle); }

    /** positive angle = left, negative angle = right */
    export function Rotate(angle: number) {
        StopCar();

        basic.pause(100);

        let sp = angle < 0 ? -rotateSpeed : rotateSpeed;
        Move(sp, -sp);

        basic.pause((defAngleTime / 180) * Math.abs(angle));

        StopCar();
    }

    /** lover force = longer turn */
    export function RightTurn(speed: number, turnForce: number) { Move(speed / turnForce, speed); }

    /** lover force = longer turn */
    export function LeftTurn(speed: number, turnForce: number) { Move(speed, speed / turnForce); }


    /// ---- --- WHEELS --- ---- \\\
    let wheels = [LR.Upper_right, LR.Upper_left, LR.Lower_right, LR.Lower_left];
    let minSpeed = [1, 1, 1, 1]; // if requested speed is lower than this => 0 will be sent instead

    let maxSpeedF = [100, 100, 100, 100]; // in %
    let maxSpeedB = [100, 100, 100, 100]; // in %

    function RightFrontWheel(speed: number) { SetWheel(0, speed); }
    function LeftFrontWheel(speed: number) { SetWheel(1, speed); }
    
    function RightBackWheel(speed: number) { SetWheel(2, speed); }
    function LeftBackWheel(speed: number) { SetWheel(3, speed); }

    function SetWheel(id : number, speed : number){
        let sp = Math.abs(speed);
        let direction = speed < 0 ? MD.Back : MD.Forward;
        let mSp = speed < 0 ? maxSpeedB[id] : maxSpeedF[id];

        let fSpeed = Math.map(sp, 0, 100, 0, mSp);

        if (fSpeed < minSpeed[id]) sp = 0;

        console.log(`speed ${id} = ${fSpeed}`);

        mecanumRobot.Motor(wheels[id], direction, sp);
    }
}