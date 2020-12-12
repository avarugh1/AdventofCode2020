const fs = require("fs");

//try/catch hack to catch out of bounds errors esp for 2d arrays
function defaultCatch(seating, row, column, incrementRow, incrementColumn){
    let value = 1;
    try{
        value = seating[row][column];
        while(value === "."){
            value = seating[row + incrementRow][column + incrementColumn];
            row = row + incrementRow;
            column = column + incrementColumn;
        }
    }catch (error){}

    return value;
}

function getAdjacentSeats(seating, row, column){
    // clockwise around the seat, starting from top left
    let retArray = [1,1,1,1,1,1,1,1];

    retArray[0] = defaultCatch(seating,row-1, column-1, -1, -1);
    retArray[1] = defaultCatch(seating,row-1, column, -1, 0);
    retArray[2] = defaultCatch(seating,row-1, column+1, -1, 1);
    retArray[3] = defaultCatch(seating,row, column+1, 0, 1);
    retArray[4] = defaultCatch(seating,row+1, column+1, 1, 1);
    retArray[5] = defaultCatch(seating,row+1, column, 1, 0);
    retArray[6] = defaultCatch(seating,row+1, column-1, 1, -1);
    retArray[7] = defaultCatch(seating,row, column-1, 0, -1);

    return retArray;
}

function verifyRules(seating, row, column, minimumOccupied){
    if(seating[row][column] === "L"){ // either stays L or becomes occupied #
        if(getAdjacentSeats(seating,row,column).includes("#")){
            return "L";
        }else{
            return "#";
        }
    }else if(seating[row][column] === "#"){ // either stays # or becomes empty L
        let adjSeats = getAdjacentSeats(seating,row,column);
        let count = adjSeats.filter((x) => x === "#").length;

        if(count >= minimumOccupied){
            return "L";
        }else{
            return "#";
        }
    }else{
        return "."; // no change with .
    }
}

function countOccupied(data, minimumOccupied){
    let iterations = 0;
    let seatsChanged = 1;
    let copiedData = [];

    while(seatsChanged !== 0){
        seatsChanged = 0;
        iterations++;

        for(let i = 0; i < data.length; i++){
            let newArr = [];
            for(let j = 0; j < data[i].length; j++){
                let seatValue = verifyRules(data, i, j, minimumOccupied);
                newArr.push(seatValue);

                if(seatValue !== data[i][j]){
                    seatsChanged++;
                }
            }
            copiedData.push(newArr);
        }

        data = copiedData.map(inner => inner.slice());
        copiedData = [];
    }

    let occupied = 0;
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].length; j++){
            if(data[i][j] === "#") occupied++;
        }
    }
    return occupied;
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    return inData;
}

// Part 1
/*{
    let data = pullInput("11/\input_1.txt");
    let count = countOccupied(data, 4);
    console.log(count);
}
{
    let data = pullInput("11/\input_2.txt");
    let count = countOccupied(data, 4);
    console.log(count);
}*/

// Part 2
{
    let data = pullInput("11/\input_1.txt");
    let count = countOccupied(data, 5);
    console.log(count);
}
{
    let data = pullInput("11/\input_2.txt");
    let count = countOccupied(data, 5);
    console.log(count);
}