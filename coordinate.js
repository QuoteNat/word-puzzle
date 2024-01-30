class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    // returns a deep copy of the coordinate
    copy() {
        return new Coordinate(this.x, this.y);
    }
}

export { Coordinate };