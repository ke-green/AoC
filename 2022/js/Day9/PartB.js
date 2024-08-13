


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./SAMPLE2.TXT');
    const moves = [];
    const positions = new Set();

    for await (const move of file.readLines()) {
        moves.push(move);    
    }
    
    const knots = Array(10).fill({x : 0, y: 0});
    
    knots[0] = {x : 0, y : 0};
    let tail = {x : 0, y : 0};
    let i = 0;

    let position = JSON.stringify({x : 0, y : 0});
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

                if (Math.abs(yd) > 1) {
                    knots[knot].y += yd > 0 ? 1 : -1;
                    knots[knot].x = knots[knot - 1].x;
                    console.log(`yd...${knot}`);
                    moved = true;
                    
                }
                else if (Math.abs(xd) > 1) {
                    knots[knot].x += xd > 0 ? 1 : -1;
                    knots[knot].y = knots[knot - 1].y;
                    console.log(`xd...${knot}`);
                    moved = true;
                } 

                if (knot == 9) {
                    //console.log(`move(${move}): xd-${xd}, yd-${yd}, ${moves[move]}, knot[0]: ${JSON.stringify(knots[0])}}, knot[${knot}]:  ${JSON.stringify(knots[knot])}, mvd: ${moved.toString()}`)
                }

                if (moved && knot == 9) {
                    console.log(`move(${move}): xd-${xd}, yd-${yd}, ${moves[move]}, knot[0]: ${JSON.stringify(knots[0])}}, knot[${knot}]:  ${JSON.stringify(knots[knot])}`)
                    //let position = JSON.stringify({x : knots[9].x, y : knots[9].y});
                    let position = JSON.stringify(knots[9]);
                    if (!positions.has(position)) {
                        positions.add(position);
                    }
                }
            }

        }

      
        
    }

    
    console.log(`positions: ${positions.size}`);   


})();

