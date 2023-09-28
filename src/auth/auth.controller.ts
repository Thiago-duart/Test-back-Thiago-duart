import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateAuthDto, loginAuthDto } from './dto/auth.dto';
import { AuthValidation } from './pipes/auth.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body(new AuthValidation()) res: loginAuthDto) {
    const { content }: Record<string, any> = res;
    return this.authService.signIn(content);
  }
  @Post('register')
  async createRegister(
    @Body(new AuthValidation()) createAuthDto: CreateAuthDto,
    @Res() res: any,
  ) {
    this.authService.createRegister(createAuthDto);
    return res.status(200).json({ message: 'successfully registered' });
  }
}
