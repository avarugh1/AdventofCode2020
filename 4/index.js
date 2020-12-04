const fs = require("fs");

function rangeCheck(inNum, min, max){
    inNum = parseInt(inNum);
    return (
        (inNum >= min) &&
        (inNum <= max)
    );
}

function IsNumeric(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
}

function validHeight(height){
    if((height.length >= 4) && (height.length <= 5)){
        let system = height.slice(-2);
        if(system === "cm"){
            height = height.substring(0,3);
            return (IsNumeric(height) && rangeCheck(height, 150, 193));
        }else if(system === "in"){
            height = height.substring(0,2);
            return (IsNumeric(height) && rangeCheck(height, 59, 76));
        }
    }
    return false;
}

function validHairColor(fieldValue){
    let valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    if(fieldValue.length !== 7){
        return false;
    }
    if(fieldValue.charAt(0) !== "#"){
        return false;
    }

    for(let i = 1; i < fieldValue.length; i++){
        let c = fieldValue.charAt(i);
        if(!valid.includes(c)){
            return false;
        }
    }
    return true;
}

function hasValidIntegers(fieldValue){
    let valid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for(let i = 0; i < fieldValue.length; i++){
        let c = fieldValue.charAt(i);
        if(!valid.includes(c)){
            return false;
        }
    }
    return true;
}

// Part 2
function validate(fieldName, fieldValue){
    let isValid = false;
    switch(fieldName){
        case "byr":
            if(IsNumeric(fieldValue) && rangeCheck(fieldValue, 1920, 2002)){
                isValid = true;
            }
            break;
        case "iyr":
            if(IsNumeric(fieldValue) && rangeCheck(fieldValue, 2010, 2020)){
                isValid = true;
            }
            break;
        case "eyr":
            if(IsNumeric(fieldValue) && rangeCheck(fieldValue, 2020, 2030)){
                isValid = true;
            }
            break;
        case "hgt":
            if(validHeight(fieldValue)){
                isValid = true;
            }
            break;
        case "hcl":
            if(validHairColor(fieldValue)){
                isValid = true;
            }
            break;
        case "ecl":
            let validEyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
            if(validEyes.includes(fieldValue)){
                isValid = true;
            }
            break;
        case "pid":
            if((fieldValue.length === 9) && (hasValidIntegers(fieldValue))){
                isValid = true;
            }
            break;

    }

    return isValid;
}

function countValidPassports(inData){
    let valid = 0;
    let required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    for(let i = 0;i < inData.length;i++){
        // first make individual passport arrays
        let individual = inData[i].split("\r\n").join(" ").split(" ");
        if(individual.length < 7){
            continue;
        }

        // now make lookup table for that individual's fields
        let m = new Map();
        for(let j = 0; j < individual.length; j++){
            let field = individual[j].split(":");
            m.set(field[0], field[1]);
        }

        // validate all required fields are there in the table with valid values
        let isValid = true;
        for(let j = 0; j < required.length; j++){
            if(m.has(required[j]) && validate(required[j], m.get(required[j]))){
                
            }else{
                isValid = false;
            }
        }

        // if all fields are there, mark the individual as valid
        if(isValid){
            valid++;
        }
    }
    return valid;
}

function parseInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n\r\n");
    return inData;
}

{
    let data = parseInput("4/\input_1.txt");
    let count = countValidPassports(data);
    console.log(count);
}
{
    let data = parseInput("4/\input_2.txt");
    let count = countValidPassports(data);
    console.log(count);
}
{
    let data = parseInput("4/\invalid_1.txt");
    let count = countValidPassports(data);
    console.log(count); // 0
}
{
    let data = parseInput("4/\/valid_1.txt");
    let count = countValidPassports(data);
    console.log(count); // 4
}