import networkx as nx

given_graph = [(1,2),(2,3)]
rounds = 1
edges = []

for j in rounds:
    layer = []
    for edge in given_graph:
        layer.append(edge)
        layer.append((edge[1],edge[0]))
    edges.append(layer)