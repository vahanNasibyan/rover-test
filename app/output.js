const DIRECTIONS = require('./constants/directions').out;

module.exports = (rovers) => {
  let output = '';

  rovers.forEach((rover) => {
    const direction = rover.getDirection();
    const position = rover.getPosition();
    output += `${position.x} ${position.y} ${DIRECTIONS[direction]}\n`;
  });

  return output;
};
