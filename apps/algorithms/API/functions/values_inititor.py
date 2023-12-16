import json
from functions.processor.stopwords_cleaner import stopwordsCleaner
from functions.processor.text_normalizer import textNormalizer
from functions.processor.leader_id_main_user_info_processor import leaderIdMainUserInfoProcessor
from functions.getters.leader_id.get_leader_id_main_user_info import mainLeaderIdUserInfo
from transformers import AutoModel, AutoTokenizer
import vk_api

import ioc
import pandas as pd
import torch


def valuesInitiator():
    tokenizer = AutoTokenizer.from_pretrained("ai-forever/sbert_large_nlu_ru")
    vectorizer = AutoModel.from_pretrained("ai-forever/sbert_large_nlu_ru")

    with open('./DATA/less_semantic_words.txt', 'r', encoding='utf-8') as f:
        stopwords = pd.Series(f.read().split('\n')).unique()
    
    with open('./DATA/secrets.json', 'r') as f:
        secrets = json.load(f)

    with open('./DATA/large_spec_desc_processed.json', 'r') as f:
        large_spec_desc_processed = json.load(f)

    small_spec_desc = pd.read_csv(
        './DATA/spec_num_name_pairs.csv'
    )
    
    # user_id = secrets['vk']['test_user_id']
    vk_session = vk_api.VkApi(
        secrets['vk']['phone'], 
        secrets['vk']['pass'],
        token=secrets['vk']['service_key'],
        app_id=6287487,
        scope=vk_api.VkUserPermissions.GROUPS
    )
    vk_session.auth(token_only=True)
    small_description_vectors = torch.load('../DATA/small_description_vectors.pt')
    prof_ways_data = pd.read_excel('./DATA/Профессии_ОКСО_ ЛЦТ_Профилум.xlsx', index_col='№').loc[:, ['Отрасль текстом', 'Название профессии']]

    
    vk_session.auth(token_only=True)
    ioc.provide('vkSession', vk_session)
    ioc.provide('stopwords', stopwords)
    ioc.provide('stdTokenizer', tokenizer)
    ioc.provide('stdVectorizer', vectorizer)
    ioc.provide(
        'usefullLeaderIdMainParams', 
        [
            'Интересы', 
            'Активность', 
            'Команды'
        ]
    )
    ioc.provide('maxPostHistLength', 10)
    ioc.provide('smallDescriptionVectors', small_description_vectors)
    ioc.provide('profWaysData', prof_ways_data)
    ioc.provide('largeSpecDescProcessed', large_spec_desc_processed)
    ioc.provide('smallSpecDesc', small_spec_desc)
