import vk_api


def getVkUserWallInfo(vk_session: vk_api.VkApi, user_id: int, count: int=10):
    return vk_session.method(
        "wall.get", 
        {
            "owner_id": user_id, 
            'count': count
        }
    )