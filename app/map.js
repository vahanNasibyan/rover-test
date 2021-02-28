/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
function isOnMap(x, y, width, height) {
  return x >= 0 && y >= 0 && x <= width && y <= height;
}

function isColliding(x, y, rovers, roverId) {
  for (const key in rovers) {
    if (rovers.hasOwnProperty(key) && key !== roverId) {
      const roverPosition = rovers[key].getPosition();
      if (x === roverPosition.x && y === roverPosition.y) {
        return true;
      }
    }
  }

  return false;
}

class Map {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rovers = {};
    this.roverId = 0;
  }

  isValidPosition(x, y, roverId) {
    return isOnMap(x, y, this.x, this.y) && !isColliding(x, y, this.rovers, roverId);
  }

  moveRover(roverId, action) {
    const rover = this.rovers[roverId];

    if (action === 'left') {
      rover.turnLeft();
    } else if (action === 'right') {
      rover.turnRight();
    } else if (action === 'move') {
      const projectedMove = rover.projectMove();
      if (this.isValidPosition(projectedMove.x, projectedMove.y, roverId)) {
        rover.move();
      } else {
        throw new Error('moving rover to an invalid space');
      }
    }
  }

  addRover(rover) {
    const roverPosition = rover.getPosition();
    if (this.isValidPosition(roverPosition.x, roverPosition.y)) {
      this.roverId += 1;
      const { roverId } = this;
      this.rovers[roverId] = rover;
      return roverId;
    }
    throw new Error('placing rover in invalid space');
  }
}

module.exports = Map;
