namespace CoolMazeSolver{

    // --- SENSORS SETTINGS ---
    // left and right: distance way longer ( < 2x ) than distance to the wall
    // front left and front right: bit shorter that distance to the wall (neither of them has contact if car is correctly rotated in the middle)
    // min wall dist has to have higher range that fl & fr (in forward direction)

    // --- SETTINGS ---
    const speed = 30;
    const turnPause = 700; // pause between start of rotation and execution, in micros
    const gapRegisterTime = 900; // pause between state change on any (L or R) sensor and next move calculation, in micros

    const minWallDist = 10; // works only for ultrasonic, any shorter distance to front wall that will trigger return
    const correctionStrenght = 2; // strenght of correction turns when wall (on FL or FR) is detected

    // --- RUNTIME SETTINGS ---
    export let executePath = false;

    // --- RUNTIME DATA ---
    export let currentPosition = 0; // array id for path executing

    let crosses: MazePart[] = [];
    let dirChanges = 0;

    let returning = false;
    let pathToChange: MazePart;

    let timeToRegister = 0;

    let rotatingL = false;
    let rotatingR = false;

    let recentL = true;
    let recentR = true;

    let l = false; // left sensor
    let r = false; // right sensor

    export function Update() {

        // UPDATE VALUES 
        let fDist = mecanumRobot.ultra();
        let fl = CarHandler.GetLeftFrontSensorState();
        let fr = CarHandler.GetRightFrontSensorState();
        l = CarHandler.GetLeftSensorState();
        r = CarHandler.GetRightSensorState();

        let f = fDist < minWallDist;

        let leftSide = l || fl;
        let rightSide = r || fr;

        if (l) rotatingL = false;
        if (r) rotatingR = false;

        let canChangeDir = !leftSide || !rightSide;
        let canRotate = !rotatingL && !rotatingR;
        let bSides = l && r;

        timeToRegister -= Time.deltaTime;
        let rl = l != recentL;
        let rr = r != recentR;
        if (rl || rr) {
            timeToRegister = gapRegisterTime;
            recentL = l;
            recentR = r;
        }

        if (executeCor) ExecuteCoroutine();

        let goForw = true;

        // FIX DIRECTION
        if (!f) {
            if (!fl || !fr) // if both of them are triggered --> ignore
            {
                if (fl) CarHandler.RightTurn(speed, correctionStrenght);
                else if (fr) CarHandler.LeftTurn(speed, correctionStrenght);

                if (fl || fr) goForw = false;
            }
        }

        // CALCULATE NEXT STEP
        if (f && bSides) {
            if (rotatingR) RotateRight();
            else if (rotatingL) RotateLeft();
            else {
                CarHandler.RotateRight(180);
                StartReturn(false);
            }
        }
        else if (canChangeDir && canRotate) {
            if (timeToRegister <= 0 || f) {
                if (returning && pathToChange.turn == dirChanges) {
                    CalculateReturn(leftSide, rightSide, fDist);
                }
                else {
                    let isCross = Utils.GetPossibleDirections(leftSide, rightSide, fDist, minWallDist * 1.5).length > 1;

                    if (isCross) music.playTone(500, 500);

                    if (!isCross || !returning) {
                        let dir: Direction;

                        if (executePath && isCross) {
                            dir = crosses[currentPosition].direction;
                            currentPosition++;
                        }
                        else {
                            if (!leftSide) dir = Direction.left;
                            else dir = Direction.right;
                        }

                        ExecuteDir(dir);

                        if (isCross && !executePath) {
                            crosses.push(new MazePart(dir, dirChanges + 1, [dir])); // +1 because it needs to calculate with the one that is going to be added later
                        }

                        OnDirChanged();
                    }
                }
            }
        }

        if (goForw) CarHandler.GoForward(speed);

        CarHandler.EnableRGBLED(LedCount.Left, returning);
    }

    //** Calculates next move on cross that is car returning to */
    function CalculateReturn(leftSide: boolean, rightSide: boolean, fDist: number) {
        let stopReturn = true;
        let possibleDirs = GetFixedPossibleDirections(leftSide, rightSide, fDist);

        let possibleDirsCount = possibleDirs.length; // before "none" could be removed

        if (possibleDirs.length > 1) possibleDirs.removeElement(Direction.none);

        if (possibleDirsCount == 1) // back
        {
            stopReturn = false;
        }
        else {
            let usedDirs = pathToChange.usedPaths;
            usedDirs.push(possibleDirs[0]);
            crosses.push(new MazePart(possibleDirs[0], dirChanges, usedDirs));
        }

        let tDir = stopReturn ? possibleDirs[0] : Direction.none;
        let execDir = Utils.GetFixedDirection_Invert(tDir, pathToChange.direction);

        if (stopReturn) returning = false;
        else StartReturn(true);

        ExecuteDir(execDir);
    }

    function OnDirChanged() { dirChanges += returning ? -1 : 1; }

    /** Returns possible directions (normal = relative to entry point) */
    function GetFixedPossibleDirections(leftSide: boolean, rightSide: boolean, fDist: number): Direction[] {
        let p1 = Utils.GetPossibleDirections(leftSide, rightSide, fDist, minWallDist * 1.5);
        let fixedDirs = Utils.GetFixedDirections(p1, pathToChange.direction);
        let possibleDirs = Utils.RemoveDirectionsFromList(fixedDirs, pathToChange.usedPaths);

        return possibleDirs;
    }

    function StartReturn(adjustDirChanges: boolean) {
        if (adjustDirChanges) { dirChanges--; }

        returning = true;
        pathToChange = crosses.pop();
    }


    // ------- MOVEMENT
    /** Execute direction (not immidiatelly, but based on "turnPause") */
    function ExecuteDir(dir: Direction) {
        switch (dir) {
            case Direction.left: RotateLeft(); break;
            case Direction.right: RotateRight(); break;
            case Direction.forward: ExecuteForwardDirection(); break;
        }
    }

    /** Disables rotation on current cross */
    function ExecuteForwardDirection() {
        if (!l) rotatingL = true;
        else if (!r) rotatingR = true;
    }

    function RotateLeft(immidiatelly = false) {
        Rotate(immidiatelly, false);
        rotatingL = true;
    }

    function RotateRight(immidiatelly = false) {
        Rotate(immidiatelly, true);
        rotatingR = true;
    }

    let executeCor: boolean = false;
    let timeToExecute: number = 0;
    let value: number = 0;

    function Rotate(im: boolean, right: boolean) {
        executeCor = true;
        value = right ? -90 : 90;

        timeToExecute = turnPause;
        if (im) ExecuteCoroutine();
    }

    function ExecuteCoroutine() {
        timeToExecute -= Time.deltaTime;

        if (timeToExecute <= 0) {
            CarHandler.Rotate(value);
            executeCor = false;
        }
    }
}

class MazePart {
    usedPaths: Direction[];

    direction: Direction;
    turn: number;

    constructor(dir: Direction, t: number, used: Direction[]) {
        this.direction = dir;
        this.turn = t;
        this.usedPaths = used;
    }
}

enum Direction {
    none = -1, // back 
    forward,
    right,
    left
}
