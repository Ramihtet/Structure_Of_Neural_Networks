import networkx as nx
from random import randint

from networkx.algorithms.dag import topological_sort

def random_dag(nodes, edges):
    """Generate a random Directed Acyclic Graph (DAG) with a given number of nodes and edges."""
    G = nx.DiGraph()
    for i in range(nodes):
        G.add_node(i)
    while edges > 0:
        a = randint(0,nodes-1)
        b=a
        while b==a:
            b = randint(0,nodes-1)
        G.add_edge(a,b)
        if nx.is_directed_acyclic_graph(G):
            edges -= 1
        else:
            # we closed a loop!
            G.remove_edge(a,b)
    return G

g = random_dag(50,500)

print(g.edges)
print(list(nx.topological_sort(g)))
print("edge # : {}".format(len(nx.edges(g))))
print("node #  : {}".format(len(nx.nodes(g))))
print("average_clustering : {}".format(nx.algorithms.cluster.average_clustering(g)))
print("average_shortest_path_length : {}".format(nx.average_shortest_path_length(g)))
print("average_degree_connectivity : {}".format(nx.average_degree_connectivity(g)))
print("average_node_connectivity : {}".format(nx.average_node_connectivity(g)))
print("algebraic_connectivity : {}".format(nx.algebraic_connectivity(nx.to_undirected(g))))
print("Connected : {}".format(nx.is_connected(nx.to_undirected(g))))


f = open(r"C:\Users\user\Desktop\299B\code\Neataptic\random\graph.js","w")
edges = [[edge[0],edge[1]] for edge in g.edges]
f.write("edges = {}".format(edges))
f.write("\n")
f.write("nodes = {}".format(list(nx.topological_sort(g))))
f.write("\n")

f.write("module.exports = {edges};")
f.write("module.exports = {nodes};")


#### Characteristics ####

# average_clustering = clustering coefficient is a measure of the degree to which nodes in a graph tend to cluster together. 
# average_shortest_path_length = the average shortest path length.
# average_degree_connectivity = The average degree connectivity is the average nearest neighbor degree of nodes with degree k.
# average_node_connectivity = The average connectivity bar{kappa} of a graph G is the average of local node connectivity over all pairs of nodes of G 
# algebraic_connectivity = The algebraic connectivity of a connected undirected graph is the second smallest eigenvalue of its Laplacian matrix.

