import ioc

def textVectorizer(text, len_of_seq=65):
    stopwords = ioc.require('stopwords')
    stopwordsCleaner = ioc.require('stdLeaderIdStopWordsCleaner')
    tokenizer = ioc.require('stdTokenizer')
    vectorizer = ioc.require('stdVectorizer')
    # print(text)
    # print(tokenizer([stopwordsCleaner(text, stopwords)], padding=True, truncation=True, pad_to_multiple_of=len_of_seq, max_length=len_of_seq, return_tensors='pt'))
    return vectorizer(**tokenizer([stopwordsCleaner(text, stopwords)], padding=True, truncation=True, pad_to_multiple_of=len_of_seq, max_length=len_of_seq, return_tensors='pt'))[0].squeeze(0).sum(dim=0)/len_of_seq