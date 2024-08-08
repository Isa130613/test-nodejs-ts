import JwtPayload from '../interfaces/jwtPayload';
import { sign, verify } from 'jsonwebtoken';
import UserType from '../interfaces/user';
import UserRepository from '../repositories/userRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AuthService {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async checkUserCredentials(
    email: string,
    password: string
  ): Promise<UserType | undefined> {
    const user = await this.userRepository.findByEmail(email);
    if (user?.password === password) {
      return user;
    }
  }

  generateToken(user: JwtPayload): string {
    return sign(user, process.env.JWT_SECRET || 'helloworld');
  }

  async validateToken(token: string): Promise<JwtPayload | null> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET || 'helloworld', (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve((decoded as JwtPayload) || null);
        }
      });
    });
  }
}
