import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { ZodValidationPipe } from './pipes/auth.pipe';
import {
  checksUserCreated,
  checksUserExiteByEmail,
} from './middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    { provide: ValidationPipe, useClass: ZodValidationPipe },
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checksUserExiteByEmail)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(checksUserCreated)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
  }
}
