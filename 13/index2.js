const fs = require("fs");

function getIndexArr(arr){
    let resultArr = [];

    arr.forEach((element, index) => {
       if(element !== "x"){
            resultArr.push(index);
       }else{
            //resultArr.push(-1); // we should have a placeholder for -1
       }
    });

    return resultArr;
}

function getMax(inArr){
    let max = inArr[0];
    inArr.forEach(element => {
        if(element !== "x"){
            if(parseInt(element) > parseInt(max)){
                max = element;
            }
        }
    });
    return max;
}


function detectTime(inData){
    // need to find solution where x, x+1, x+2, x+3 all have departures (for all buses)

    let indexArr = getIndexArr(inData);
    let maxIncrement = getMax(inData);
    let maxIndex = inData.indexOf(maxIncrement);
    maxIncrement = parseInt(maxIncrement)

    let lastChecked = maxIncrement;
    let length = indexArr.length;
    while(true){
        let validPoint = true;
        //indexArr.forEach(element => {
        for(let i=0; i<length;i++){
            let element = indexArr[i];
            let checkValue = lastChecked - (maxIndex - element);
            let validDivisor = checkValue % parseInt(inData[element]);
            if(validDivisor !== 0){
                validPoint = false;
                break;
            }
        }

        if(validPoint){
            break;
        }

        lastChecked += maxIncrement;
        //if(lastChecked > 1100000){console.log(lastChecked)}
        //console.log(lastChecked);
    }

    return lastChecked;
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    inData[1] = inData[1].split(",");

    return inData[1];
}

// Part 2
/*{
    let data = pullInput("13/\input_1.txt");
    let answer = detectTime(data);
    console.log(answer);
}
{
    let test = [1789,37,47,1889];
    let answer = detectTime(test);
    console.log(answer);
}
{
    let test = [67,7,"x",59,61];
    let answer = detectTime(test);
    console.log(answer);
}*/
{
    let test = pullInput("13/\input_2.txt");
    let answer = detectTime(test);
    console.log(answer);
}