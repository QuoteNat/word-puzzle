import { Coordinate } from "./coordinate.js";

class Word {
    constructor(startCoord, endCoord) {
        this.startCoord = startCoord.copy();
        this.endCoord = endCoord.copy();
    }
}

export class WordList {
    // Create wordlist with dimensionX and dimensionY respectively
    constructor(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        let json = fetch('./words.json')
            .then((response) => response.json())
            .then((json) => json);
        this.words = json;
        console.log(this.words);
    }
}
