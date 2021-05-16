import json
import networkx as nx
import matplotlib.pyplot as plt



net = "baseline_20_20"
with open('C:/Users/user/Desktop/299B/code/Neataptic/visualize/'+net+'.json') as f:
  data = json.load(f)

G = nx.DiGraph()
edges = data["connections"]
for edge in edges:
    G.add_edge(edge["from"], edge["to"])


print("Connected : {}".format(nx.is_connected(nx.to_undirected(G))))
in_Deg = G.in_degree()
out_Deg = G.out_degree()

inputs = 0
outputs = 0
for node in in_Deg:
    if node[1] == 0: # if node doesnt have any incomming edges or an input
        inputs+=1

for node in out_Deg:
    if node[1] == 0: # if node doesnt have any incomming edges or an input
        outputs+=1
        
print("We have {} inputs.".format(inputs))
print("We have {} outputs.".format(outputs))

