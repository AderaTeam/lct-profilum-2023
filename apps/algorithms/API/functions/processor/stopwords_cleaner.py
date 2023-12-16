from razdel import tokenize
def stopwordsCleaner(text, sw, spliter: callable=tokenize, min_word_len: int=2):
    text = text
    tokens = spliter(text)
    t = []
    for i in tokens:
        if len(i.text) > min_word_len:
            if i.text not in sw:
                t.append(i.text)
    return ' '.join(t)