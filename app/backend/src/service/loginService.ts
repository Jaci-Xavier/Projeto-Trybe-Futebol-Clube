import checkPassword from '../utils/checkPassword';
import createToken from '../utils/createToken';
import User from '../database/models/UserModel';

class LoginService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user || !checkPassword.checkPassword(password, user.password)) {
      return { message: 'invalid email or password' };
    }

    const token = createToken.generateToken({ email });

    return { token };
  }
}

export default LoginService;
