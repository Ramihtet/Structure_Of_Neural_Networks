import pandas as pd
import itertools

G1 = r'C:\Users\user\Desktop\299B\code\Neataptic\constructor\edge.csv'


def put(a,b):
    return (a,b)
def graph(file):
    data = pd.read_csv (file) 
    Source = list(data["Source"])
    Target = list(data["Target"])


    edges = list( map(put, Source, Target) )
    nodes = list(set(list(itertools.chain(*edges))))
    print(edges)
    print(nodes)


    return (edges,nodes)

graph(G1)