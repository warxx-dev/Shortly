import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalPath = req.originalUrl;
    if (
      originalPath === '/' ||
      originalPath.startsWith('/link') ||
      originalPath.startsWith('/auth') ||
      originalPath.startsWith('/user') ||
      originalPath.startsWith('/r/')
    ) {
      return next();
    }
    const redirectUrl = `/r${originalPath}`;

    res.redirect(302, redirectUrl);
  }
}
