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
  const mxElf = {"entry" : 0, "total" : 0};
  for (let e of map.keys()) {
    if (map.get(e) > mxElf.total) {
      mxElf.entry = e;
      mxElf.total = map.get(e);
    }
    console.log(`Elf #${e} = ${map.get(e)}`);
  }
  console.log(`MaxElf(#${mxElf.entry}) : ${mxElf.total}`);
  

})();