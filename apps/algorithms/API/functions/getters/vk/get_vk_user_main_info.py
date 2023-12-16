import vk_api


def getVkUserMainInfo(vk_session: vk_api.VkApi, user_id: int):
    return vk_session.method("users.get", {
        "user_ids": user_id, 
        'fields': 'activities, about, city, music, universities, career, education, interests, personal,'
    })[0]