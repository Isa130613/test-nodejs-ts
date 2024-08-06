import { NextFunction, Request, Response } from 'express';

const checkPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Se intentó xd');
  next();
};
