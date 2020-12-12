const fs = require("fs");

class Position{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.direction = "E";
    }

    adjustPosition(inCommand){
        
        switch(inCommand[0]){
            case "N":
                this.y += inCommand[1];
                return;
            case "S":
                this.y -= inCommand[1];
                return;
            case "E":
                this.x += inCommand[1];
                return;
            case "W":
                this.x -= inCommand[1];
                return;
            case "L":
                this.adjustDirection("L", inCommand[1]);
                return;
            case "R":
                this.adjustDirection("R", inCommand[1]);
                return;
            case "F":
                this.adjustPosition([this.direction, inCommand[1]]);
                return;
            default:
                console.log("Invalid action: " + inCommand[0]);
                return;
        }
    }

    adjustDirection(inTurn, degrees){
        let possiblePos = ["N", "E", "S", "W"];
        if(inTurn === "L") possiblePos.reverse();

        let incrementIndices = degrees / 90;
        let startingIndex = possiblePos.indexOf(this.direction);
        let endIndex = (startingIndex + incrementIndices) % 4;

        this.direction = possiblePos[endIndex];
    }
}

function moveShip(inDirections){
    let ship = new Position();

    inDirections.forEach(element => {
        ship.adjustPosition(element);
    });

    return [ship.x, ship.y];
}

function parseInput(inData){
    let retArr = [];
    inData.forEach(element => {
        let left = element[0];
        let right = parseInt(element.substring(1));
        retArr.push([left,right]);
    });

    return retArr;
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    return inData;
}

// Part 1
{
    let data = pullInput("12/\input_1.txt");
    let parsedData = parseInput(data);
    let result = moveShip(parsedData);
    console.log((Math.abs(result[0]) + Math.abs(result[1])));
}
{
    let data = pullInput("12/\input_2.txt");
    let parsedData = parseInput(data);
    let result = moveShip(parsedData);
    console.log((Math.abs(result[0]) + Math.abs(result[1])));
}