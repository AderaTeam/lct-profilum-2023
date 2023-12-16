import vk_api


def getVkUserSubscribes(vk_session: vk_api.VkApi, user_id: int, count: int=20):
    return vk_session.method(
        "users.getSubscriptions", 
        {
            "user_id": user_id, 
            'count': count
        }
    )