const fs = require("fs");

class Position{
    constructor(){
        this.x = 0;
        this.y = 0;

        // relative to ships position
        this.waypointX = 10;
        this.waypointY = 1;
    }

    adjustPosition(inCommand){
        switch(inCommand[0]){
            case "N":
                this.waypointY += inCommand[1];
                return;
            case "S":
                this.waypointY -= inCommand[1];
                return;
            case "E":
                this.waypointX += inCommand[1];
                return;
            case "W":
                this.waypointX -= inCommand[1];
                return;
            case "L":
                this.adjustDirection("L", inCommand[1]);
                return;
            case "R":
                this.adjustDirection("R", inCommand[1]);
                return;
            case "F":
                this.moveShip(inCommand[1]);
                return;
            default:
                console.log("Invalid action: " + inCommand[0]);
                return;
        }
    }

    moveShip(multiplier){
        this.x += (this.waypointX * multiplier)
        this.y += (this.waypointY * multiplier)
    }

    adjustDirection(inTurn, degrees){
        let possibleCoords = [
            [this.waypointY.valueOf(), (-this.waypointX).valueOf()],
            [(-this.waypointX).valueOf(), (-this.waypointY).valueOf()],
            [(-this.waypointY).valueOf(), this.waypointX.valueOf()]
        ];
        if(inTurn === "L") possibleCoords.reverse();

        let incrementIndices = degrees / 90;
        let newCoords = possibleCoords[(incrementIndices - 1)];
        this.waypointX = newCoords[0];
        this.waypointY = newCoords[1];
    }
}

function followDirections(inData){
    let ship = new Position();

    inData.forEach((element, index) => {
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

// Part 2
{
    let data = pullInput("12/\input_1.txt");
    let parsedData = parseInput(data);
    let result = followDirections(parsedData);
    console.log((Math.abs(result[0]) + Math.abs(result[1])));
}
{
    let data = pullInput("12/\input_2.txt");
    let parsedData = parseInput(data);
    let result = followDirections(parsedData);
    console.log((Math.abs(result[0]) + Math.abs(result[1])));
}