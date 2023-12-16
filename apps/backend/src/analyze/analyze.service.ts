import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SocialsService } from '../socials/socials.service';
import axios from 'axios';

@Injectable()
export class AnalyzeService {

    constructor(
        private userService: UserService,
        private socialsService: SocialsService
    ){}
    public async analyzeUserById(userid: number)
    {
        const user = await this.userService.getOneById(userid)

        const userSocials = await this.socialsService.findLinksByUserId(userid)

        if(userSocials.filter((obj) => obj.social.name == 'VK'))
        {
            const userVKid = userSocials.filter((obj) => obj.social.name == 'VK')[0].originaluserid

            var vkResultWorks = (await axios.get(`https://py.adera-team.ru/vk/simple_analize_interests/?user_id=${userVKid}&n_of_works=3`)).data
        }  
        if(userSocials.filter((obj) => obj.social.name == 'LeaderID'))
        {
            const leaderID = userSocials.filter((obj) => obj.social.name == 'LeaderID')[0].originaluserid

            var leaderResultWorks = (await axios.get(`https://py.adera-team.ru/leaderid/get_works/?user_id=${leaderID}&n_of_works=3`)).data
        }

        return {vkres: vkResultWorks, leaderes: leaderResultWorks}

    }
}
