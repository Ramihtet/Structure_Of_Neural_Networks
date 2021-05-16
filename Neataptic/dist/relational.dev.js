"use strict";

var fs = require('fs');

var NodeXls = require('node-xls');

var n = require("neataptic"); // const {gs} = require('./graphs.js'); 


var _require = require('constants'),
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG = _require.SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

var datas = [];
var graphs = [(1, 2), (2, 3)];

for (var r = 0; r < graphs.length; r++) {
  var encode = function encode(number) {
    var encoded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    encoded[number] = 1;
    return encoded;
  };

  // SAVE
  // var model = best_model.toJSON()
  // var d = JSON.stringify(model);
  // write JSON string to a file
  // fs.writeFile('./models/model'+best_m_number.toString()+"_"+starting_model.toString()+'.json', d, (err) => {
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
  var makeid = function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  console.log(r);
  var graph = graphs[r];
  var rate = 0.01;
  var momentum = 0.6;
  var batchsize = 10;
  var rate_policy = 20;
  var dropout = 0.3;
  var activ_name = "TANH";
  var Activation = n.methods.activation.TANH;
  var iterations = 50;
  var tests = 1;
  var starting_model = 0 + r * tests; // Must change everytime

  var hidden = 5;
  var rounds = 1; ////////////////////////////////////////////////////////////////////////////////////////////
  // Load Data

  var dataFileBuffer = fs.readFileSync(__dirname + '\/t10k-images-idx3-ubyte');
  var labelFileBuffer = fs.readFileSync(__dirname + '\/t10k-labels-idx1-ubyte');
  var pixelValues = []; // It would be nice with a checker instead of a hard coded 60000 limit here

  for (var image = 0; image < 10000; image++) {
    var pixels = [];

    for (var x = 0; x <= 27; x++) {
      for (var y = 0; y <= 27; y++) {
        pixels.push(dataFileBuffer[image * 28 * 28 + (x + y * 28) + 15] / 255);
      }
    }

    var imageData = {};
    imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;
    pixelValues.push(imageData);
  } ////////////////////////////////////////////////////////////////////////////////////////////
  //Preprocess


  var Dataset = [];
  var testIVs = [['0'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9']];
  ;

  String.prototype.format = function () {
    a = this;

    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k]);
    }

    return a;
  };

  for (entry in pixelValues) {
    if (Object.keys(pixelValues[entry])[0] != undefined) {
      var image = {};
      image["input"] = Object.values(pixelValues[entry])[0];
      image["output"] = encode(Object.keys(pixelValues[entry])[0]);
      Dataset.push(image);
    }
  } ///////////////////////////////////////////////////////////////////////////////
  //Neural Network construct
  // Construct a network


  var accuracies = 0;

  for (var index = 0; index < tests; index++) {
    /////////////////////////////////////////////////////////////////
    //Training
    var softmax = function softmax(arr) {
      return arr.map(function (value, index) {
        return Math.exp(value) / arr.map(function (y
        /*value*/
        ) {
          return Math.exp(y);
        }).reduce(function (a, b) {
          return a + b;
        });
      });
    };

    var g = function g(array) {
      var greatest;
      var indexOfGreatest;

      for (var i = 0; i < array.length; i++) {
        if (!greatest || array[i] > greatest) {
          greatest = array[i];
          indexOfGreatest = i;
        }
      }

      return indexOfGreatest;
    };

    // var network = n.architect.Perceptron(784,60,14,10);
    var nodes = [];
    var layer0 = [];

    for (var i = 0; i < 784; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer0.push(A);
      nodes.push(A);
    }

    var k = 'layer';
    var name;

    for (name = 1; name < rounds + 1; name++) {
      eval('var ' + k + name + '= ' + "[]" + ';');

      for (var i = 0; i < hidden; i++) {
        var A = new n.Node();
        A.squash = Activation;
        eval(k + name + '.push(A)' + ';');
        nodes.push(A);
      }
    }

    var layer2 = [];

    for (var i = 0; i < 784; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer2.push(A);
      nodes.push(A);
    }

    console.log("input {0} hidden {1} output{2}".format(layer0.length, layer1.length, layer2.length));
    var k = 'layer';
    var name;

    for (name = 1; name < rounds + 1; name++) {
      eval('var ' + k + name + '= ' + [] + ';');

      for (var i = 0; i < hidden; i++) {
        var A = new n.Node();
        A.squash = Activation;
        eval(k + name + '.push(A)' + ';');
        nodes.push(A);
      }
    }

    var network = n.architect.Construct(nodes);
    var errors = 0;

    for (var _i = 0; _i < 1000; _i++) {
      if (g(Dataset[9000 + _i]["output"]) != g(softmax(network.activate(Dataset[9000 + _i]["input"])))) {
        errors = errors + 1;
      }
    }

    console.log('accurracy: {0}'.format((1 - errors / 1000) * 100));
    var trainingSet = Dataset.slice(0, 9000);
    network.train(trainingSet, {
      log: 50,
      momentum: momentum,
      shuffle: 1,
      batchSize: batchsize,
      cost: n.methods.cost.CROSS_ENTROPY,
      ratePolicy: n.methods.rate.STEP(0.8, rate_policy),
      error: 0.01,
      iterations: iterations,
      rate: rate,
      dropout: dropout
    });
    var errors = 0;

    for (var _i2 = 0; _i2 < 1000; _i2++) {
      if (g(Dataset[9000 + _i2]["output"]) != g(softmax(network.activate(Dataset[9000 + _i2]["input"])))) {
        errors = errors + 1;
      }
    }

    var acc = (1 - errors / 1000) * 100;
    console.log('accurracy: {0}'.format((1 - errors / 1000) * 100));
    accuracies = accuracies + acc;
  }

  ;
  var data = {
    ID: makeid(3).toString(),
    Rate: rate,
    Momentum: momentum,
    Batchsize: batchsize,
    Rate_policy: rate_policy,
    Dropout: dropout,
    Activation: activ_name,
    Accuracy: accuracies / tests,
    Graph: graph
  };
  datas.push(data);
  var tool = new NodeXls(); // columns will be ordered by ["stux", "foo", "boom"]; column "boom" will be named "hello"

  var xls = tool.json2xls(datas, {
    order: ["ID", "Rate", "Momentum", "Batchsize", "Rate_policy", "Dropout", "Activation", "Accuracy", "Graph"]
  });
  fs.writeFileSync('output.xlsx', xls, 'binary');
}

;