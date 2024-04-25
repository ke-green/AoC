

/*

let a = ['a', 'b', 'c'];
let b = Array.from(a);

console.log(a);
console.log(b);
console.log(b.slice(0, b.length - 1));

return;

*/


/*
let aa = '/'.split('/');
console.log(`${aa}; ${aa.length}`);
a = '/brdsppd'.split('/');
console.log(`${a}; ${a.length}`);

return;
*/

const { open } = require('node:fs/promises');

(async () => {


    const file = await open('./INPUT.TXT');
    let l = 1;
    let cwd = [];
    let cwdkey = '';
    let pwdkey = '';
    const map = new Map();
    const usedmap = new Map();
    //let m = ['/'];
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
            //console.log(`cwd = ${cwd} : cwdpath = ${cwd.join('/')}`);
           
            cwdkey = cwd[0] + cwd.slice(1).join('/');
        }
        else if (line.startsWith('$ ls')) {
            ls = 'ls';
        }
        else if (line.startsWith('dir')) {
            const dir = line.split('dir')[1].trim(); //.replaceAll(' ', '');
            //const mapkey = cwdkey + (cwdkey == '/' ? '' : '/') + dir;
            //console.log((Array.from(cwd)).push('eatme'));
            const aa = Array.from(cwd);
            aa.push(dir);
            //console.log(`aa = ${aa}`);
            const mapkey = aa.toString();
            if (![...map.keys()].includes(mapkey)) {
                //console.log(`mk = ${mapkey}`);
                map.set(mapkey, {'folder' : '', 'name' : '', 'size' : 0}); 
            }
        }
        else if (hasSize.test(line)) {
            console.log(`cwd: ${cwd}; line: ${line}`);
            const size = parseInt(line.split(' ')[0]);            
            map.get(cwd.toString()).size += size;

            for (let i = 1; i < cwd.length; i++) {
                console.log(`cc = ${cwd} ; pp = ${cwd.slice(0, cwd.length - i).toString()}`);
                map.get(cwd.slice(0, cwd.length - i).toString()).size += size;
            }

            //const dirs = cwdkey.split('/');
            //if (cwd.slice(0, cwd.length - 1).toString().length > 0) {
            if (cwd.length > 1) {
                //console.log(`cc = ${cwd} ; pp = ${cwd.slice(0, cwd.length - 1).toString()}`);
                
                //map.get(cwd.slice(0, cwd.length - 1).toString()).size += size;
                //console.log(`cwdkey = ${cwdkey}, dirs = ${dirs.slice(0, dirs.length - 1).join('/')}`);
                //map.get(dirs.slice(0, dirs.length -1).join('/')).size += size;
            }
            else {
                //map.get('/').size += size;
            }
        }
     
        l++;
        
        if (l == 50) {
          //break;
        }
    }
    
    let sumsize = 0;
    for (const [key, value] of map) {
        if (value.size <= 100000) {
        //if (key.startsWith('/,mzdq')) {
            console.log(`${key} : size = ${value.size}`);
            sumsize += value.size;
        }
        
    }
    console.log(`sumsize = ${sumsize}`);

    
    function setParent(d, sz) {
        map.get(d.toString()).size += sz;
    }


})();