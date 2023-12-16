import ioc
import pandas as pd
import numpy as np

def distAnalizer(vector):
    text_samples_vectors = ioc.require('smallDescriptionVectors')
    _distAnalizer = ioc.require('simpleDistAnalizer')
    d = pd.Series(np.zeros(text_samples_vectors.shape[0]))
    for i in text_samples_vectors:
        d += _distAnalizer(
            text_for_compare_vectorized = vector,
            vectors_database_for_simple_dist_analize = text_samples_vectors
        )
    return d