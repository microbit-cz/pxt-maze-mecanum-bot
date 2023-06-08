// --- SENSORS SETTINGS ---
// left and right: distance way longer than distance to the wall
// front left and front right: bit shorter that distance to the wall (neither of them has contact if car is correctly rotated in the middle)
// min wall dist has to have higher range that fl & fr (in forward direction)

let executePath = false;
let currentPosition = 0; // array id for path executing

let crosses : MazePart[];
let dirChanges = 0;

let returning = false;
let pathToChange : MazePart;

let rotatingL = false;
let rotatingR = false;

let speed = 50;
let turnPause = 0;

let gapRegisterTime = .2;
let timeToRegister = 0;

let recentL = true;
let recentR = true;

let l = false;
let r = false;

let minWallDist = 10; // ?

function Update(){

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
    let bSides = !l && !r;

    timeToRegister -= Time.deltaTime;
    let rl = l != recentL;
    let rr = r != recentR;
    if(rl || rr){
        timeToRegister = gapRegisterTime;
        recentL = l;
        recentR = r;
    }

    // FIX DIRECTION
    if (!f) {
        if (!fl || !fr) // if both of them are triggered --> ignore
        {
            if (fl) CarHandler.LeftTurn(speed, 2);
            else if (fr) CarHandler.RightTurn(speed, 2);
        }
    }

    // CALCULATE NEXT STEP
    if(f && bSides){
        if (rotatingR) CarHandler.RotateRight(90);
        else if (rotatingL) CarHandler.RotateLeft(90);
        else{
            CarHandler.RotateRight(180);
            StartReturn(false);
        }
    }
    else if(canChangeDir && canRotate){
        if(timeToRegister < 0 || f){

            let ch = false;

            if(returning && pathToChange.turn == dirChanges){
                CalculateReturn(leftSide, rightSide, fDist);
                ch = true;
            }
            else{
                let isCross = GetPossibleDirections(leftSide, rightSide, fDist).length > 1;
            
                if(!isCross || !returning){
                    let dir : Direction;

                    if(executePath && isCross){
                        dir = crosses[currentPosition].direction;
                        currentPosition++;
                    }
                    else {
                        if (!leftSide) dir = Direction.left;
                        else dir = Direction.right;
                    }

                    ExecuteDir(dir);

                    if (isCross && !executePath) {
                        let dirs : Direction[] = [dir];
                        crosses.push(new MazePart(dir, dirChanges + 1, dirs)); // +1 because it needs to calculate with the one that is going to be added later
                    }

                    ch = true;
                }
            }

            if(ch) OnDirChanged();
        }
    }

    CarHandler.GoForward(speed);
}

function CalculateReturn(leftSide : boolean, rightSide: boolean, fDist: number){

}

function OnDirChanged() { dirChanges += returning ? -1 : 1; }

function ExecuteForwardDirection(){
    if (!l) rotatingL = true;
    else if (!r) rotatingR = true;
}

function StartReturn(adjustDirChanges : boolean)
{
    if (adjustDirChanges) { dirChanges--; }

    returning = true;
    pathToChange = crosses.pop();
}

function ExecuteDir(dir: Direction){
    switch (dir) {
        case Direction.left: CarHandler.RotateLeft(90); break;
        case Direction.right: CarHandler.RotateRight(90); break;
        case Direction.forward: ExecuteForwardDirection(); break;
    }
}

function GetPossibleDirections(ls : boolean, rs: boolean, fDist: number)
{
    let list: Direction[];

    if (!ls) list.push(Direction.left);
    if (!rs) list.push(Direction.right);
    if (fDist > minWallDist * 1.5) list.push(Direction.forward);

    return list;
}

// -------
class MazePart{

    usedPaths : Direction[];

    direction : Direction;
    turn : number;

    constructor(dir: Direction, t: number, used : Direction[]){
        this.direction = dir;
        this.turn = t;
        this.usedPaths = used;
    }
}

enum Direction{
    none = -1, // back 
    forward,
    right,
    left
}