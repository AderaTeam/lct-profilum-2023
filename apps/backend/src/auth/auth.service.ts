import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import clientdata from '../constants/clientdata';
import axios from 'axios';
import { VkUserDto } from './dtos/vk.user.dto';
import { TokenExpiredOrInvalidException } from '../exceptions/tokenExpired.exception';
import { CreateUserDto } from '../user/dtos/createUser.dto';

import { SocialsService } from '../socials/socials.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private socialsService: SocialsService,
    ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.getOneByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {...tokens, user: await this.usersService.getOneByNickname(createUserDto.nickname)};
  }

  async signUpVk(silentToken: String, uuid: String)
  {

    const accessuri = `https://api.vk.com/method/auth.exchangeSilentAuthToken?v=5.131&access_token=${clientdata.service_token}&token=${silentToken}&uuid=${uuid}`

    Logger.log(accessuri)

    const result = await axios.get(accessuri)

    if (result.data.error)
    {
      throw new TokenExpiredOrInvalidException()
    }
    Logger.log(result.data)

    const datauri = `https://api.vk.com/method/account.getProfileInfo?v=5.131&access_token=${result.data.response.access_token}`

    Logger.log(datauri)

    const userData = await (await axios.get(datauri)).data.response

    Logger.log(await this.socialsService.findOneByUserId("VK",userData.user_id), userData.user_id)

    if (await this.socialsService.findOneByUserId("VK",userData.user_id))
    {

      const user = (await this.socialsService.findOneByUserId("VK",userData.user_id)).user
      const tokens = await this.getTokens(user.id, user.username);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return {...user, ...tokens};
    }
    else
    {
      const userDto: VkUserDto = {username: (userData.last_name + ' ' + userData.first_name), nickname: userData.screen_name ?? userData.user_id}

      Logger.log(userDto)
  
      const newUser = await this.usersService.create(userDto)
      //await this.socialsUsersService.
      const tokens = await this.getTokens(newUser.id, newUser.username);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      await this.socialsService.addUsersSocial(newUser.id, "VK", userData.user_id)
      return {...newUser, ...tokens};
    }
  }

	async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.getOneByNickname(data.nickname);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.nickname);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {user: user, ...tokens};
  }

	async logout(userId: number) {
    return this.usersService.updateOne(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateOne(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getOneById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {user: await this.usersService.getOneByNickname(user.nickname), ...tokens};
  }
  
}
