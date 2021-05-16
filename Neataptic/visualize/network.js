var n = require("neataptic");

var network = architect.Perceptron(1, 2, 2, 1);
console.log(network)
var fs = require('fs');



var model = network.toJSON()
var d = JSON.stringify(model);
// write JSON string to a file
fs.writeFile('C:/Users/user/Desktop/299B/code/Neataptic/visualize/network.json', d, (err) => {
    if (err) {
        throw err;
    }
});