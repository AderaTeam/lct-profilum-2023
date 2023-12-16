import vk_api

def getVkUserInfo(user_id: int, vk_session: vk_api.VkApi, wall_count=10, groups_count=10):
    data = dict()
    userInfo = vk_session.method("users.get", {
        "user_ids": user_id, 
        'fields': 'activities, about, city, music, universities, career, education, interests,personal,'
    })[0]
    userWall = vk_session.method("wall.get", {"owner_id": user_id, 'count': wall_count})
    userGroups = vk_session.method("groups.get", {"owner_id": user_id, 'extended': 1, 'count': groups_count})
    userSubscriptions = vk_session.method("users.getSubscriptions", {"user_id": user_id, 'extended': 1, 'fields': 'owner_id'})
    return
    
    