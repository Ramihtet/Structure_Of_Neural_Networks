import networkx as nx
import random
import matplotlib.pyplot as plt
import pandas as pd


nodes = 60

node_lst = []
edge_lst = []
av_short = []
rows = []



for i in range(100):
    g = nx.DiGraph()
    prob = random.randint(30,100)
    #add edges from 1 to 50
    for i in range(0,nodes-1):
        if random.randint(0,100) <= 100:
            g.add_edge(i, i+1)


    # #add edges randomly
    for i in range(0,nodes-1):
        for j in range(i+1,nodes):
            if random.randint(0,100) < prob:
                g.add_edge(i, j)

    node_lst.append(list(g.nodes))
    edge_lst.append(g.edges)
    av_short.append(nx.average_shortest_path_length(g))
    edg = [] 
    edg.append([[edge[0],edge[1]] for edge in g.edges])
    rows.append([list(g.nodes),edg[0],nx.average_shortest_path_length(g),nx.algorithms.cluster.average_clustering(g),len(g.edges)])

    # print(len(g.edges),nx.average_shortest_path_length(g))


new_edge = []
for e in edge_lst:
    new_edge.append([[edge[0],edge[1]] for edge in e])

# print(new_edge)
# print(node_lst)



df1 = pd.DataFrame(rows,
                   columns=['nodes', 'edge_lst' ,'av_shortest_path','av_cluster','# of edges'])
df1.to_excel(r"C:\Users\user\Desktop\299B\code\Neataptic\random\output.xlsx")  

# f = open(r"C:\Users\user\Desktop\299B\code\Neataptic\random\graph.js","w")
# f.write("edges = {}".format(new_edge[0]))
# f.write("\n")
# f.write("nodes = {}".format(node_lst[0]) ) 
# f.write("\n")

# f.write("module.exports = {edges};")
# f.write("module.exports = {nodes};")