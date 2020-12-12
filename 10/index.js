const fs = require("fs");

function findAllCombinations(data){
    let sortedData = data.sort((a, b) => a - b);
    sortedData.unshift(0);
    sortedData.push(sortedData[sortedData.length-1] + 3);

    // for differences > 3, no changes can be made.
    // figure out removables...
    //      if (data[i+1] - data[i] == 3) can't remove
    //      else (data[i+1] is a candidate to remove)
    //          validate if removable


    let diffArray = [0];
    for(let i = 1; i < sortedData.length; i++){
        diffArray.push(sortedData[i] - sortedData[i-1]);
    }

    let candidateToRemove = [];
    for(let i = 1; i < (sortedData.length); i++){
        if((sortedData[i] - sortedData[i-1]) !== 3){
            candidateToRemove.push(i);
        }
    }

    let canRemove = [];
    candidateToRemove.forEach(element => {
        let left = sortedData[element-1];
        let right = sortedData[element+1];
        if((right - left) <= 3){
            canRemove.push(sortedData[element]);
        }
    });

    return canRemove;
}

function diff1Times3(data){
    let sortedData = data.sort((a, b) => a - b);
    sortedData.unshift(0);
    sortedData.push(sortedData[sortedData.length-1] + 3);

    let diffs = [0, 0, 0];
    for(let i = 1; i < sortedData.length; i++){
        diffs[(sortedData[i] - sortedData[i-1]) - 1] += 1;
    }

    return (diffs[0] * diffs[2]); 
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n").map(Number);
    return inData;
}

// Part 1
/*{
    let data = pullInput("10/\input_1.txt");
    let count = diff1Times3(data);
    console.log(count);
}
{
    let data = pullInput("10/\input_2.txt");
    let count = diff1Times3(data);
    console.log(count);
}
{
    let data = pullInput("10/\input_3.txt");
    let count = diff1Times3(data);
    console.log(count);
}*/

// Part 2

{
    let data = pullInput("10/\input_1.txt");
    let count = findAllCombinations(data);
    console.log("test");
}
{
    let data = pullInput("10/\input_2.txt");
    let count = findAllCombinations(data);
    console.log("length == " + count.length);
}