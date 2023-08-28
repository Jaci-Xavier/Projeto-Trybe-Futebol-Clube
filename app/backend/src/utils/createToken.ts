import * as jwt from 'jsonwebtoken';

const segredin = process.env.JWT_SECRET || 'segredin';

class createToken {
  public static generateToken(user: object) {
    const token = jwt.sign(user, segredin, {
      expiresIn: '9d',
    });

    return token;
  }
}

export default createToken;
