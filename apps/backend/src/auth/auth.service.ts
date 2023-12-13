import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import clientdata from '../constants/clientdata';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

  async signUp(createUserDto: UserDto): Promise<any> {
    const userExists = await this.usersService.getOneByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signUpVk(silentToken: String, uuid: String)
  {
    //oauth legacy
    //const uri = `https://oauth.vk.com/access_token?client_id=${clientdata.client_id}&client_secret=${clientdata.client_secret}&redirect_uri=${clientdata.redirect_uri}&code=${userCode}`
    //const result = await axios.get(uri)
    //Logger.log(result)

    const accessuri = `https://api.vk.com/method/auth.exchangeSilentAuthToken?access_token=${clientdata.service_token}&token=${silentToken}&uuid=${uuid}`

    Logger.log(accessuri)

    const result = await axios.get(accessuri)

    Logger.log(result)

    const datauri = `https://api.vk.com/method/account.getProfileInfo?access_token=${result.data.access_token}`

    Logger.log(datauri)

    const userData = await axios.get(datauri)

    Logger.log(userData)

  }

	async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.getOneByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {...user, ...tokens};
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
    return tokens;
  }
  
}
