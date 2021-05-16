   
    
    //Nodes
    var nodes = []
    var number_of_paths = 40
    var nodes_in_path = 40

    var input = []
    for (var i = 0; i < 784; i++) {
        var A = new n.Node();
        A.squash = Activation;
        input.push(A);
        nodes.push(A);
    }
    var output = []
    for (var i = 0; i < 10; i++) {
        var A = new n.Node();
        A.squash = Activation;
        output.push(A);
        nodes.push(A);
    }

    var k = 'path';
    var name;
    for(name = 0; name < number_of_paths; name++) { //number of paths
        eval('var ' + k + name + '= [];');
        for (var i = 0; i < nodes_in_path; i++) {
            var A = new n.Node();
            A.squash = Activation;
            eval(k + name + '.push(A)' +  ';');
            nodes.push(A);
        }

    }
    ///Connections



    //inpt>graph
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < number_of_paths; j++){ //number of paths
            eval('input['+i+'].connect(path'+j+'[0]);');
        }
    }
    //graph>output
    for (var i = 0; i < output.length; i++) {
        for (var j = 0; j < number_of_paths; j++){ //number of paths
            eval('path'+j+'[9].connect(output['+i+']);');
        }
    }

    //hidden layer connections

    //paths connections vertical
    for (var i = 0; i < number_of_paths; i++) {
        for (var j = 0; j < nodes_in_path-1; j++) {
            jj = j+1
            eval('path'+i+'['+j+'].connect(path'+i+'['+jj+']);'.format(i,j));


        }
    }
    var hor_cnx = []
    //paths connections horizonatal
    for (var i = 0; i < number_of_paths; i++) {
        for (var j = 0; j < nodes_in_path; j++) {
            for (let dddd = 0; dddd < getRandomInt(0,9); dddd++) {
                var from_path = i
                var from_node = j
                var to_path = getRandomInt(0,9)
                while (to_path == from_path) {
                    var to_path = getRandomInt(0,9)
                }
                var to_node = j
                if (arrayAlreadyHasArray(hor_cnx,[from_path,from_node,to_path,to_node]) || arrayAlreadyHasArray(hor_cnx,[to_path,to_node,from_path,from_node])) {
                    hor_cnx.push([from_path,from_node,to_path,to_node])       
                }
            }
        }
    }
    for (var i = 0; i < hor_cnx; i++) {
        var edge = hor_cnx[i]
        eval('path'+edge[0]+'['+edge[1]+'].connect(path'+edge[2]+'['+edge[3]+']);');

    }