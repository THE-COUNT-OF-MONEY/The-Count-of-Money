import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // Library Driver De persistance pour MangoDB

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/test', {
    //   connectionName: 'cats',
    // }),
    MongooseModule.forRoot('mongodb://localhost/users', {
      connectionName: 'users',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
