namespace CarHandler {
    export function GoForward(speed: number) { Move(speed, speed); }
    export function Gobackward(speed: number) { Move(-speed, -speed); }

    export function WeirdMove(speed: number) {
        RightFrontWheel(speed);
        RightBackWheel(-speed);

        LeftFrontWheel(speed);
        LeftBackWheel(-speed);
    }

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

    export function Test(){
        TestWheel(wheels[1]);
        TestWheel(wheels[0]);
    }

    function TestWheel(wheel : LR){
        console.log(wheel);

        for (let i = 0; i < 8; i++) {
            let sp = i % 2 == 0 ? 50 : - 50;
            SetWheel(wheel, sp);
            basic.pause(500);
        }

        SetWheel(wheel, 0);
    }

    // ROTATION
    const defAngleTime = 1150; // how long does it take to rotate 180° at "rotateSpeed" in ms
    const rotateSpeed = 50; // -100 -> 100

    export function RotateRight(angle: number) { Rotate(angle, true); }

    export function RotateLeft(angle: number) { Rotate(angle, false); }

    // the "angle" is pretty pointless since it basically works only for 90° xD
    function Rotate(angle: number, right: boolean) {
        StopAll();

        basic.pause(100);

        let sp = right ? -rotateSpeed : rotateSpeed;
        Move(sp, -sp);

        basic.pause((defAngleTime / 180) * angle);

        StopAll();
    }

    /**
      * Higher force = lower force xDDD
    */
    export function RightTurn(speed: number, turnForce: number) { Move(speed / turnForce, speed); }

    /**
      * Higher force = lower force xDDD
    */
    export function LeftTurn(speed: number, turnForce: number) { Move(speed, speed / turnForce); }


    /// ---- --- WHEELS --- ---- \\\
    let wheels = [LR.Upper_right, LR.Upper_left, LR.Lower_right, LR.Lower_left]

    function RightFrontWheel(speed: number){
        //if (speed < 0) speed = 0; // this wheel can't spin back for some reason (if it does it won't go forward without help :( )

        SetWheel(wheels[0], speed);
    }
    function LeftFrontWheel(speed: number) { SetWheel(wheels[1], speed); }
    
    function RightBackWheel(speed: number) { SetWheel(wheels[2], speed); }
    function LeftBackWheel(speed: number) { SetWheel(wheels[3], speed); }

    function SetWheel(wheel : LR, speed : number){
        let sp = speed < 0 ? -speed : speed;
        let forw = speed < 0 ? MD.Back : MD.Forward;

        console.log(`${wheel}: ${sp}, ${forw}`)

        mecanumRobot.Motor(wheel, forw, sp);
    }
}