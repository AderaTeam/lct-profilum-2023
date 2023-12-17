import ioc
import torch

def fastTextVectorizer(texts, len_of_seq=65):
    tokenizer = ioc.require('stdTokenizer')
    vectorizer = ioc.require('stdVectorizer')
    with torch.no_grad():
        k = vectorizer(**tokenizer(texts, padding=True, truncation=True, pad_to_multiple_of=len_of_seq, max_length=len_of_seq, return_tensors='pt'))[0].squeeze(0).sum(dim=0).detach()/len_of_seq
    return k