import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Method: ${req.method}, body: ${req.body}`);
  res.json({ ...req.body });
  next();
}
