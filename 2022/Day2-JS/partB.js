// Rock, Paper, Scissors
// A    , B      C
// X = 1, Y = 2, Z = 3
// X = LOSE, Y = DRAW, Z = WIN
//
// Rock defeats Scissors (C AND X)
// Scissors defeats Paper (B AND Z)
// Paper defeats Rock (A AND Y)
//
// 0 = Lost
// 3 = Draw
// 6 = Win



const { open } = require('node:fs/promises');


(async () => {

  const file = await open('./INPUT.TXT');
  const map = new Map();
  // lose 
  map.set('A X', 3);
  map.set('C X', 2);
  map.set('B X', 1);
  // win
  map.set('C Z', 1);
  map.set('B Z', 3);
  map.set('A Z', 2);
  // tie
  map.set('C Y', 3);
  map.set('B Y', 2);
  map.set('A Y', 1);

  let tot = 0;
  for await (const line of file.readLines()) {
    tot += line.substring(2) == 'Z' ? 6 : line.substring(2) == 'Y' ? 3 : 0;
    tot += map.get(line);
  }
  
  console.log(`Total: ${tot}`);

})();