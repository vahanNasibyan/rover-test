const fs = require('fs');

const Map = require('./map');
const Rover = require('./rover');
const DIRECTIONS = require('./constants/directions').in;
const MOVES = require('./constants/moves').in;

/**
 * Process the input text file and reject on error
 * @returns {*|promise}
 */
function getInput() {
  return new Promise((resolve, reject) => {
    fs.readFile('./input.txt', 'utf8', (error, data) => {
      if (error) {
        reject();
      } else {
        try {
          const roverInfo = processInput(data);
          resolve(roverInfo);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

function setupMap(line) {
  const widthHeight = line.split(' ');
  const width = parseInt(widthHeight[0], 10);
  const height = parseInt(widthHeight[1], 10);
  if (Number.isNaN(width) || Number.isNaN(height)) {
    throw new Error('invalid map');
  }
  return new Map(width, height);
}

function setupRover(initialPosition) {
  const position = initialPosition.split(' ');

  const x = parseInt(position[0], 10);
  const y = parseInt(position[1], 10);
  const direction = DIRECTIONS[position[2]];

  if (Number.isNaN(x) || Number.isNaN(y) || typeof direction === 'undefined') {
    throw new Error('invalid rover');
  }
  return new Rover(direction, x, y);
}

function setupMoves(moves) {
  return moves.split('').map((move) => {
    if (MOVES[move]) {
      return MOVES[move];
    }
    throw new Error('invalid move');
  });
}

/**
 * Turn a string into a more useful set of rovers and a map
 * @param data The input string
 */
function processInput(data) {
  const lines = data.trim().split('\n');
  const map = setupMap(lines.shift());
  const roverPlans = [];
  while (lines.length > 0) {
    roverPlans.push({
      rover: setupRover(lines.shift()),
      moves: setupMoves(lines.shift()),
    });
  }

  return {
    map,
    roverPlans,
  };
}

module.exports = {
  getInput,
  _processInput: processInput,
};
