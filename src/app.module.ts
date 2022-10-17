import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PollsModule } from './polls/polls.module';
import { Voter, VoterSchema } from './schemas/voter.schema';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    PollsModule,
    MongooseModule.forFeature([{ name: Voter.name, schema: VoterSchema }]),
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
