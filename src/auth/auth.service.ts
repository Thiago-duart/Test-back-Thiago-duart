import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: loginAuthDto) {
    const { email, password } = authDto;

    const user = await this.authModel.findOne({ email });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'bOgSJw9KjywTSA7wQGEQlYlVMbOp+xdz78biWLEqQOQ=',
      }),
    };
  }
  async createRegister(dataUserDto) {
    const newUserRegister = new this.authModel(dataUserDto);
    newUserRegister.save();
    return newUserRegister;
  }
}
