

const { open } = require('node:fs/promises');

(async () => {

    let i = 1;
    let tot = 0;
    const file = await open('./INPUT.TXT');
    
    for await (const line of file.readLines()) {
       const grps = line.split(',');
       const grp1a = parseInt(grps[0].split('-')[0]);
       const grp1b = parseInt(grps[0].split('-')[1]);
       const grp2a = parseInt(grps[1].split('-')[0]);
       const grp2b = parseInt(grps[1].split('-')[1]);
       if ((grp1a <= grp2a && grp1b >= grp2b) || 
           (grp2a <= grp1a && grp2b >= grp1b)) {

            tot++;
            console.log(`line ${i} (${line}) : tot ${tot}`);
        }
        i++;
    }


})();