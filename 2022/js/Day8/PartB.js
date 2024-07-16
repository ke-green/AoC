


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    const rows = [];
    const visible = new Set();
    let totScore = 0;

    for await (const row of file.readLines()) {
        rows.push(row);    
    }

    for (let row = 1; row < rows.length - 1; row++) {
        for (let col = 1; col < rows[row].length - 1; col++) {
            let x = parseInt(rows[row][col]);
            let lc = 0, rc = 0; tc = 0, bc = 0;
            let fromLeft = true;
            let fromRight = true;
            let fromTop = true;
            let fromBottom = true;
            for (let l = col - 1; l >= 0; l--) {
                lc++;
                if (x <= parseInt(rows[row][l])) {                    
                    fromLeft = false;
                    break;
                }
            }
            for (let r = col + 1; r < rows[row].length; r++) {
                rc++;
                if (x <= parseInt(rows[row][r])) {
                    fromRight = false;
                    break;
                }
            }
            for (let t = row - 1; t >= 0; t--) {
                tc++;
                if (x <= parseInt(rows[t][col])) {
                    fromTop = false;
                    break;
                }
            }
            for (let b = row + 1; b < rows.length; b++) {
                bc++;
                if (x <= parseInt(rows[b][col])) {
                    fromBottom = false;
                    break;
                }
            }

            if (fromLeft || fromRight || fromTop || fromBottom) {
                totScore = Math.max(totScore, lc * rc * tc * bc);
                let visiblePos = JSON.stringify({row: row, col: col});
                if (!visible.has(visiblePos)) {
                    visible.add(visiblePos);
                }
            }
           
        }        
    }
    


    console.log(`Visible (minus edge): ${visible.size}`);
    let countVisible = visible.size + (rows.length * 2) + (rows[0].length * 2) - 4;
    console.log(`Count: ${countVisible}`);
    console.log(`TotScore: ${totScore}`);



})();
