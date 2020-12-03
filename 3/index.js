const fs = require('fs');

function computeX(inData, rightCount, downCount){
    let count = 0;
    let curPos = [0, 0]; // x,y
    for(let i = 1; i < inData.length; i++){
        newPos = [((curPos[0] + rightCount) % inData[0].length), curPos[1] + downCount]; 
        let x = newPos[0]; let y = newPos[1];

        if(y >= inData.length){ // edge case for pt 2 since we might run faster than loop increment
            break; 
        }

        if(inData[y][x] === "#"){
            count++;
        }
        curPos = newPos;
    }
    return count;
}

function parseInput(inFile){
    let inData = fs.readFileSync(inFile, 'utf-8');
    inData = inData.split("\r\n");

    return inData;
}

{
    let data = parseInput("3/\input_1.txt");
    console.log(computeX(data, 3, 1));
}
{
    let data = parseInput("3/\input_2.txt");
    console.log(computeX(data, 3, 1));
}
{
    let data = parseInput("3/\input_1.txt");
    console.log(computeX(data, 1, 1));
}
{
    let data = parseInput("3/\input_1.txt");
    console.log(computeX(data, 5, 1));
}
{
    let data = parseInput("3/\input_1.txt");
    console.log(computeX(data, 1, 2));
}
{
    let data = parseInput("3/\input_2.txt");
    let ans = [computeX(data,1,1),computeX(data,3,1),computeX(data,5,1),computeX(data,7,1),computeX(data,1,2)]
    let ctr = 1;
    ans.forEach((ele) => ctr *= ele);
    console.log(ctr);
}