const fs = require("fs");

function earliest(inData){
    let earliestArr = [];
    let departure = inData[0];
    inData[1].forEach(element => {
        let roundNum = Math.ceil(departure / element);
        earliestArr.push(roundNum * element);
    });

    let chosen = inData[1][earliestArr.indexOf(Math.min(...earliestArr))];
    return chosen * (
        Math.min(...earliestArr) - departure
    );
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    inData[1] = inData[1].split("x,").join("").split(",");

    return inData;
}

// Part 1
{
    let data = pullInput("13/\input_1.txt");
    let answer = earliest(data);
    console.log(answer);
}
{
    let data = pullInput("13/\input_2.txt");
    let answer = earliest(data);
    console.log(answer);
}