namespace CarHandler {
    export function GoForward(speed: number) { Move(speed, speed); }
    export function Gobackward(speed: number) { Move(-speed, -speed); }

    export function WeirdMove(speed: number) {
        RightFrontWheel(speed);
        RightBackWheel(-speed);

        LeftFrontWheel(speed);
        LeftBackWheel(-speed);
    }

    let wheels = [LR.Upper_right, LR.Upper_left, LR.Lower_right, LR.Lower_left ]

    export function StopAll() {
        for (let i = 0; i < wheels.length; i++) { SetWheel(wheels[i], 0);}
    }

    function Move(rSpeed: number, lSpeed: number) {
        MoveRightSide(rSpeed);
        MoveLeftSide(lSpeed);
    }

    function MoveLeftSide(speed: number) {
        LeftFrontWheel(speed);
        LeftBackWheel(speed);
    }

    function MoveRightSide(speed: number) {
        RightFrontWheel(speed);
        RightBackWheel(speed);
    }

    // ROTATION
    const defAngleTime = 1350; // how long does it take to rotate 180° at "rotateSpeed" in ms
    const rotateSpeed = 50; // -100 -> 100

    export function RotateRight(angle: number) { Rotate(angle, true); }

    export function RotateLeft(angle: number) { Rotate(angle, false); }

    // the "angle" is pretty pointless since it basically works only for 90° xD
    function Rotate(angle: number, right: boolean) {
        StopAll();

        basic.pause(100);

        let sp = right ? rotateSpeed : -rotateSpeed;
        Move(sp, -sp);

        basic.pause((defAngleTime / 180) * angle);

        StopAll();
    }

    export function RightTurn(speed: number) { Move(-speed / 2, speed); }
    export function LeftTurn(speed: number) { Move(-speed, speed / 2); }


    /// ---- --- WHEELS --- ---- \\\
    function RightFrontWheel(speed: number) {
        SetWheel(LR.Upper_right, speed);
    }

    function LeftFrontWheel(speed: number) {
        SetWheel(LR.Upper_left, speed);
    }

    function RightBackWheel(speed: number) {
        SetWheel(LR.Lower_right, speed);
    }

    function LeftBackWheel(speed: number) {
        SetWheel(LR.Lower_left, speed);
    }

    function SetWheel(wheel : LR, speed : number){
        let sp = speed < 0 ? -speed : speed;
        let forw = speed < 0 ? MD.Back : MD.Forward;

        console.log(`${sp}, ${forw}`)

        mecanumRobot.Motor(wheel, forw, sp);
    }
}