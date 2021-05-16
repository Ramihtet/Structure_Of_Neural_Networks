import scipy.io
import pandas as pd
import numpy as np
import networkx as nx

mat = scipy.io.loadmat('GroupAverage_rsfMRI_matrix.mat')
print(mat)
adj_matrix  = mat["CIJall"]

# for i in mat["CIJall"]:
#     # print(i)

df = pd.DataFrame(adj_matrix)
print(df)

# def edgelist(df):
#     a = df.values
#     c = df.columns
#     n = len(c)
    
#     c_ar = np.array(c)
#     out = np.empty((n, n, 2), dtype=c_ar.dtype)
    
#     out[...,0] = c_ar[:,None]
#     out[...,1] = c_ar
    
#     mask = ~np.eye(n,dtype=bool)
#     df_out = pd.DataFrame(out[mask], columns=[['Source','Target']])
#     df_out['Weight'] = a[mask]
#     return df_out

# edge = edgelist(df)
# edges = []
# for i in range(edge.shape[0] - 1):
#     row = edge.loc[i]
#     e = [row["Source"],row["Target"]]
#     e.sort()
#     if e not in edges:
#         edges.append(e)

# f = open("edges.txt","w")
# f.write(str(edges))
# g = nx.DiGraph()
# g.add_edges_from(edges)
# print(nx.find_cycle(g))


# print(edges)
