from networkx.algorithms import centrality
import pandas as pd
import networkx as nx

data = pd.read_excel(".\Results_Relational_undirected.xlsx")
data = data.iloc[:,:14]

all_edges = []
for edges in range(1):
    edgess = []
    edges = "0,1,0,2,0,3,0,4,0,60,0,61,0,62,0,63,1,2,1,4,1,5,1,61,1,62,1,63,1,49,1,24,2,3,2,4,2,5,2,6,2,62,2,63,3,4,3,5,3,6,3,7,3,63,4,5,4,6,4,7,4,8,5,6,5,7,5,8,5,9,5,36,6,7,6,8,6,10,6,52,7,8,7,9,7,10,7,11,7,17,7,21,8,9,8,11,8,12,8,45,8,42,9,10,9,11,9,12,9,13,10,11,10,12,10,13,10,14,10,47,11,13,11,14,11,15,11,23,12,13,12,14,12,15,12,16,13,14,13,15,13,16,13,17,13,20,13,55,14,15,14,16,14,17,14,18,15,16,15,18,15,19,15,42,16,17,16,18,16,19,16,20,17,18,17,19,17,20,18,19,18,20,18,21,18,22,18,54,19,20,19,21,19,23,19,42,20,22,20,24,20,25,21,22,21,24,21,25,21,33,22,23,22,24,22,25,22,26,23,25,23,26,23,27,23,60,24,25,24,26,24,28,25,26,25,27,25,28,25,29,25,47,26,27,26,28,26,29,26,30,27,28,27,29,27,30,27,31,28,29,28,30,28,31,28,50,29,30,29,32,29,33,29,54,30,31,30,32,30,33,30,34,31,32,31,33,31,34,31,35,32,33,32,34,32,35,32,36,33,34,33,35,33,36,34,35,34,36,34,37,34,38,34,58,35,36,35,37,35,38,35,44,36,37,36,40,36,50,37,40,37,41,37,44,37,60,38,40,38,41,38,42,38,63,39,40,39,41,39,42,39,43,40,41,40,42,40,43,40,44,41,42,41,43,41,44,41,45,42,43,42,45,42,58,43,44,43,45,43,46,43,47,44,45,44,46,44,47,44,48,45,46,45,47,45,48,45,49,46,47,46,48,46,49,46,50,47,48,47,49,48,49,48,50,48,51,48,52,49,50,49,51,49,52,49,53,50,51,50,52,50,53,50,54,51,52,51,53,51,54,51,55,52,53,52,54,52,55,52,56,53,54,53,55,53,56,53,57,54,55,54,56,54,57,55,56,55,57,55,59,56,57,56,58,56,59,56,60,57,58,57,59,57,60,57,61,58,59,58,60,58,61,59,60,59,61,59,62,59,63,60,61,60,62,60,63,61,62,61,63,62,63"
    edges = list(map(int,edges.split(",")))
    i = 0
    edge = []
    for node_n in edges:
        i += 1
        edge.append(node_n)
        if i == 2:
            i = 0
            edge.sort()
            if edge not in edgess:
                # print(edge)
                edgess.append(tuple(edge))
            edge = []
    all_edges.append(edgess)

centralities = []
degrees = []
for edge_list in all_edges:
    g = nx.DiGraph()
    g.add_edges_from(edge_list)
    
    av_degree = 0
    for degree in g.degree:
        av_degree += degree[1]
    av_degree = av_degree / 64


    av_centrality = 0
    for c in nx.algorithms.centrality.load_centrality(g).values():
        av_centrality += c
    av_centrality = av_centrality / 64

    centralities.append(av_centrality)
    degrees.append(av_degree)


    # d = g.to_directed()
    # nx.algorithms.find_cycle(g)
    # print('nx.algorithms.find_cycle(d): ', nx.algorithms.find_cycle(g))

ee = [list(e) for e in g.edges]
print(ee)
# data["av_centrality"] = centralities
# data["av_degree"] = degrees

# data.to_excel("./new_Results.xlsx")
