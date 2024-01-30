import { Coordinate } from "./coordinate.js";
import { WordList } from "./word_checking.js";

const GAME_DIV = document.querySelector('.game');
const INIT_LETTERS = ['A', 'B', 'D', 'E',
    'E', 'F', 'I', 'K',
    'L', 'N', 'O', 'P',
    'R', 'T', 'W', ''];

const DIMENSION_X = 4;
const DIMENSION_Y = 4;

let words = new WordList(DIMENSION_X, DIMENSION_Y);
let gameState = [];

let blankPos = new Coordinate(0, 0);

// -y is up, x directions are standard
const DIRECTION = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

// Creates game state using the letters in `letters`
function startGame(letters) {
    let count = 0;
    for (let i=0; i < DIMENSION_Y; i++) {
        gameState.push([]);
        for (let j=0; j < DIMENSION_X; j++) {
            gameState[i].push(letters[count]);
            if (letters[count] === '') {
                blankPos.x = i;
                blankPos.y = j;
            }
            count++;
        }
    }

    drawState();
}

// swaps the values on the game state.
function swapLetters(newBlankPos) {
    let swapLetter = gameState[newBlankPos.y][newBlankPos.x];
    console.log(swapLetter);
    gameState[newBlankPos.y][newBlankPos.x] = '';
    gameState[blankPos.y][blankPos.x] = swapLetter;
    blankPos = newBlankPos.copy();
}

// update the web page to display the new state
function drawState() {
    // remove children of gameDiv
    while (GAME_DIV.firstChild) {
        GAME_DIV.removeChild(GAME_DIV.lastChild);
    }

    for (let y=0; y < DIMENSION_Y; y++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let x=0; x < DIMENSION_X; x++) {
            let letter = gameState[y][x];
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (letter === '') {
                tile.classList.add('blank');
            }
            tile.textContent = letter;
            row.appendChild(tile);
        }
        GAME_DIV.appendChild(row);
    }
}

// Swap the blank tile 'up', 'down', 'left', or 'right'
function updateState(swapDirection) {
    let newBlankPos = blankPos.copy();
    switch (swapDirection) {
        case DIRECTION.up:
            if (blankPos.y - 1 >= 0) {
                newBlankPos.y = newBlankPos.y - 1;
                swapLetters(newBlankPos);
            }
            break;
        case DIRECTION.down:
            if (blankPos.y + 1 < DIMENSION_Y) {
                newBlankPos.y = newBlankPos.y + 1;
                swapLetters(newBlankPos);
            }
            break;
        case DIRECTION.left:
            if (blankPos.x - 1 >= 0) {
                newBlankPos.x = newBlankPos.x - 1;
                swapLetters(newBlankPos);
            }
            break;
        case DIRECTION.right:
            if (blankPos.x + 1 < DIMENSION_X) {
                newBlankPos.x = newBlankPos.x + 1;
                swapLetters(newBlankPos);
            }
            break;
    }

    console.log(gameState);
    drawState();
}

startGame(INIT_LETTERS);
console.log(gameState);

addEventListener("keydown", (event) => {
    console.log(event.code);
    switch (event.code) {
        case 'ArrowUp':
            updateState(DIRECTION.up);
            break;
        case 'ArrowDown':
            updateState(DIRECTION.down);
            break;
        case 'ArrowRight':
            updateState(DIRECTION.right);
            break;
        case 'ArrowLeft':
            updateState(DIRECTION.left);
            break;
        default:
            break;
    }
});