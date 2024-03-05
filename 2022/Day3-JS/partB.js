

const { open } = require('node:fs/promises');

(async () => {

    let s = '';
    for (let i = 1; i <= 26; i++) {
        s += String.fromCharCode(96 + i);
    }
    for (let i = 1; i <= 26; i++) {
        s += String.fromCharCode(64 + i);
    }
    let tot = 0;
    let sack = 0;
    let grp = 0;
    let sacks = ['', '', ''];
    const file = await open('./INPUT.TXT');
    for await (const line of file.readLines()) {
        let rs = sack++ % 3;
        sacks[rs] = line;
        if (rs == 2) {
            for (let i = 0; i < sacks[0].length; i++) {
                if (sacks[1].indexOf(sacks[0][i]) > -1 && sacks[2].indexOf(sacks[0][i]) > -1) {
                    tot += s.indexOf(sacks[0][i]) + 1;
                    console.log(`Group ${grp} : Char ${sacks[0][i]} / Tot ${tot}`);
                    break;
                }

            }
            grp++;
        }
        
    }

})();