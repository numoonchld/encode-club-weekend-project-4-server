import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './schemas/poll.schema';
import { CreatePollDto } from './dto/create-poll.dto';

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
}
