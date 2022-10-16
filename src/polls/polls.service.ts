import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './schemas/poll.schema';
import { CreatePollDto } from './dto/create-poll.dto';

type PollTypeLocal = {
  question: string;
  proposals: string[];
  creator: string;
  isDeployed: boolean;
  deploymentHash: string;
};

@Injectable()
export class PollsService {
  constructor(@InjectModel(Poll.name) private pollModel: Model<PollDocument>) {}

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const createdPoll = new this.pollModel(createPollDto);
    return createdPoll.save();
  }

  async findAll(): Promise<Poll[]> {
    return this.pollModel.find().exec();
  }

  async deployPoll(pollID: string): Promise<Boolean> {
    this.pollModel.findById(
      pollID,
      async (error: Error, poll: PollTypeLocal) => {
        if (error)
          throw new InternalServerErrorException('Error finding Poll in DB!');
      },
    );

    return true;
  }
}
