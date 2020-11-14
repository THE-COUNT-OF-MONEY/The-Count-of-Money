import { Injectable } from '@nestjs/common';
import { User } from './schemas/users.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! v1';
  }
  getByebye(): string {
    return 'Hello World! Byebye v2';
  }

  async getaTest(): Promise<User[]> {
    // this.catModel.find().exec();
    let fruit = "Banana" as any;
    return fruit;
  }
}
