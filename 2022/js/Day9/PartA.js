


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    const moves = [];
    const positions = new Set();

    for await (const move of file.readLines()) {
        moves.push(move);    
    }
       
    let head = {x : 0, y : 0};
    let tail = {x : 0, y : 0};
    let i = 0;

    let position = JSON.stringify({x : tail.x, y : tail.y});
    positions.add(position);
    
    for (let move = 0; move < moves.length; move++) {
        
        let direction = moves[move].split(' ')[0].trim();
        let steps = parseInt(moves[move].split(' ')[1].trim());

        for (let step = 0; step < steps; step++) {
            switch (direction) {
                case 'U': 
                    head.y += 1;
                    break;
                case 'D':
                    head.y -= 1;
                    break;
                case 'L':
                    head.x -= 1;
                    break;
                case 'R':
                    head.x += 1;
                    break;
            }
            
            
            let yd = (head.y - tail.y);
            let xd = (head.x - tail.x);
            let moved = false;

            if (Math.abs(yd) > 1) {
                tail.y += yd > 0 ? 1 : -1;
                tail.x = head.x;
                moved = true;
            }
            else if (Math.abs(xd) > 1) {
                tail.x += xd > 0 ? 1 : -1;
                tail.y = head.y;
                moved = true;
            } 


            console.log(`move(${move}): xd-${xd}, yd-${yd}, ${moves[move]}, head: ${JSON.stringify(head)}}, tail:  ${JSON.stringify(tail)}`)

            if (moved) {
                let position = JSON.stringify({x : tail.x, y : tail.y});
                if (!positions.has(position)) {
                    positions.add(position);
                }
            }
            
        }

      
        
    }

    
    console.log(`positions: ${positions.size}`);
        

    


})();

