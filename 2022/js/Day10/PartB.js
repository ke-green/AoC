


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./EXAMPLEA.TXT');
    const insts = [];
    let cycle = 0;
    let cycles = 0;
    let X = 1;
    let endCycle = 40;
    let startCycle = 1;
    let totalDB = 0;

    for await (const line of file.readLines()) {
        insts.push(line);    
    }
       
    for (let i = 0; i < insts.length; i++) {
        
        let command = insts[i].split(' ')[0].trim();
        let V = 0;
        
        switch (command) {
            case "noop":
                cycles = 1;
                break;
            case "addx":
                V = parseInt(insts[i].split(' ')[1].trim());
                cycles = 2;
                break;
        }
    
        for (let c = 0; c < cycles; c++) {
            cycle += 1;
            if (cycle == endCycle) {
                startCycle = endCycle + 1;
                endCycle += 40;
            }
            //if (cycle >= startCycle X && cycle <= X + 3) {
            
            //}
        }
    


        X += V;
        

    }
    
    console.log(`totalDB: ${totalDB}`);

})();

