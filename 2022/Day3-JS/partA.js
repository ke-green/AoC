

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
    const file = await open('./INPUT.TXT');
    for await (const line of file.readLines()) {
        const first = line.substring(0, line.length / 2);
        const second = line.substring(line.length / 2);
        for (let i = 0; i < first.length; i++) {
            let p = second.indexOf(first[i]);
            if (p != -1) {
                tot += s.indexOf(first[i]) + 1;
                console.log(`${first} / ${second} : Char ${first[i]} / Tot ${tot}`);
                break;
            }
        }
        
    }


})();