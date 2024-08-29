

const { open } = require('node:fs/promises');

(async () => {

    let l = 1;
    let i = 1;
    let stacks = new Array(9);
    let stack = 0;
    const file = await open('./INPUT.TXT');
    
    for await (const line of file.readLines()) {
       
       if (line[0] == '[') {
            for (i = 1; i <=33; i += 4) {
                if (stacks[stack] == undefined) {
                    stacks[stack] = [];
                }
                let container = line.substring(i, i + 1);
                if (container.trim().length > 0) {
                    stacks[stack].push(container);
                }
                stack++;
            }
            stack = 0;
        }
        else if (line.trim().length == 0) {
            console.log(`reversing...${l}`);
            // Reverse stacks to put containers in proper order.
            for (i = 0; i < stacks.length; i++) {
                stacks[i].reverse();
            }
        }
        else if (line.substring(0, 1) == 'm') {
            let instructions = line.split(' ');
            let move_cnt = instructions[1];
            let move_from = instructions[3];
            let move_to = instructions[5];
            for (i = 1; i <= parseInt(move_cnt); i++) {
              let container = stacks[move_from - 1].pop();
              stacks[move_to - 1].push(container);
            }

        }

        l++;
    }

    for (i = 0; i < stacks.length; i++) {
        console.log(`stack(${i}) : ${stacks[i][stacks[i].length - 1]}`);
    }
    
    
})();