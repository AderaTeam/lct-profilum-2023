import torch
import pandas as pd


def simpleDistAnalizer(text_for_compare_vectorized: torch.tensor, vectors_database_for_simple_dist_analize: torch.tensor):
    t = 0
    d = dict()
    with torch.no_grad():
        for i in vectors_database_for_simple_dist_analize:
            # print(r1.shape, r2.shape)
            r1 = (i.sum(dim=0)/i.shape[0]).unsqueeze(0)
            r2 = (text_for_compare_vectorized.sum(dim=0)/i.shape[0]).unsqueeze(0)
            # print(r1.shape, r2.shape)
            # print(r1.shape, r2.shape, i.shape)
            d[t] = torch.nn.CosineSimilarity(dim=1)(r1, r2).item()
            t+=1
    return pd.Series(d)
