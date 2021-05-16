from IPython.core.display import display, HTML

display(HTML("<style>.container { width:95% !important; }</style>"))
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import networkx as nx
import multiprocessing as mp
import os
from networkx.utils import py_random_state
import time

sns.set_context("poster")
sns.set_style("ticks")
current_palette = sns.color_palette('muted',n_colors=9)

np.set_printoptions(linewidth=200)


result = np.load('graph_configs/all_n64_final.npy')

# compute sparsity
result[:,1] = result[:,1]/result[:,0]
# filter too sparse graphs
result = result[result[:,1]>=0.125,:]
# shuffle
np.random.seed(1)
id_random = np.random.permutation(result.shape[0])
result_shuffle = result[id_random,:]

print(result_shuffle[0])
print('sparsity', result[:,1].min(), result[:,1].max())
print('clustering', result[:,-2].min(), result[:,-2].max())
print('path', result[:,-1].min(), result[:,-1].max())

bins_clustering = np.linspace(0,1,15*9+1) # clustering
bins_path = np.linspace(1,4.5,15*9+1) # path

digits_clustering = np.digitize(result_shuffle[:,-2],bins_clustering)
digits_path = np.digitize(result_shuffle[:,-1],bins_path)

thresh = 1
filter_1 = []
filter_2 = []
filter_3 = []
counts = np.zeros((len(bins_clustering)+1, len(bins_path)+1))
ids = np.ones((len(bins_clustering)+1, len(bins_path)+1),dtype=int)*-1
for i in range(len(result_shuffle)):
    if counts[digits_clustering[i], digits_path[i]]<thresh:
        ids[digits_clustering[i], digits_path[i]] = i
        counts[digits_clustering[i], digits_path[i]] += 1
        filter_3.append(i)
        if digits_clustering[i]%9==5 and digits_path[i]%9==5:
            filter_1.append(i)
        if digits_clustering[i]%9 in [2,5,8] and digits_path[i]%9 in [2,5,8]:
            filter_2.append(i)

for i in range(len(bins_clustering)+1):
    for j in range(len(bins_path)+1):
        if i%9==5 and j%9==5 and counts[i, j] == 0 and bins_clustering[i]>0.75:
            flag = False
            for m in range(i-1,i+2):
                if flag:
                    break
                for k in range(j-3,j+4):
                    if counts[m,k] != 0:
                        filter_1.append(ids[m,k])
                        filter_2.append(ids[m,k])
                        flag = True
                        break
            continue
        elif i%9 in [2,5,8] and j%9 in [2,5,8] and (not (i%9==5 and j%9==5)) and counts[i, j] == 0 and bins_clustering[i]>0.75:
            flag = False
            for m in range(i,i+1):
                if flag:
                    break
                for k in range(j-1,j+2):
                    if counts[m,k] != 0:
                        filter_2.append(ids[m,k])
                        flag = True
                        break
            
print(len(filter_1))
print(len(filter_2))
print(len(filter_3))

result_plot_1 = result_shuffle[filter_1]
result_plot_2 = result_shuffle[filter_2]
result_plot_3 = result_shuffle[filter_3]

for i in filter_1:
    assert i in filter_2
    assert i in filter_3
    
for i in filter_2:
    assert i in filter_3

plt.figure(figsize=(20,15))
plt.scatter(result_plot_1[:,-2],result_plot_1[:,-1])
plt.xticks(bins_clustering)
plt.yticks(bins_path)
plt.grid(True)

plt.figure(figsize=(20,15))
plt.scatter(result_plot_2[:,-2],result_plot_2[:,-1])
plt.xticks(bins_clustering)
plt.yticks(bins_path)
plt.grid(True)

plt.figure(figsize=(20,15))
plt.scatter(result_plot_3[:,-2],result_plot_3[:,-1])
plt.xticks(bins_clustering)
plt.yticks(bins_path)
plt.grid(True)

# # save
np.save('graphs_n64_52.npy',result_plot_1)
np.save('graphs_n64_449.npy',result_plot_2)
np.save('graphs_n64_3942.npy',result_plot_3)