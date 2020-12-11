const fs = require("fs");

function slidingWindow(data, final){
    let initial = 0;
    let sum = data[0];
    for(let i = 1; i < data.length; i++){
        sum += data[i];
        while(sum > final){
            sum -= data[initial];
            initial++;
        }
        if(sum === final){
            let min = data[initial];
            let max = data[initial];
            for(let j = initial; j < (i+1); j++){
                if(data[j] > max) max = data[j];
                if(data[j] < min) min = data[j];
            }
            return min + max;
        }
    }
    //return data[initial];
}

function firstMissing(data, preamble){
    let sumMatrix = [];

    for(let i = 0; i < preamble; i++){
        let sumArray = [];
        for(let j = 0; j < preamble; j++){
            if(i !== j){
                sumArray.push(data[i] + data[j]);
            }
        }
        sumMatrix.push(sumArray);
    }

    for(let i = preamble; i < data.length; i++){
        let verifyNum = data[i];
        let found = false;
        for(let j = 0; j < preamble; j++){
            let sumArray = sumMatrix[j];
            if(sumArray.includes(verifyNum)){
                found = true;
                break;
            }
        }
        if(!found){
            return verifyNum;
        }

        for(let j = 0; j < preamble; j++){
            sumMatrix[j].shift();
        }
        sumMatrix.shift();
        for(let j = 0; j < sumMatrix.length; j++){
            sumMatrix[j].push(data[i] + data[(i+1) - preamble]);
        }

        let sumArray = [];
        for(let j = ((i+1) - preamble); j < i; j++){
            sumArray.push(data[j] + data[i]);
        }

        sumMatrix.push(sumArray);
    }
}


function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n").map(Number);
    return inData;
}

// Part 1
/*{
    let data = pullInput("9/\input_1.txt");
    let count = firstMissing(data, 5);
    console.log(count);
}
{
    let data = pullInput("9/\input_2.txt");
    let count = firstMissing(data, 25);
    console.log(count);
}*/

// Part 2
{
    let data = pullInput("9/\input_1.txt");
    let count = firstMissing(data, 5);
    let sum = slidingWindow(data, count);
    console.log(sum);
}
{
    let data = pullInput("9/\input_2.txt");
    let count = firstMissing(data, 25);
    let sum = slidingWindow(data, count);
    console.log(sum);
}