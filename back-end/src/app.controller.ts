import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas/users.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/here")
  getByebye(): string {
    return this.appService.getByebye();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/here/test")
  getaTest(): Promise<User[]> {
    return this.appService.getaTest();
  }
}
