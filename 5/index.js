const fs = require("fs");

function binarySplit(inNum, tokens){
    let min = 0;
    let max = Math.pow(2, inNum.length) - 1;
    let lastValue = "";

    for(let i = 0; i < inNum.length; i++){
        let c = inNum.charAt(i);
        if(c === tokens[0]){ // token indicator to take left half
            max = Math.floor(max - ((max - min) / 2));
            lastValue = tokens[0];
        }else if(c === tokens[1]){ // token indicator to take right half
            min = Math.ceil(min + ((max - min) / 2));
            lastValue = tokens[1];
        }
    }

    if(lastValue === tokens[0]){
        return min;
    }else{
        return max;
    }

}

function getSeatNum(boardPass){
    let boardPassRow = boardPass.substring(0, 7);
    let boardPassSeat = boardPass.slice(-3);
    let row = binarySplit(boardPassRow, ["F", "B"]);
    let column = binarySplit(boardPassSeat, ["L", "R"]);

    return (
        (row * 8) + column
    );
}

function getHighestSeat(inData){
    let max = 0;
    for(let i = 0; i < inData.length; i++){
        let seatNum = getSeatNum(inData[i]);
        if(seatNum > max){
            max = seatNum;
        }
    }
    return max;
}

// part 2
function getMissingSeat(inData){
    let seats = [];
    for(let i = 0; i < inData.length; i++){
        let seatNum = getSeatNum(inData[i]);
        seats.push(seatNum);
    }
    seats.sort();
    
    for(let i = 0; i < seats.length; i++){
        if(seats[i] !== (seats[0] + i)){
            return (seats[0] + i);
        }
    }

    return seats[0]; // as a default;
}

function parseInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    return inData;
}

{
    let data = parseInput("5/\input_1.txt");
    let seat = getHighestSeat(data);
    console.log(seat);
}
{
    let data = parseInput("5/\input_2.txt");
    let seat = getHighestSeat(data);
    console.log(seat);

    let missingSeat = getMissingSeat(data);
    console.log(missingSeat);
}