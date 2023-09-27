import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class checksUserExiteByID implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await this.userModel.findOne({ userId: userId });
    if (!user) {
      return res.status(400).json({ message: 'user does not exist' });
    }
    next();
  }
}
@Injectable()
export class CheckUserHasAlreadybeenCreated implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.data.userId;
    const user = await this.userModel.findOne({ userId: userId });

    if (user) {
      return res.status(400).json({ message: 'user already created' });
    }
    next();
  }
}
