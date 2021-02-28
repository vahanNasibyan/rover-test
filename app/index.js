const input = require('./input');
const output = require('./output');

input.getInput()
  .then((data) => {
    const { map } = data;
    const { roverPlans } = data;
    const rovers = [];

    roverPlans.forEach((roverPlan) => {
      try {
        const { rover } = roverPlan;
        const { moves } = roverPlan;
        rovers.push(rover);

        const roverId = map.addRover(rover);

        moves.forEach((move) => {
          map.moveRover(roverId, move);
        });
      } catch (error) {
        rovers.pop();
        console.log(error);
      }
    });

    console.log('----- OUT -----');
    console.log(output(rovers));
    console.log('----------------------');
  });
