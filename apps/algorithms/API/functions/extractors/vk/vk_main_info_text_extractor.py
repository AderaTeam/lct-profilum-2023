def vkWallMainInfoTextExtractor(main_info: dict):
    d = []
    if 'name' in main_info:
        d.append(main_info['name'])
    if 'activity' in main_info:
        d.append(main_info['activity'])
    if 'status' in main_info:
        d.append(main_info['status'])
    # print(d)
    return d
