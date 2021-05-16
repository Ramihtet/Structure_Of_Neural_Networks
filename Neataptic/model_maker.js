const fs = require('fs')
var NodeXls = require('node-xls');
var n = require("neataptic");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

var datas = []
for (let r = 0; r < 1; r++) {

    var rate = 0.01;
    var momentum = 0.6;
    var batchsize = 10;
    var rate_policy = 20;
    var dropout = 0.3;
    var activ_name = "TANH";
    var Activation = n.methods.activation.TANH;
    var iterations = 50;
    var tests = 1;
    var starting_model = 0+r*tests; // Must change everytime

    ////////////////////////////////////////////////////////////////////////////////////////////
    // Load Data


    var dataFileBuffer  = fs.readFileSync(__dirname + '\/t10k-images-idx3-ubyte');
    var labelFileBuffer = fs.readFileSync(__dirname + '\/t10k-labels-idx1-ubyte');
    var pixelValues     = [];

    // It would be nice with a checker instead of a hard coded 60000 limit here
    for (var image = 0; image < 10000; image++) { 
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
    var accuracies = 0
    var best_acc = 0
    var best_model = 0 
    var best_m_number = 0 


    for (let index = 0; index < tests; index++) {

        // var network = n.architect.Perceptron(784,60,14,10);
        var nodes = []

        var layer1 = []
        for (var i = 0; i < 784; i++) {
            var A = new n.Node();
            A.squash = Activation;
            layer1.push(A);
            nodes.push(A);
        }

        var layer2 = []
        for (var i = 0; i < 60; i++) {
            var A = new n.Node();
            A.squash = Activation;
            layer2.push(A);
            nodes.push(A);
        }

        var layer3 = []
        for (var i = 0; i < 14; i++) {
            var A = new n.Node();
            A.squash = Activation;
            layer3.push(A);
            nodes.push(A);

        }

        var layer4 = []
        for (var i = 0; i < 10; i++) {
            var A = new n.Node();
            A.squash = Activation;
            layer4.push(A);
            nodes.push(A);

        }



        //layer 1 > 2 cnx
        for (var i = 0; i < 784; i++) {
            for (var j = 0; j < 60; j++){
                layer1[i].connect(layer2[j]);

            } 
        }

        // //layer 1 > 3 cnx
        // for (var i = 0; i < 784; i++) {
        //     for (var j = 0; j < 14; j++){
        //         layer1[i].connect(layer3[j]);

        //     } 
        // }

        //layer 2 > 3 cnx
        for (var i = 0; i < 60; i++) {
            for (var j = 0; j < 14; j++){
                layer2[i].connect(layer3[j]);

            } 
        }

        //layer 3 > 4 cnx
        for (var i = 0; i < 14; i++) {
            for (var j = 0; j < 10; j++){
                layer3[i].connect(layer4[j]);

            } 
        }
        var network = n.architect.Construct(nodes);



        /////////////////////////////////////////////////////////////////
        //Training
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
            String.prototype.format = function() {
                a = this;
                for (k in arguments) {
                a = a.replace("{" + k + "}", arguments[k])
                }
                return a
            }



        var errors = 0
        for (let i = 0; i < 1000; i++) {
            if (g(Dataset[9000+i]["output"]) != g(softmax(network.activate(Dataset[9000+i]["input"])))) {
                errors =errors + 1
            }
            // console.log('expected {0} results {1} '.format(g(Dataset[9900+i]["output"]),g(softmax(network.activate(Dataset[9900+i]["input"])))  ) )

        }

        console.log('accurracy: {0}'.format((1 - (errors/1000))*100   ))




        var trainingSet = Dataset.slice(0,9000)
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
            if (g(Dataset[9000+i]["output"]) != g(softmax(network.activate(Dataset[9000+i]["input"])))) {
                errors =errors + 1
            }
            // console.log('expected {0} results {1} '.format(g(Dataset[9900+i]["output"]),g(softmax(network.activate(Dataset[9900+i]["input"])))  ) )

        }

        var acc = (1 - (errors/1000))*100 
        console.log('accurracy: {0}'.format((1 - (errors/1000))*100   ))
        accuracies += acc ; 
        // console.log(network.connections)
        if (best_acc < acc) {
            best_acc = acc;
            best_m_number = index;
            best_model = network;
        }






    };
    // SAVE
    var model = best_model.toJSON()
    var d = JSON.stringify(model);

    // write JSON string to a file
    fs.writeFile('./models/model'+best_m_number.toString()+"_"+starting_model.toString()+'.json', d, (err) => {
        if (err) {
            throw err;
        }
    });



    //LOAD
    // var json = require('./model.json');
    // var nn = n.Network.fromJSON(json)
    // console.log(nn.connections)

    ////////////////////////////////////////////////
    //save results

    var data = {
        ID : best_m_number.toString()+"_"+starting_model.toString(),
        Rate: rate,
        Momentum: momentum,
        Batchsize: batchsize,
        Rate_policy: rate_policy,
        Dropout:dropout ,
        Activation:activ_name ,    
        Tests : tests,
        Best_Accuracy: best_acc,
        Av_Accuracy: accuracies/tests,



    };
    datas.push(data)

};

var tool = new NodeXls();
// columns will be ordered by ["stux", "foo", "boom"]; column "boom" will be named "hello"
var xls = tool.json2xls(datas, {order:["ID","Rate","Momentum","Batchsize","Rate_policy" ,"Dropout","Activation","Tests","Best_Accuracy","Av_Accuracy"]}); 
fs.writeFileSync('output.xlsx',xls, 'binary');