

const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    
    for await (const line of file.readLines()) {
       
       
    }

    
    
})();