const output = require('../output');
const Rover = require('../rover');

describe('output', () => {
  it('outputs correctly', () => {
    const rovers = [];
    rovers.push(new Rover('north', 1, 1));
    rovers.push(new Rover('east', 2, 2));
    expect(output(rovers)).toEqual('1 1 N\n2 2 E\n');
  });
});
