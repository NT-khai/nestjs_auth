import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST') {
      console.log(req.body);
    }
    next();
  }
}
