import * as jwt from 'jsonwebtoken';

const segredin = process.env.JWT_SECRET || 'segredin';

class createToken {
  public static generateToken(user: object) {
    const token = jwt.sign(user, segredin);

    return token;
  }
}

export default createToken;
