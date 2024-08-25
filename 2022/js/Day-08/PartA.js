


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    const rows = [];
    const visible = new Set();

    for await (const row of file.readLines()) {
        rows.push(row);    
    }

       
    for (let row = 1; row < rows.length - 1; row++) {
        for (let col = 1; col < rows[row].length - 1; col++) {

            let x = parseInt(rows[row][col]);
            let fromLeft = true;
            let fromRight = true;
            let fromTop = true;
            let fromBottom = true;
            for (let l = col - 1; l >= 0; l--) {
                if (x <= parseInt(rows[row][l])) {                    
                    fromLeft = false;
                }
            }
            for (let r = col + 1; r < rows[row].length; r++) {
                if (x <= parseInt(rows[row][r])) {
                    fromRight = false;
                }
            }
            for (let t = row - 1; t >= 0; t--) {
                if (x <= parseInt(rows[t][col])) {
                    fromTop = false;
                }
            }
            for (let b = row + 1; b < rows.length; b++) {
                if (x <= parseInt(rows[b][col])) {
                    fromBottom = false;
                }
            }

            if (fromLeft || fromRight || fromTop || fromBottom) {
                let visiblePos = JSON.stringify({row: row, col: col});
                if (!visible.has(visiblePos)) {
                    visible.add(visiblePos);
                }
            }
           
        }        
    }
    


    console.log(`Visible (minus edge): ${visible.size}`);
    let countVisible = visible.size + (rows.length * 2) + (rows[0].length * 2) - 4;
    console.log(`Count Visible: ${countVisible}`);



})();

