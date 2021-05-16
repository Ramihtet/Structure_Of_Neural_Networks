var n = require("neataptic");
var json = require('./baseline_25_25.json');
const {i} = require('c:/Users/user/Desktop/299B/code/Neataptic/image.js'); 
var nn = n.Network.fromJSON(json)
const fs = require('fs')


////////////////////////////////////////////////////////////////////////////////////////////
// Load Data


var dataFileBuffer  = fs.readFileSync(__dirname + '\/1-idx3-ubyte');
var labelFileBuffer = fs.readFileSync(__dirname + '\/labels-idx1-ubyte');
var pixelValues     = [];

// It would be nice with a checker instead of a hard coded 60000 limit here
for (var image = 0; image < 50000; image++) { 
    var pixels = [];

    for (var x = 0; x <= 27; x++) {
        for (var y = 0; y <= 27; y++) {
            pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 15]/255);
        }
    }

    var imageData  = {};
    imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;

    pixelValues.push(imageData);
}

////////////////////////////////////////////////////////////////////////////////////////////
//Preprocess

var Dataset = [];
var testIVs = [
    ['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9']
];
function encode(number){
    var encoded = [0,0,0,0,0,0,0,0,0,0];
    encoded[number] = 1;
    return encoded

};

for (entry in pixelValues){
    if (Object.keys(pixelValues[entry])[0] != undefined){
        var image  = {};
        image["input"] = Object.values(pixelValues[entry])[0] ;
        image["output"] = encode(Object.keys(pixelValues[entry])[0]) ;
        Dataset.push(image);
    }
    }




function softmax(arr) {
    return arr.map(function(value,index) { 
        return Math.exp(value) / arr.map( function(y /*value*/){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
    })
    }
function g(array) {
    var greatest;
    var indexOfGreatest;
    for (var i = 0; i < array.length; i++) {
    if (!greatest || array[i] > greatest) {
        greatest = array[i];
        indexOfGreatest = i;
    }
    }
    return indexOfGreatest;
}
var input = Dataset[11].input;
var output = Dataset[11].output;

console.log(g(output))

console.log(g(softmax(nn.activate(input))))


