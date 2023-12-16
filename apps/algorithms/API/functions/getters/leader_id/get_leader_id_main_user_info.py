from bs4 import BeautifulSoup
import requests
import ioc


def mainLeaderIdUserInfo(user_id):
    main_url = 'https://leader-id.ru/'
    user_suburl = 'users/'
    textNormalization = ioc.require('stdLeaderIdTextNormalization')
    usefuleValues = ioc.require('usefullLeaderIdMainParams')
    userInfoProcessor = ioc.require('stdLeaderIdMainUserInfoProcessor')
    ms = requests.get(main_url + user_suburl + str(user_id)).content
    soup = BeautifulSoup(ms, 'html.parser').find(class_='page')
    data = dict()
    for i in set([i for i in soup.find_all('h3') if textNormalization(i.text) in usefuleValues]):
        d = userInfoProcessor(i.find_parents())
        if len(d) > len(data.get(textNormalization(i.text), [])):
            print(d)
            data[textNormalization(i.text)] = d 
    return data