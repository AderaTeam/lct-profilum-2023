import ioc


def vkSubscribesProcessor(subscribes):
    data = list()
    k=[]
    k2 = []
    k3 = []
    vk_session = ioc.require('vkSession')
    # print(subscribes['groups']['items'])
    for i in subscribes['groups']['items']:
        try:
            # print(0)
            main_description = vk_session.method("groups.getById", {"group_id": i, 'fields': 'site, status, wiki_page, members_count, activity'})
            # print('1')
            posts = vk_session.method('wall.get', {'owner_id': i})
            # print(2)
            k.append({'main_description': main_description, 'wall': posts})
            k2.append(i)
        except:
            k3.append(i)
    # print(len(k3), len(k))
    return k