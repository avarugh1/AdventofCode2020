const fs = require("fs");

// part 2 
function getIntersectionOfYes(inData){
    let yesPerGroup = [];
    for(let i = 0; i < inData.length; i++){
        let group = inData[i];
        let peopleCount = inData[i].split("\r\n").length; // # of lines (people)
        group = group.split("\r\n").join(""); // make into one string

        // Now create a hash table for the count of each character
        let charCount = new Map();
        for(let j = 0; j < group.length; j++){
            let c = group.charAt(j);
            if(charCount.has(c)){
                let newCount = charCount.get(c) + 1;
                charCount.set(c, newCount);
            }else{
                charCount.set(c, 1);
            }
        }

        // if the count of the character equals the number of people, 
        // then all the people must have said yes to that character/question
        let charAllYes = 0;
        for(let entry of charCount.keys()){
            if(charCount.get(entry) === peopleCount){
                charAllYes++;
            }
        }

        yesPerGroup.push(charAllYes);
    }

    return yesPerGroup.reduce( (accumulator, currentValue) => accumulator + currentValue );
}

// part 1
function getSumOfYes(inData){
    let yesPerGroup = [];
    for(let i = 0; i < inData.length; i++){
        let group = inData[i];
        group = group.split("\r\n").join(""); // just make to 1 string

        let uniqueChars = new Set();
        for(let j = 0; j < group.length; j++){
            uniqueChars.add(group.charAt(j)); // keep record of all the unique chars to get yes's 
        }
        yesPerGroup.push(uniqueChars.size);
    }

    return yesPerGroup.reduce( (accumulator, currentValue) => accumulator + currentValue );
}

function parseInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n\r\n");
    return inData;
}

{
    let data = parseInput("6/\input_1.txt");
    let count = getSumOfYes(data);
    console.log(count);
}
{
    let data = parseInput("6/\input_2.txt");
    let count = getSumOfYes(data);
    console.log(count);
}
{
    let data = parseInput("6/\input_1.txt");
    let count = getIntersectionOfYes(data);
    console.log(count);
}
{
    let data = parseInput("6/\input_2.txt");
    let count = getIntersectionOfYes(data);
    console.log(count);
}