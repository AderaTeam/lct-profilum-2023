import torch
from functions.getters.vk.get_vk_user_subscribes import getVkUserSubscribes
from functions.getters.vk.get_vk_user_main_info import getVkUserMainInfo
from functions.getters.vk.get_vk_user_wall import getVkUserWallInfo
from functions.def_inititor import defInitiator
from functions.values_inititor import valuesInitiator
from functions.processor.stopwords_cleaner import stopwordsCleaner
from functions.processor.text_normalizer import textNormalizer
from functions.processor.leader_id_main_user_info_processor import leaderIdMainUserInfoProcessor
from functions.getters.leader_id.get_leader_id_main_user_info import mainLeaderIdUserInfo
from fastapi import FastAPI
import ioc
import pandas as pd
import numpy as np


import requests
from bs4 import BeautifulSoup
import vk_api
import json

app = FastAPI()
defInitiator()
valuesInitiator()

# 2234799
@app.get("/leaderid/get_works")
def root1(user_id: int, n_of_works: int=-1):
    res = ioc.require('leaderidUserInterestsAnalizer')(user_id, n_of_works)
    # res = ioc.require('leaderidUserEventsAnalizer')(user_id, n_of_works)
    return res


# 2234799
@app.get("/leaderid/get_spec")
def root2(user_id: int, n_of_works: int=-1):
    data = ioc.require('mainLeaderIdUserInfo')(user_id)
    vectorizer = ioc.require('stdTextVectorizer')
    # spec_data = ioc.require('largeSpecDescProcessed')
    # distAnalizer = ioc.require('simpleDistAnalizer')
    spec_data = ioc.require('smallSpecDesc')
    print(data)
    v0 = torch.zeros([1, 1024])
    d2 = dict()
    t = 0
    for i in data['Интересы']:
        v0 += vectorizer(i, 5).sum(dim=0).unsqueeze(0)
    for j in spec_data['desc']:
        v1 = vectorizer(j, 256).unsqueeze(0)
        # print(v1.shape)
        d2[t] = torch.nn.CosineSimilarity(dim=1)(v1.detach(), v0.detach()).item()
        t+=1
    # res = res.sort_values(ascending=0)
    print(d2)
    res = np.argsort(list(d2.values()))
    print(spec_data)
    print(v0)
    # pd.DataFrame().reset_index()
    return spec_data['name'].iloc[res].to_list()


# 393854543
@app.get("/vk/simple_analize_interests")
def root3(user_id: int, n_of_works: int=-1):
    prof_ways_data = ioc.require('profWaysData').reset_index()
    text_samples_vectors = ioc.require('smallDescriptionVectors')
    vectorizer = ioc.require('stdTextVectorizer')
    vk_session = ioc.require('vkSession')
    subscribes = ioc.require('getVkUserSubscribes')(vk_session=vk_session, user_id=user_id)
    subscribes_processed = ioc.require('vkSubscribesProcessor')(subscribes)
    texts = []
    for i in subscribes_processed:
        texts += ioc.require('vkWallMainInfoTextExtractor')(i['main_description'][0])
    v = torch.zeros(1024)
    for i in texts:
        v += vectorizer(i, 100)
    res = ioc.require('simpleDistAnalizer')(v, text_samples_vectors)
    res_i = np.argsort(res.to_numpy())[::-1]
    print(prof_ways_data.shape, res.shape, res_i)
    return {prof_ways_data['Название профессии'][i]: res[i] for i in res_i[0:n_of_works-1]}


# 393854543
@app.get("/vk/get_spec")
def root4(user_id: int, n_of_works: int=-1):
    prof_ways_data = ioc.require('profWaysData').reset_index()
    spec_data = ioc.require('smallSpecDesc')
    vectorizer = ioc.require('stdTextVectorizer')
    vk_session = ioc.require('vkSession')
    subscribes = ioc.require('getVkUserSubscribes')(vk_session=vk_session, user_id=user_id)
    subscribes_processed = ioc.require('vkSubscribesProcessor')(subscribes)
    texts = []
    for i in subscribes_processed:
        texts += ioc.require('vkWallMainInfoTextExtractor')(i['main_description'][0])
    v0 = torch.zeros(1024)
    v0 = torch.zeros([1, 1024])
    d2 = dict()
    t = 0
    for i in texts:
        v0 += vectorizer(i, 100)
    for j in spec_data['desc']:
        v1 = vectorizer(j, 256).unsqueeze(0)
        # print(v1.shape)
        d2[t] = torch.nn.CosineSimilarity(dim=1)(v1.detach(), v0.detach()).item()
        t+=1
    res = np.argsort(list(d2.values()))[::-1]
    return spec_data['name'].iloc[res].to_list()

