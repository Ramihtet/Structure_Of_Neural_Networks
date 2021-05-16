import ws_flex as gen
import random
from tqdm import tqdm
import networkx as nx
import pandas as pd

nodes = 64

node_lst = []
edge_lst = []
av_short = []
rows = []



for i in tqdm(range(20000)):
    p = random.uniform(0.1, 1)
    k = random.randint(5, 63)
    seed = random.randint(1, 375727574089587287)
    g = gen.connected_ws_graph(nodes,k,p,seed=seed)
    g = g.to_directed()



    cluster, path = gen.compute_stats(g)
    if float(path) > 2.2:
        # for node in g.nodes:
        #     for other_node in g.nodes:
        #         if node != other_node:
        #             print('nx.shortest_path_length(g,source=node,target=other_node): ', nx.shortest_path_length(g,source=node,target=other_node))

        #             if nx.shortest_path_length(g,source=node,target=other_node) == 2:
        #                 g.add_edge(node,other_node)

        node_lst.append(list(g.nodes))
        edge_lst.append(g.edges)

        # av_short.append(nx.average_shortest_path_length(g))
        # path = nx.average_shortest_path_length(g)
        # cluster = nx.average_clustering(g)
        

        edg = [] 
        edg.append([[edge[0],edge[1]] for edge in g.edges])
        rows.append([list(g.nodes),edg[0],path,cluster,len(g.edges)])

    # print(len(g.edges),nx.average_shortest_path_length(g))


new_edge = []
for e in edge_lst:
    new_edge.append([[edge[0],edge[1]] for edge in e])


df1 = pd.DataFrame(rows,
                   columns=['nodes', 'edge_lst' ,'av_shortest_path','av_cluster','# of edges'])
df1.to_excel(r"C:\Users\user\Desktop\299B\code\Neataptic\relational\output.xlsx")  
