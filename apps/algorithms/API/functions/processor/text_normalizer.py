import re

def textNormalizer(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    text = ' '.join(list(filter(lambda a: len(a), text.split(' '))))
    return text