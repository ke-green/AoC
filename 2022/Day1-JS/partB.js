const { open } = require('node:fs/promises');

(async () => {

  const file = await open('./INPUT.TXT');
  const map = new Map();
  let i = 1;
  map.set(i, 0);  
  for await (const line of file.readLines()) {
    if (line == '') {
      i++;
      map.set(i, 0);
    }
    else {
      map.set(i, map.get(i) + parseInt(line));
    }
  }

  const sortDesc = (a, b) => {
    if (a < b) {
      return 1;
    }
    else if (a > b) {
      return -1;
    }
    else {
      return 0;
    }
  }

  let tot = 0;
  const vals = [...map.values()].sort(sortDesc);
  for (i = 0; i < 3; i++) {
    console.log(`#${i} : ${vals[i]}`);
    tot += vals[i];
  }
  
  console.log(`Total: ${tot}`);
  
})();