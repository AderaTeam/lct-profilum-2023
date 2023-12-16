import ioc
import torch
import pandas as pd
import numpy as np

def leaderidUserInterestsAnalizer(user_id: int, n_of_works: int):
    prof_ways_data = ioc.require('profWaysData').reset_index()
    data = ioc.require('mainLeaderIdUserInfo')(user_id)
    leaderidUserInterestsDistAnalizer = ioc.require('leaderidUserInterestsDistAnalizer')
    res = leaderidUserInterestsDistAnalizer(data['Интересы'])
    res = res.sort_values(ascending=0)
    return {prof_ways_data['Название профессии'][i]: res[i] for i in res.index.to_list()[0:n_of_works]}