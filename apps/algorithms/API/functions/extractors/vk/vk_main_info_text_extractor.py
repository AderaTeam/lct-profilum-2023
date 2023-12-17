import ioc

def vkWallMainInfoTextExtractor(main_info: dict):
    stopwords = ioc.require('stopwords')
    stopwordsCleaner = ioc.require('stdLeaderIdStopWordsCleaner')
    d = []
    if 'name' in main_info:
        print(main_info['name'])
        d.append(stopwordsCleaner(main_info['name'], stopwords))
    if 'activity' in main_info:
        print(main_info['activity'])
        d.append(stopwordsCleaner(main_info['activity'], stopwords))
    if 'status' in main_info:
        print(main_info['status'])
        d.append(stopwordsCleaner(main_info['status'], stopwords))
    # print(d)
    return d
