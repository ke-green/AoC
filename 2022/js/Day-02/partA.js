// Rock, Paper, Scissors
// A    , B      C
// X = 1, Y = 2, Z = 3
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
  let i = 1;
  let tot = 0;
  for await (const line of file.readLines()) {
    tot += line.substring(2) == 'X' ? 1 : line.substring(2) == 'Y' ? 2 : 3;
    if (line == 'C X' || line == 'B Z' || line == 'A Y') {
        tot += 6;
    }
    else if (line == 'A X' || line == 'B Y' || line == 'C Z') {
        tot += 3;
    }
    else {
        tot += 0;
    }
  }
  
  console.log(`Total: ${tot}`);

})();