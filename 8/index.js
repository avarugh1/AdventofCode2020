const fs = require("fs");

function isCandidate(line){
    let [action, qty] = line.split(" ");
    return (
        (action === "nop") || (action === "jmp")
    );
}

function switchAction(action){
    let ret = (action === "nop") ? "jmp" : "nop";
    return ret;
}

function accumulate(data){
    let coloring = [];
    data.forEach(element => {
        coloring.push(0);
    });

    let accumulator = 0;
    let counter = 0;
    while((coloring[counter] !== 1) && (counter < data.length)){
        coloring[counter] = 1;

        let line = data[counter]; 
        let [action, qty] = line.split(" ");
        if(action === "nop"){
            counter++;
        }else if(action === "jmp"){
            counter += parseInt(qty);
        }else if(action === "acc"){
            accumulator += parseInt(qty);
            counter++;
        }
    }
    return [accumulator, counter];
}

function bruteForceReplace(data){
    let candidates = [];
    for(let i = 0; i < data.length; i++){
        let line = data[i];
        if(isCandidate(line)){
            candidates.push(i);
        }
    }

    //candidates.forEach(element => {
    for(let i = 0; i < candidates.length; i++){
        let element = candidates[i];
        let [action, qty] = data[element].split(" ");
        action = switchAction(action);
        let line = action + " " + qty;
        if((action === "jmp") && (qty === "+0")){

        }else{;
            data[element] = line;

            let result = accumulate(data);
            if(result[1] >= (data.length - 1)){
                return result[0];
            }else{
                action = switchAction(action);
                data[element] = action + " " + qty;
            }
        }
    }
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    return inData;
}

// Part 1
/*{
    let data = pullInput("8/\input_1.txt");
    let count = accumulate(data);
    console.log(count[0]);
}
{
    let data = pullInput("8/\input_2.txt");
    let count = accumulate(data);
    console.log(count[0]);
}*/
{
    let data = pullInput("8/\input_1.txt");
    let count = bruteForceReplace(data);
    console.log(count);
}
{
    let data = pullInput("8/\input_2.txt");
    let count = bruteForceReplace(data);
    console.log(count);
}