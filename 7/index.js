const fs = require("fs");

class TreeNode {
    constructor(inName){
        this.name = inName;

        this.children = [];
        this.childrenWeights = [];
    }

    setChildNode(node, value){
        this.children.push(node);
        this.childrenWeights.push(value);
    }

    getChildWeightSum(){
        let sum = 0;
        this.childrenWeights.forEach(element => sum += element);
        return sum;
    }
}

function getDepth(node){
    if(node.children.length === 0){
        return node.getChildWeightSum();
    }else{
        let accumulator = 0;
        for(let i = 0; i < node.children.length; i++){
            accumulator += 
                node.childrenWeights[i] + (node.childrenWeights[i] * getDepth(node.children[i]))
            ;
        }
        return accumulator;
    }
}

function constructSearchTree(data, color){
    let parent = new TreeNode(color);

    let queue = [parent];
    while(queue.length !== 0){
        let curNode = queue.shift();
        let rawChildren = data.get(curNode.name);
        for(let child of rawChildren){
            let childNode = new TreeNode(child[0]);
            curNode.setChildNode(childNode, child[1]);
            queue.push(childNode);
        }
    }
    return parent;
}


function atleastOne(data, color){
    let searchFor = new Set();

    let prevSize = 0;
    searchFor.add(color);
    while(prevSize !== searchFor.size){
        prevSize = searchFor.size;
        for(let setEle of searchFor){
            for(let mappingKey of data.keys()){
                if(data.get(mappingKey).includes(setEle)){
                    searchFor.add(mappingKey);
                }
            }
        }
    }

    return searchFor.size - 1; // minus itself - when we added it at line 7
}

function parseInput(data){
    // all variable additions with suffix of 2 is part of the hack for pt 2, to add quantity

    let hm = new Map();
    let hm2 = new Map(); 

    data.forEach(element => {
        let [left, right] = element.split(" contain "); // js lets me do this, right??
        let bagType = left.split(" ");
        bagType = bagType[0] + bagType[1]; // left side key

        let capacity = []; // right side values 
        let capacity2 = [];
        if(!right.includes("no ")){
            // start right side parsing
            right = right.split(", ");
            right.forEach(input => {
                let eachBagParsed = input.split(" ");
                let quantity = parseInt(eachBagParsed[0]);
                let inputBagType = eachBagParsed[1] + eachBagParsed[2];

                capacity.push(inputBagType); // may need to add the quantity as well in the future? (yes we do for pt 2 lol)
                capacity2.push([inputBagType, quantity]); 
            });
        }

        hm.set(bagType, capacity);
        hm2.set(bagType, capacity2);
    });

    return [hm, hm2];
}

function pullInput(inFile){
    let inData = fs.readFileSync(inFile, "utf-8");
    inData = inData.split("\r\n");
    return inData;
}

// Part 1
{
    let data = pullInput("7/\input_1.txt");
    let mapping = parseInput(data);
    let count = atleastOne(mapping[0], "shinygold");
    console.log(count);
}
{
    let data = pullInput("7/\input_2.txt");
    let mapping = parseInput(data);
    let count = atleastOne(mapping[0], "shinygold");
    console.log(count);
}

// Part 2
{
    let data = pullInput("7/\input_1.txt");
    let mapping = parseInput(data);
    let parent = constructSearchTree(mapping[1], "shinygold");
    let count = getDepth(parent);
    console.log(count);
}
{
    let data = pullInput("7/\input_3.txt");
    let mapping = parseInput(data);
    let parent = constructSearchTree(mapping[1], "shinygold");
    let count = getDepth(parent);
    console.log(count);
}
{
    let data = pullInput("7/\input_2.txt");
    let mapping = parseInput(data);
    let parent = constructSearchTree(mapping[1], "shinygold");
    let count = getDepth(parent);
    console.log(count);
}