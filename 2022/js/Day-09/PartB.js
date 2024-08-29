


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    const moves = [];
    const positions = new Set();

    for await (const move of file.readLines()) {
        moves.push(move);    
    }
    
    const knots = Array.from({ length: 10}, (_, i) => ({x : 0, y : 0}));
   
    let position = JSON.stringify({x : knots[0].x, y : knots[0].y});
    positions.add(position);
    
    for (let move = 0; move < moves.length; move++) {
        
        let direction = moves[move].split(' ')[0].trim();
        let steps = parseInt(moves[move].split(' ')[1].trim());

        for (let step = 0; step < steps; step++) {

            switch (direction) {
                case 'U': 
                    knots[0].y += 1;
                    break;
                case 'D':
                    knots[0].y -= 1;
                    break;
                case 'L':
                    knots[0].x -= 1;
                    break;
                case 'R':
                    knots[0].x += 1;
                    break;
            }

            for (let knot = 1; knot < 10; knot++) {

                let yd = (knots[knot - 1].y - knots[knot].y);
                let xd = (knots[knot - 1].x - knots[knot].x);
                let moved = false;
                
                if (Math.abs(xd) > 1 && Math.abs(yd) > 1) {
                    knots[knot].x += xd > 0 ? 1 : -1;
                    knots[knot].y += yd > 0 ? 1 : -1;
                    moved = true;    
                }
                else if (Math.abs(yd) > 1) {
                    knots[knot].y += yd > 0 ? 1 : -1;
                    knots[knot].x = knots[knot - 1].x;
                    moved = true;
                }
                else if (Math.abs(xd) > 1) {
                    knots[knot].x += xd > 0 ? 1 : -1;
                    knots[knot].y = knots[knot - 1].y;
                    moved = true;
                } 
                

                if (moved && knot == 9) {
                    let position = JSON.stringify({x : knots[knot].x, y : knots[knot].y});
                    if (!positions.has(position)) {
                        positions.add(position);
                    }
                }
            }

        }

    }

    console.log(`positions: ${positions.size}`);   


})();

