


const { open } = require('node:fs/promises');


function reverseSort (a, b) {
    if (a.inspectedCnt < b.inspectedCnt) 
        return 1;
    else if (a.inspectedCnt > b.inspectedCnt) 
        return -1;
    else 
        return 0;       
}


(async () => {

    const file = await open('./INPUT.TXT');
    let round = 1;
    let rounds = 20;
    let monkeys = Array.from({length: 8}, (_, i) => ({monkey: 0, items: [], op: '', opVal: 0, testVal: 0, ifTrue: 0, ifFalse: 0, inspectedCnt: 0}));

   
    /*
    Monkey 0:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
        If true: throw to monkey 2
        If false: throw to monkey 3
    */
    let monkey = '';
    for await (const line of file.readLines()) {
        let tline = line.trim().split(':');
              
        if (tline[0] > '') {
            let ls = tline[0].trim();
            let rs = tline[1].trim();  
            if (ls.startsWith('Monkey')) {
                monkey = parseInt(ls.replace(':', '').split(' ')[1]);
                monkeys[monkey].monkey = monkey;
            }
            if (ls.startsWith('Start')) {
                monkeys[monkey].items = Array.from(rs.trim().split(','), (x) => (parseInt(x)));
            }
            if (ls.startsWith('Oper')) {
                let opParts = rs.split('=')[1].trim().split(' ');
                monkeys[monkey].op = opParts[1];
                monkeys[monkey].opVal = opParts[2] == 'old' ? -999 : parseInt(opParts[2]);
            }
            if (ls.startsWith('Test')) {
                monkeys[monkey].testVal = parseInt(rs.split(' ')[2]);
            }
            if (ls.startsWith('If true')) {
                monkeys[monkey].ifTrue = parseInt(rs.split(' ')[3]);
            }
            if (ls.startsWith('If false')) {
                monkeys[monkey].ifFalse = parseInt(rs.split(' ')[3]);
            }
        }
    }
       
    

    for (let round = 0; round < rounds; round++) {
        for (let monkey = 0; monkey < monkeys.length; monkey++) {
            let wl = 0;
            let items = [...monkeys[monkey].items];
            for (let item = 0; item < items.length; item++) {
                console.log(`round: %{round}, monkey: ${monkey}, items[${item}]: ${items[item]}`);
                let itemVal = parseInt(items[item]);
                let ov = monkeys[monkey].opVal == -999 ? itemVal : monkeys[monkey].opVal;
                switch (monkeys[monkey].op) {
                    case '*':
                        wl = items[item] * ov;
                        break;
                    case '+':
                        wl = items[item] + ov;
                        break;
                    case '-':
                        wl = items[item] - ov;
                        break;
                    case '/':
                        wl = items[item] / ov;
                        break;
                }
                wl = Math.floor(wl / 3);
                
                if (wl % monkeys[monkey].testVal == 0) {
                    monkeys[monkeys[monkey].ifTrue].items.push(wl);
                }
                else {
                    monkeys[monkeys[monkey].ifFalse].items.push(wl);
                } 

                monkeys[monkey].items = monkeys[monkey].items.slice(1);
                monkeys[monkey].inspectedCnt += 1;    
            }
       
        }        
    }
    
    monkeys.sort(reverseSort);

    for (let monkey = 0; monkey < monkeys.length; monkey++) {
        console.log(monkeys[monkey]);
    }

    console.log(`Total: ${monkeys[0].inspectedCnt} * ${monkeys[1].inspectedCnt} = ${monkeys[0].inspectedCnt * monkeys[1].inspectedCnt}`);

    


})();

