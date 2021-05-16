import json
import networkx as nx
import matplotlib.pyplot as plt



net = "baseline_20_20"
with open('C:/Users/user/Desktop/299B/code/Neataptic/visualize/'+net+'.json') as f:
  data = json.load(f)

G = nx.DiGraph()
edges = data["connections"]
for edge in edges:
    if edge["from"] > 783:
        G.add_edge(edge["from"], edge["to"])


nx.draw(G)    
plt.show()

# pos = nx.spring_layout(G)
# nx.draw(G,pos=pos)
# plt.savefig('C:/Users/user/Desktop/299B/code/Neataptic/visualize/'+net+'.png')


