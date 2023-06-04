let executePath = false;
let currentPosition = 0; // array id for path executing

let crosses : MazePart[];
let dirChanges = 0;

let returning = false;
let pathToChange : MazePart;

let rotatingLeft = false;
let rotatingRight = false;

function Update(){
    
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