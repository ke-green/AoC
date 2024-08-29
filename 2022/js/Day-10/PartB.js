


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    const insts = [];
    let cycle = 0;
    let cycles = 0;
    let X = 1;
    let endCycle = 40;
    let startCycle = 1;
    let pixels = Array.from({length: 40}, (_, i) => ('.'));

    for await (const line of file.readLines()) {
        insts.push(line);    
    }
       
    for (let i = 0; i < insts.length; i++) {
        
        let command = insts[i].split(' ')[0].trim();
        let V = 0;
        
        switch (command) {
            case 'noop':
                cycles = 1;
                break;
            case 'addx':
                V = parseInt(insts[i].split(' ')[1].trim());
                cycles = 2;
                break;
        }
    
            
        for (let c = 0; c < cycles; c++) {           
            
            if (cycle >= (X - 1) && cycle <= (X + 1)) {                
                pixels[cycle] = '#';
            }

            if (startCycle == endCycle) {
                startCycle = endCycle + 1;
                endCycle += 40;
                cycle = 0;
                console.log(pixels.join(''));
                pixels = Array.from({length: 40}, (_, i) => ('.'));
            }
            else {
                cycle += 1;
                startCycle += 1;
            }
            
        }
    
        X += V;

    }

})();

