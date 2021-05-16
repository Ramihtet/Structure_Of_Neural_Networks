# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
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



def compute_count(channel, group):
    divide = channel//group
    remain = channel%group

    out = np.zeros(group, dtype=int)
    out[:remain]=divide+1
    out[remain:]=divide
    return out

@py_random_state(3)
def ws_graph(n, k, p, seed=1):
    """Returns a ws-flex graph, k can be real number in [2,n]
    """
    assert k>=2 and k<=n
    # compute number of edges:
    edge_num = int(round(k*n/2))
    count = compute_count(edge_num, n)
    # print(count)
    G = nx.Graph()
    for i in range(n):
        source = [i]*count[i]
        target = range(i+1,i+count[i]+1)
        target = [node%n for node in target]
        # print(source, target)
        G.add_edges_from(zip(source, target))
    # rewire edges from each node
    nodes = list(G.nodes())
    for i in range(n):
        u = i
        target = range(i+1,i+count[i]+1)
        target = [node%n for node in target]
        for v in target:
            if seed.random() < p:
                w = seed.choice(nodes)
                # Enforce no self-loops or multiple edges
                while w == u or G.has_edge(u, w):
                    w = seed.choice(nodes)
                    if G.degree(u) >= n - 1:
                        break  # skip this rewiring
                else:
                    G.remove_edge(u, v)
                    G.add_edge(u, w)
    return G

@py_random_state(4)
def connected_ws_graph(n, k, p, tries=100, seed=1):
    """Returns a connected ws-flex graph.
    """
    for i in range(tries):
        # seed is an RNG so should change sequence each call
        G = ws_graph(n, k, p, seed)
        if nx.is_connected(G):
            return G
    raise nx.NetworkXError('Maximum number of tries exceeded')


def compute_stats(G):
    G_cluster = sorted(list(nx.clustering(G).values()))
    cluster = sum(G_cluster) / len(G_cluster)
    # path
    path = nx.average_shortest_path_length(G)
    return cluster, path

def norm(x):
    ## to 0-1
    x = x-x.min()
    if x.max()==0:
        x[:]=0
    else:
        x = x/x.max()
    return x



def get_graph(n,degree,p,repeat=30):
    # row: repeat, column: n,degree,p,seed,cluster,path
    result = np.zeros((repeat, 6))
    for i in range(repeat):
        graph = connected_ws_graph(n=n, k=degree, p=p, seed=i)
        cluster, path = compute_stats(graph)
        result[i] = [n, degree, p, i, cluster, path]
    return result


### 16: 30, 200, 300
### 64: 30, 300, 300
def sweep_graphs(n, processes=4):
    print(n)
    t0 = time.time()
    pool = mp.Pool(processes=processes)
    deg_min = 4
    deg_max = n-2
    degree_range = np.square(np.linspace(np.sqrt(deg_min),np.sqrt(deg_max),200))
    p_range = np.linspace(0,1,300)**2

    args_all = [(n,degree,p) for degree in degree_range for p in p_range]
    results = [pool.apply_async(get_graph, args=args) for args in args_all]
    output = [p.get() for p in results]
    output = np.concatenate(output,axis=0)

    dir_out = 'graph_configs'
    if not os.path.isdir(dir_out):
        os.mkdir(dir_out)
    np.save('{}/all_n{}_final.npy'.format(dir_out,n),output)
    t1 = time.time()
    print('time: {}'.format(t1-t0))

# print(get_graph(64,30,0.5))



