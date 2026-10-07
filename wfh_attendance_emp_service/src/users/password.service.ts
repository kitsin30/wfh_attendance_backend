import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashingPass(currPass: string) {
    const hashedPassword = await bcrypt.hash(currPass, 10);
    return hashedPassword
  }

  async comparePass(currPass: string, hashedPassword: string) {
    return bcrypt.compare(currPass, hashedPassword);
  }
}