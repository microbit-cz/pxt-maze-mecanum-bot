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

let rotatingLeft = false;
let rotatingRight = false;

let speed = 50;

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

    if (l) rotatingLeft = false;
    if (r) rotatingRight = false;

    let canChangeDir = !leftSide || !rightSide;
    let canRotate = !rotatingLeft && ! rotatingRight;
    let bSides = !l && !r;

    // FIX DIRECTION
    // keep car in the middle of the aisle using fr & fl



    // CALCULATE NEXT STEP
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