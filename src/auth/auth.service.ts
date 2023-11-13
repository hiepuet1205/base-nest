import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    let user = await this.userService.findOne(username);

    if (!user) {
      throw new BadRequestException('Username is not exsist!')
    }

    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }


    const payload = { sub: user.id, username: user.username };
    const { id, password, ...userRes } = user
    return {
      user: userRes,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user) {
      throw new BadRequestException('Username is exsist!')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    const newUser = await this.userService.create(username, hash);

    const payload = { sub: newUser.id, username: newUser.username };
    const { id, password, ...userRes } = newUser
    return {
      user: userRes,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username, pass): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new BadRequestException('Username is not exsist!')
    }

    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const { id, password, ...userRes } = user
    return userRes;
  }
}
