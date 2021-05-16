
def Adj2List(file):
    edges = []
    file = open(file,"r")
    lines = file.readlines()
    for line in lines:
        double = line.split(':')
        if( double != ['\n'] ):
            double[1].replace('\n','')
            for number in double[1].split( ):
                if (int(double[0]) < int(number)):
                    edge = (int(double[0]) , int(number))
                else:
                    edge = (int(number), int(double[0]) )

                edges.append(edge)

    edges = list(set(edges))
    # print(len(edges))
    edges = [list(e) for e in edges]
    edges = [[e[0]-1,e[1]-1] for e in edges]


    return edges

print(Adj2List(r'C:\Users\user\Desktop\299B\code\Neataptic\relational\graph_31106.txt'))

