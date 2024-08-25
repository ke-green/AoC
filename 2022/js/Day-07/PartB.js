


const { open } = require('node:fs/promises');

(async () => {

    const file = await open('./INPUT.TXT');
    let l = 1;
    let cwd = [];
    const map = new Map();
    map.set('/', {'folder' : '', 'name' : '', 'size' : 0}); 
    let hasSize = /^[0-9]/;
    for await (const line of file.readLines()) {
        let cd = '';
        let ls = '';
        
        if (line.startsWith('$ cd')) {
            cd = line.split('$ cd')[1].replaceAll(' ', '');
            if (cd == '..') {
                cwd.pop();
            }
            else {
                cwd.push(cd);
            }
        }
        else if (line.startsWith('$ ls')) {
            ls = 'ls';
        }
        else if (line.startsWith('dir')) {
            const dir = line.split('dir')[1].trim();
            const aa = Array.from(cwd);
            aa.push(dir);
            const mapkey = aa.toString();
            if (![...map.keys()].includes(mapkey)) {
                map.set(mapkey, {'folder' : '', 'name' : '', 'size' : 0}); 
            }
        }
        else if (hasSize.test(line)) {
            const size = parseInt(line.split(' ')[0]);            
            map.get(cwd.toString()).size += size;
            for (let i = 1; i < cwd.length; i++) {
                map.get(cwd.slice(0, cwd.length - i).toString()).size += size;
            }

        }
        
    }

    const free = 70000000 - map.get('/').size;
    let dirSize = 99999999;
    for (const [key, value] of map) {
        if (free + value.size >= 30000000) {
            dirSize = Math.min(dirSize, value.size);

        }
    }
    console.log(`dirSize = ${dirSize}`);



})();