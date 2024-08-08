import { NextFunction, Response } from 'express';
import ExtendedRequest from '../interfaces/extendedRequest';
import { JwtPayload } from 'jsonwebtoken';
import { container } from 'tsyringe';
import AuthService from '../services/authService';
import EntityModel from '../models/entityModel';
import PermissionModel from '../models/permissionModel';

const authenticate = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authService: AuthService = container.resolve(AuthService);
    const authHeader: string | undefined = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token)
      return res.status(500).json({
        status: 403,
        message: 'Token must be provided',
      });

    const user: JwtPayload | null = await authService.validateToken(token);

    if (!user) {
      throw new Error('Token invalid');
    }
    req.user = user;
    next();
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const checkMethod = (method: string, permission: PermissionModel): boolean => {
  switch (method) {
    case 'GET':
      return permission.canGet;
    case 'POST':
      return permission.canCreate;
    case 'PUT':
      return permission.canUpdate;
    case 'DELETE':
      return permission.canDelete;
    default:
      return false;
  }
};

const checkEntity = async (url: string[]): Promise<EntityModel | null> => {
  const includesWord = (word: string): boolean => url.includes(word);
  let entity: EntityModel | null = null;

  switch (true) {
    case includesWord('users'):
      entity = await EntityModel.findOne({ where: { name: 'user' } });
      break;
    case includesWord('orders'):
      entity = await EntityModel.findOne({ where: { name: 'order' } });
      break;
  }

  return entity;
};

const checkPermissions = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const urlSplit: string[] = req.originalUrl.split('/');

  const entity: EntityModel | null = await checkEntity(urlSplit);

  if (entity && !urlSplit.includes('login')) {
    await new Promise((resolve) => {
      authenticate(req, res, (error: any) => {
        if (error) return next(error);
        resolve(null);
      });
    });

    const { method, user } = req;

    const roleId: number = user.roleId;

    const permission = await PermissionModel.findOne({
      where: { roleId, entityId: entity.id },
    });

    if (permission && checkMethod(method, permission)) {
      next();
    } else {
      res.status(403).json({
        status: 403,
        message: 'Unauthorized',
      });
    }
  } else if (urlSplit.includes('products-carts')) {
    await new Promise((resolve) => {
      authenticate(req, res, (error: any) => {
        if (error) return next(error);
        resolve(null);
      });
    });
    next();
  } else {
    next();
  }
};

export default checkPermissions;
