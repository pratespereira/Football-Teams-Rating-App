import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import IUserXPass from '../interfaces/IUserXPass';
import IRole from '../interfaces/IRole';
import {
  checkPassword,
  tokenCreate,
  checkToken,
} from '../validations/loginValidations';

const incorretEmailOrPassMessage = 'Incorrect email or password';

const userProtected = (user: IUser) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as IUserXPass;
};

export default class UserService {
  static async login(login: ILogin) {
    const user = await User.findOne({
      where: {
        email: login.email,
      },
    });
    if (!user) {
      return { type: 401, message: incorretEmailOrPassMessage };
    }

    const passwordMatch = checkPassword(login.password, user);

    if (passwordMatch.type === 401) {
      return { type: 401, message: incorretEmailOrPassMessage };
    }

    const userX = userProtected(user);

    const token = tokenCreate(userX);
    return { type: null, message: token };
  }

  static async getRole(token: string) {
    const { type, message } = checkToken(token);
    if (type) {
      return { type, message };
    }
    try {
      const payload = message as jwt.JwtPayload;
      const user = await User.findByPk(payload.user.dataValues.id, {
        attributes: ['role'],
      });
      return { role: user?.role } as IRole;
    } catch (err) {
      return { type: 401, message: 'Expired or invalid token' };
    }
  }
}
