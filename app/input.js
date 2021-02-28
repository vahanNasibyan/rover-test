const fs = require('fs');
const inquirer = require('inquirer');
const minimist = require('minimist');

const Map = require('./map');
const Rover = require('./rover');
const DIRECTIONS = require('./constants/directions').in;
const MOVES = require('./constants/moves').in;

function transformCMDAnswersToFileFormat(data) {
  let str = `${data[0].plateau_size}\n`;
  data.forEach((item) => {
    str += (`${item.landing}\n`);
    str += (`${item.instructions}\n`);
  });
  return str;
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

function getCMDInput() {
  return new Promise((resolve, reject) => {
    const output = [];
    let isInitialPrompt = true;
    const questions = [
      {
        type: 'input',
        name: 'plateau_size',
        message: "What's your Plateau size",
        default: '5 5',
        when() {
          return isInitialPrompt;
        },
      },
      {
        type: 'input',
        name: 'landing',
        message: 'Rover Landing Coordinages',
        default: '1 2 N',
      },
      {
        type: 'input',
        name: 'instructions',
        message: 'Rover Landing Coordinages',
        default: 'LMLMLMLMM',
      },
      {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to add another Rover (just hit enter for YES)?',
        default: true,
      },
    ];

    function ask() {
      inquirer.prompt(questions)
        .then((answers) => {
          output.push(answers);
          isInitialPrompt = false;
          if (answers.askAgain) {
            ask();
          } else {
            const str = transformCMDAnswersToFileFormat(output);
            const info = processInput(str);
            resolve(info);
          }
        })
        .catch((err) => reject(err));
    }

    ask();
  });
}
function getFileInput() {
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
/**
 * Process the input text file and reject on error
 * @returns {*|promise}
 */
function getInput() {
  const argv = minimist(process.argv.slice(2));
  if (argv.source === 'file') {
    return getFileInput();
  }

  return getCMDInput();
}

module.exports = {
  getInput,
  processInput,
};
