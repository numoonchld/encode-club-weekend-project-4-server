import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PollsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
