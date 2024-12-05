


const { open } = require('node:fs/promises');



(async () => {

    const file = await open('./SAMPLE.TXT');
    const squares = [];
    const S_pos = {x : 0, y : 0};
    const E_pos = {x : 0, y : 0};
    let l = 0;
    const starts = [];

    for await (const line of file.readLines())
    {
        squares.push(line);
        for (i = 0; i < squares[l].length; i++) {
            if (squares[l][i] == 'S') {
                S_pos.x = i;
                S_pos.y = l;
            }
            if (squares[l][i] == 'E') {
                E_pos.x = i;
                E_pos.y = l;
            }
        }
        l++;
    }

    //right
    if (S_pos.x + 1 < squares[S_pos.y].length) {
        if (squares[S_pos.y][S_pos.x + 1] == 'a') {
            starts.push({x : S_pos.x + 1, y : S_pos.y});
        }
    }
    //left
    if (S_pos.x > 0) {
        if (squares[S_pos.y][S_pos.x - 1] == 'a') {
            starts.push({x : S_pos.x - 1, y : S_pos.y});
        }
    }
    //top
    if (S_pos.y > 0) {
        if (squares[S_pos.y - 1][S_pos.x] == 'a') {
            starts.push({x : S_pos.x, y : S_pos.y - 1});
        }
    }
    // below
    if (S_pos.y + 1 < squares.length) {
        if (squares[S_pos.y + 1][S_pos.x] == 'a') {
            starts.push({x : S_pos.x, y : S_pos.y + 1});
        }
    }

    // Where is S?
    // How many starts?
    console.log(`S_pos = ${JSON.stringify(S_pos)}`);
    console.log(starts);
    console.log(`E_pos = ${JSON.stringify(E_pos)}`);


})();

