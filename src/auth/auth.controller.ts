import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import {
  RegisterSchema,
  ZodValidationPipe,
  singInSchema,
} from './pipes/auth.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(singInSchema))
  async signIn(@Body() singInDto: AuthDto) {
    return this.authService.signIn(singInDto);
  }
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async createRegister(@Body() dataUserDto: AuthDto, @Res() res: any) {
    this.authService.createRegister(dataUserDto);
    return res.status(200).json({ message: 'successfully registered' });
  }
}
