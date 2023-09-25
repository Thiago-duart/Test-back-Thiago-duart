import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { HttpModule } from '@nestjs/axios';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserHelpers } from './controller/helpers';
import {
  CheckUserHasAlreadybeenCreated,
  checksUserExiteByID,
} from './middlewares/user.middlewares';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: ValidationPipe, useClass: ZodValidationPipe },
    UserHelpers,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checksUserExiteByID)
      .forRoutes(
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.DELETE },
        { path: 'user/:id', method: RequestMethod.PATCH },
      );
    consumer
      .apply(CheckUserHasAlreadybeenCreated)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
