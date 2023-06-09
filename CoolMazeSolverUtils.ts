namespace Utils{
    /** returns every currently possible direction */
    export function GetPossibleDirections(ls: boolean, rs: boolean, fDist: number, maxFDist : number): Direction[] {
        let list: Direction[];

        if (!ls) list.push(Direction.left);
        if (!rs) list.push(Direction.right);
        if (fDist > maxFDist) list.push(Direction.forward);

        return list;
    }

    /** for returning only, converts local direction to normal direction */
    function GetFixedDirection(dir: Direction, basedOn: Direction): Direction {
        if (basedOn == Direction.left) {
            switch (dir) {
                case Direction.left: return Direction.forward; // back
                case Direction.forward: return Direction.right;
                case Direction.right: return Direction.none;
            }
        }
        else if (basedOn == Direction.forward) {
            switch (dir) {
                case Direction.left: return Direction.right;
                case Direction.right: return Direction.left;
                case Direction.forward: return Direction.none; // back
            }
        }
        else if (basedOn == Direction.right) {
            switch (dir) {
                case Direction.left: return Direction.none; // back
                case Direction.forward: return Direction.left;
                case Direction.right: return Direction.forward;
            }
        }

        return Direction.none;
    }

    /** for returning only, converts normal direction to local direction */
    export function GetFixedDirection_Invert(dir: Direction, basedOn: Direction) : Direction {
        if (basedOn == Direction.left) {
            switch (dir) {
                case Direction.forward: return Direction.left; // back
                case Direction.right: return Direction.forward;
                case Direction.none: return Direction.right;
            }
        }
        else if (basedOn == Direction.forward) {
            switch (dir) {
                case Direction.right: return Direction.left;
                case Direction.left: return Direction.right;
                case Direction.none: return Direction.forward; // back
            }
        }
        else if (basedOn == Direction.right) {
            switch (dir) {
                case Direction.left: return Direction.forward;
                case Direction.forward: return Direction.right;
                case Direction.none: return Direction.left;
            }
        }

        return Direction.none;
    }

    /** same as "GetFixedDirection()", but for arrays */
    export function GetFixedDirections(directions: Direction[], basedOn: Direction) : Direction[]{
        let dirs : Direction[] = [];

        for (let i = 0; i < directions.length; i++) { dirs.push(GetFixedDirection(directions[i], basedOn)); }

        return dirs;
    }

    /** removes directions to remove from "directions" and returns it, only one of each direction is expected in "directions" */
    export function RemoveDirectionsFromList(directions : Direction[], remove : Direction[]) : Direction[]{
        for (let i = 0; i < remove.length; i++) { directions.removeElement(remove[i]); }
        return directions;
    }
}