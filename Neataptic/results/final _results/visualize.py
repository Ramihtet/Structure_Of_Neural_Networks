from networkx.readwrite import nx_yaml
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_excel ('./new_Results.xlsx', header = None)
av_centrality = data.iloc[1:,15]
av_degree = data.iloc[1:,16]
Accuracy = data.iloc[1:,13]

undirected = 'Undirected Graphs' 
directed = 'Directed Graphs'
x = av_degree
y = av_centrality
e = Accuracy

plt.scatter(x, y, c = e, s = 150, marker = 's', cmap = 'Blues')
plt.grid()
plt.xlabel('av_degree')
plt.ylabel('av_centrality')
plt.title(directed)
plt.colorbar()
plt.show()