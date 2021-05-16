const fs = require('fs')
var NodeXls = require('node-xls');
var n = require("neataptic");

const graph = require('./graph.js')
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');



var datas = []


var rate = 0.01;
var momentum = 0.6;
var batchsize = 10;
var rate_policy = 20;
var dropout = 0.3;
var activ_name = "TANH";
var Activation = n.methods.activation.TANH;
var iterations = 50;
var tests = 1;
var input_connections = 50;
var output_connections = 50;



////////////////////////////////////////////////////////////////////////////////////////////
// Functions

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
    }
    return a
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
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }
function arrayAlreadyHasArray(arr, subarr){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}

////////////////////////////////////////////////////////////////////////////////////////////
// Load Data
var dataFileBuffer  = fs.readFileSync(__dirname + '\/train-images-idx3-ubyte');
var labelFileBuffer = fs.readFileSync(__dirname + '\/train-labels-idx1-ubyte');
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



///////////////////////////////////////////////////////////////////////////////
//Neural Network construct



// Construct a network
var accuracies = 0;
for (let index = 0; index < tests; index++) {



    var nodess = []
    var nodess_nio = []


    var input_layer = [];
    var output_layer = [];



    for (let i = 0; i < nodes.length; i++) {
        var A = new n.Node();
        A.squash = Activation;
        nodess.push(A);
        nodess_nio.push(A);
    }


    for (let i = 0; i < edges.length; i++) {
        nodess[edges[i][0]].connect(nodess[edges[i][1]]);
    }
    var input_layer = []
    for (var i = 0; i < 784; i++) {
        var A = new n.Node();
        A.squash = Activation;
        input_layer.push(A);
        nodess.push(A);

    }


    var output_layer = []
    for (var i = 0; i < 10; i++) {
        var A = new n.Node();
        A.squash = Activation;
        output_layer.push(A);
        nodess.push(A);
    }
    //layer input cnx
    for (var i = 0; i < input_layer.length; i++) {
        for (var j = 0; j <input_connections; j++){
            input_layer[i].connect(nodess_nio[j]);

        } 
    }
    // //layer output cnx
    for (var i = 0; i < output_layer.length; i++) {
        for (var j = 0; j <output_connections; j++){
            // nodes.reverse()
            // var n = nodes[j]
            nodess_nio[j].connect(output_layer[i]);

        } 
    }
    


    var network = n.architect.Construct(nodess);

















    // var network = n.architect.Construct(nodess);



    /////////////////////////////////////////////////////////////////
    //Training

    var errors = 0
    for (let i = 0; i < 1000; i++) {
        if (g(Dataset[9000+i]["output"]) != g(softmax(network.activate(Dataset[9000+i]["input"])))) {
            errors =errors + 1
        }
    }

    console.log('accurracy: {0}'.format((1 - (errors/1000))*100   ))




    var trainingSet = Dataset.slice(0,10000)
    network.train(trainingSet, {
        log: 10,
        momentum:momentum,
        shuffle: 1,
        batchSize: batchsize,
        cost: n.methods.cost.CROSS_ENTROPY,
        ratePolicy: n.methods.rate.STEP(0.8, rate_policy),
        error: 0.01,
        iterations: iterations,
        rate: rate,
        dropout: dropout
    });








    var errors = 0
    for (let i = 0; i < 1000; i++) {
        if (g(Dataset[10000+i]["output"]) != g(softmax(network.activate(Dataset[10000+i]["input"])))) {
            errors =errors + 1
        }
    }

    var acc = (1 - (errors/1000))*100 
    console.log('accurracy: {0}'.format((1 - (errors/1000))*100   ))
    accuracies = accuracies + acc

};
// // SAVE
// var model = network.toJSON()
// var d = JSON.stringify(model);

// // write JSON string to a file
// fs.writeFile('./baseline_20_20.json', d, (err) => {
//     if (err) {
//         throw err;
//     }
// });



//LOAD
// var json = require('./model.json');
// var nn = n.Network.fromJSON(json)
// console.log(nn.connections)

////////////////////////////////////////////////
//save results


var data = {
    ID : (makeid(3)).toString(),
    Rate: rate,
    Momentum: momentum,
    Batchsize: batchsize,
    Rate_policy: rate_policy,
    Dropout:dropout ,
    Activation:activ_name ,    
    Accuracy: accuracies/tests,




};
// datas.push(data)
// var tool = new NodeXls();
// // columns will be ordered by ["stux", "foo", "boom"]; column "boom" will be named "hello"
// var xls = tool.json2xls(datas, {order:["ID","Rate","Momentum","Batchsize","Rate_policy" ,"Dropout","Activation","Accuracy"]}); 
// fs.writeFileSync('output.xlsx',xls, 'binary');



