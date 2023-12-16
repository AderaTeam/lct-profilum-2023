import torch
import pandas as pd


def simpleDistAnalizer(text_for_compare_vectorized: torch.tensor, vectors_database_for_simple_dist_analize: torch.tensor):
    t = 0
    d = dict()
    for i in vectors_database_for_simple_dist_analize:
        d[t] = torch.nn.CosineSimilarity(dim=1)((i.sum(dim=0)/i.shape[0]).unsqueeze(0), text_for_compare_vectorized.unsqueeze(0)).item()
        t+=1
    
    return pd.Series(d)