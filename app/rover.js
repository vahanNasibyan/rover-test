const directions = {
  north: {
    left: 'west',
    right: 'east',
    move() {
      this.y += 1;
    },
  },
  south: {
    left: 'east',
    right: 'west',
    move() {
      this.y -= 1;
    },
  },
  east: {
    left: 'north',
    right: 'south',
    move() {
      this.x += 1;
    },
  },
  west: {
    left: 'south',
    right: 'north',
    move() {
      this.x -= 1;
    },
  },
};

class Rover {
  /**
 * A single mars rover
 * @param direction The direction object the rover is facing
 * @param x The x coordinate of the rover
 * @param y The y coordinate of the rover
 * @constructor
 */
  constructor(direction, x, y) {
    this.direction = direction;
    this.x = x;
    this.y = y;
  }

  turnLeft() {
    this.direction = directions[this.direction].left;
  }

  turnRight() {
    this.direction = directions[this.direction].right;
  }

  move() {
    directions[this.direction].move.call(this);
  }

  /**
 * Simulate a move and return the projected position
 * @returns {{x, y}}
 */
  projectMove() {
    const { x } = this;
    const { y } = this;
    directions[this.direction].move.call(this);
    const projectedPosition = this.getPosition();
    this.x = x;
    this.y = y;
    return projectedPosition;
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Rover;
