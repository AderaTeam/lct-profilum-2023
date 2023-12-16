import ioc
import torch
import pandas as pd
import numpy as np

def leaderidUserInterestsDistAnalizer(interests):
    vectorizer = ioc.require('stdTextVectorizer')
    text_samples_vectors = ioc.require('smallDescriptionVectors')
    distAnalizer = ioc.require('simpleDistAnalizer')
    d = pd.Series(np.zeros(text_samples_vectors.shape[0]))
    for i in interests:
        d += distAnalizer(
            text_for_compare_vectorized = vectorizer(i),
            vectors_database_for_simple_dist_analize = text_samples_vectors
        )
    return d