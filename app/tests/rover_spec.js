const Rover = require('../rover');

describe('Rover', () => {
  it('inits with the correct values', () => {
    const rover = new Rover('north', 1, 2);
    expect(rover.getDirection()).toEqual('north');
    expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
  });

  it('turns correctly', () => {
    const rover = new Rover('north', 1, 2);
    rover.turnRight();
    expect(rover.getDirection()).toEqual('east');
    rover.turnLeft();
    expect(rover.getDirection()).toEqual('north');
  });

  it('moves forward in the correct direction', () => {
    const rover = new Rover('south', 1, 2);
    rover.move();
    expect(rover.getPosition()).toEqual({ x: 1, y: 1 });
  });

  it('projects a move position without actually moving the rover', () => {
    const rover = new Rover('east', 1, 2);
    expect(rover.projectMove()).toEqual({ x: 2, y: 2 });
    expect(rover.getPosition()).toEqual({ x: 1, y: 2 });
  });
});
