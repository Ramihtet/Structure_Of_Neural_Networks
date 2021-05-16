"use strict";

var fs = require('fs');

var NodeXls = require('node-xls');

var n = require("neataptic");

var _require = require('./graphs.js'),
    gs = _require.gs;

var _require2 = require('constants'),
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG = _require2.SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

var array = [60, 70, 80, 90];

for (var sss = 0; sss < array.length; sss++) {
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

  var makeid = function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  var getRandomInt = function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  var arrayAlreadyHasArray = function arrayAlreadyHasArray(arr, subarr) {
    for (var i = 0; i < arr.length; i++) {
      var checker = false;

      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === subarr[j]) {
          checker = true;
        } else {
          checker = false;
          break;
        }
      }

      if (checker) {
        return true;
      }
    }

    return false;
  }; ////////////////////////////////////////////////////////////////////////////////////////////
  // Load Data


  var encode = function encode(number) {
    var encoded = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    encoded[number] = 1;
    return encoded;
  };

  var element = array[sss];
  console.log(element);
  var datas = [];
  var rate = 0.01;
  var momentum = 0.6;
  var batchsize = 10;
  var rate_policy = 20;
  var dropout = 0.3;
  var activ_name = "TANH";
  var Activation = n.methods.activation.TANH;
  var iterations = 50;
  var tests = 1; ////////////////////////////////////////////////////////////////////////////////////////////
  // Functions

  String.prototype.format = function () {
    a = this;

    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k]);
    }

    return a;
  };

  var dataFileBuffer = fs.readFileSync(__dirname + '\/train-images-idx3-ubyte');
  var labelFileBuffer = fs.readFileSync(__dirname + '\/train-labels-idx1-ubyte');
  var pixelValues = []; // It would be nice with a checker instead of a hard coded 60000 limit here

  for (var image = 0; image < 50000; image++) {
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
    var nodes = [];
    var layer1 = [];

    for (var i = 0; i < 784; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer1.push(A);
      nodes.push(A);
    }

    var layer2 = [];

    for (var i = 0; i < element; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer2.push(A);
      nodes.push(A);
    }

    var layer3 = [];

    for (var i = 0; i < element; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer3.push(A);
      nodes.push(A);
    } // var layer4 = []
    // for (var i = 0; i < 20; i++) {
    //     var A = new n.Node();
    //     A.squash = Activation;
    //     layer4.push(A);
    //     nodes.push(A);
    // }


    var layer4 = [];

    for (var i = 0; i < 10; i++) {
      var A = new n.Node();
      A.squash = Activation;
      layer4.push(A);
      nodes.push(A);
    } //layer 1 > 2 cnx


    for (var i = 0; i < layer1.length; i++) {
      for (var j = 0; j < layer2.length; j++) {
        layer1[i].connect(layer2[j]);
      }
    } // //layer 1 > 3 cnx


    for (var i = 0; i < layer1.length; i++) {
      for (var j = 0; j < layer3.length; j++) {
        layer1[i].connect(layer3[j]);
      }
    } // // //layer 1 > 4 cnx
    // for (var i = 0; i < layer1.length; i++) {
    //     for (var j = 0; j < layer4.length; j++){
    //         layer1[i].connect(layer4[j]);
    //     } 
    // }
    //layer 2 > 3 cnx


    for (var i = 0; i < layer2.length; i++) {
      for (var j = 0; j < layer3.length; j++) {
        layer2[i].connect(layer3[j]);
      }
    } //layer 3 > 4 cnx


    for (var i = 0; i < layer3.length; i++) {
      for (var j = 0; j < layer4.length; j++) {
        layer3[i].connect(layer4[j]);
      }
    } // //layer 4 > 5 cnx
    // for (var i = 0; i < layer4.length; i++) {
    //     for (var j = 0; j < layer5.length; j++){
    //         layer4[i].connect(layer5[j]);
    //     } 
    // }


    var network = n.architect.Construct(nodes); /////////////////////////////////////////////////////////////////
    //Training

    var errors = 0;

    for (var _i = 0; _i < 1000; _i++) {
      if (g(Dataset[9000 + _i]["output"]) != g(softmax(network.activate(Dataset[9000 + _i]["input"])))) {
        errors = errors + 1;
      }
    }

    console.log('accurracy: {0}'.format((1 - errors / 1000) * 100));
    var trainingSet = Dataset.slice(0, 10000);
    network.train(trainingSet, {
      log: 10,
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

    for (var _i2 = 0; _i2 < 2000; _i2++) {
      if (g(Dataset[10000 + _i2]["output"]) != g(softmax(network.activate(Dataset[10000 + _i2]["input"])))) {
        errors = errors + 1;
      }
    }

    var acc = (1 - errors / 2000) * 100;
    console.log('accurracy: {0}'.format((1 - errors / 2000) * 100));
    accuracies = accuracies + acc;
  }

  ; // // SAVE
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
    ID: makeid(3).toString(),
    Rate: rate,
    Momentum: momentum,
    Batchsize: batchsize,
    Rate_policy: rate_policy,
    Dropout: dropout,
    Activation: activ_name,
    Accuracy: accuracies / tests
  }; // datas.push(data)
  // var tool = new NodeXls();
  // // columns will be ordered by ["stux", "foo", "boom"]; column "boom" will be named "hello"
  // var xls = tool.json2xls(datas, {order:["ID","Rate","Momentum","Batchsize","Rate_policy" ,"Dropout","Activation","Accuracy"]}); 
  // fs.writeFileSync('output.xlsx',xls, 'binary');
}