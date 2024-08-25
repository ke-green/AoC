

const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    let l = 14;

    for await (const line of file.readLines()) {
       
        for (let i = 0; i < line.length; i++) {
            let s = line.substring(i, i + l);
            if (!Array.from(s).some((c, i) => s.includes(c, i + 1))) {
                console.log(`i = ${i}, i+l = ${i + l}, chars = ${s}`);
                return;
            }


        }
    }

    
    
})();