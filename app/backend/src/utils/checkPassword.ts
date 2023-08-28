import * as bcrypt from 'bcryptjs';

class checkPassword {
  public static async checkPassword(password: string, userPassword: string) {
    const hash = await bcrypt.compareSync(password, userPassword);

    return hash;
  }
}

export default checkPassword;
