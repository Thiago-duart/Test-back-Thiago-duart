import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../schema/auth.schema';

@Injectable()
export class checksUserExiteByEmail implements NestMiddleware {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body.content;

    const user = await this.authModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'user does not exist' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'password is wrong' });
    }
    next();
  }
}
@Injectable()
export class checksUserCreated implements NestMiddleware {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userEmail = req.body.email;
    const user = await this.authModel.findOne({ email: userEmail });
    if (user) {
      return res.status(400).json({ message: 'user already created' });
    }
    next();
  }
}
