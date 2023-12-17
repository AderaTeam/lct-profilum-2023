import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SocialsService } from '../socials/socials.service';
import axios from 'axios';
import { VKResultDto } from '../achievement/dto/vkResultDto.dto';
import { PathsService } from '../paths/paths.service';

@Injectable()
export class AnalyzeService {

    constructor(
        private userService: UserService,
        private socialsService: SocialsService,
        private pathService: PathsService   
    ){}
    public async analyzeUserById(userid: number)
    {
        const user = await this.userService.getOneById(userid)

        const userSocials = await this.socialsService.findLinksByUserId(userid)

        Logger.log(JSON.stringify(userSocials))

        if(userSocials.filter((obj) => {return obj.social.name == 'VK'}).length > 0)
        {
            Logger.log(userSocials.filter((obj) => {return obj.social.name == 'VK'}))

            const userVKid = userSocials.filter((obj) => {return obj.social.name == 'VK'})[0].originaluserid

            var vkResultWorks: VKResultDto = (await axios.get(`http://178.170.192.87:9000/vk/simple_analize_interests/?user_id=${userVKid}&n_of_works=4`)).data
        }  
        if(userSocials.filter((obj) => {return obj.social.name == 'LeaderID'}).length > 0)
        {
            const leaderID = userSocials.filter((obj) => {return obj.social.name == 'LeaderID'})[0].originaluserid
            Logger.log(leaderID)

            var leaderResultWorks = (await axios.get(`http://178.170.192.87:9000/leaderid/get_works/?user_id=${leaderID}&n_of_works=4`)).data
        }

        user.isAnalyzed = true

        let resultsVK = []

        for (const work of vkResultWorks.names)
        {
            if(await this.pathService.findOneByName(work))
            {
                resultsVK.push(await this.pathService.findOneByName(work))
            }
            else
            {
                resultsVK.push(await this.pathService.createProfMock(work))
            }
        }

        if(user.analysedPaths)
        {
            user.analysedPaths.push(...resultsVK)
        }
        else
        {
            user.analysedPaths = resultsVK
        }

        this.userService.save(user)

        return {resultsVK}

    }
}
