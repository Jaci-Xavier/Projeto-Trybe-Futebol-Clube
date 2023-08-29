import * as jwt from 'jsonwebtoken';

const segredin = process.env.JWT_SECRET || 'segredin';

const autJwt = (token: string) => jwt.verify(token, segredin);

export default autJwt;
