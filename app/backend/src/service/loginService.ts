import * as bcrypt from 'bcryptjs';
import createToken from '../utils/createToken';
import User from '../database/models/UserModel';

class LoginService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { message: 'Invalid email or password' };
    }

    const token = createToken.generateToken({ email });

    return { token };
  }

  static async role(email: string) {
    const user = await User.findOne({ where: { email } });

    const role = user?.dataValues.role;

    return { role };
  }
}

export default LoginService;
