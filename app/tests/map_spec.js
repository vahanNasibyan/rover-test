const Map = require('../map');
const Rover = require('../rover');

describe('Map', () => {
  it('inits correctly', () => {
    const map = new Map(1, 2);
    expect(map.x).toEqual(1);
    expect(map.y).toEqual(2);
  });

  it('validates a valid posistion', () => {
    const map = new Map(2, 2);
    expect(map.isValidPosition(2, 2)).toEqual(true);
  });

  it('invalidates a position that is off the map', () => {
    const map = new Map(2, 2);
    expect(map.isValidPosition(3, 2)).toEqual(false);
  });

  it('adds a rover', () => {
    const map = new Map(4, 4);
    const rover = new Rover('west', 2, 2);
    const roverId = map.addRover(rover);
    expect(map.rovers[roverId]).toEqual(rover);
  });

  it('invalidates a position that is colliding with another rover', () => {
    const map = new Map(2, 2);
    const rover = new Rover('east', 1, 1);
    map.addRover(rover);
    expect(map.isValidPosition(1, 1)).toEqual(false);
  });

  it('moves a rover', () => {
    const map = new Map(3, 3);
    const rover = new Rover('north', 1, 1);
    const roverId = map.addRover(rover);
    map.moveRover(roverId, 'move');
    expect(map.rovers[roverId].getPosition().y).toEqual(2);
  });

  it('rejects a misplaced rover', () => {
    const map = new Map(3, 3);
    const rover = new Rover('north', 5, 5);

    expect(addRover).toThrow();

    function addRover() {
      map.addRover(rover);
    }
  });

  it('rejects a colliding rover move', () => {
    const map = new Map(3, 3);
    map.addRover(new Rover('north', 1, 2));
    const roverId = map.addRover(new Rover('west', 2, 2));
    expect(moveRover).toThrow();

    function moveRover() {
      map.moveRover(roverId, 'move');
    }
  });

  it('rejects a rover move that goes off the map', () => {
    const map = new Map(3, 3);
    const roverId = map.addRover(new Rover('north', 3, 3));
    expect(moveRover).toThrow();

    function moveRover() {
      map.moveRover(roverId, 'move');
    }
  });
});
