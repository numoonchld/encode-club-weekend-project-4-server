import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './schemas/poll.schema';
import { CreatePollDto } from './dto/create-poll.dto';
import deployToGoerli, {
  DeployDetails,
} from '../contract-assets/ballot-contract/deployToGoerli.helper';

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

  async deployPoll(pollID: string) {
    // get DB entry of selected poll
    const matchedPoll: any = this.pollModel.findById(pollID).exec();

    // check if poll already deployed
    if (matchedPoll.isDeployed)
      throw new BadRequestException(
        `Poll already deployed (Goerli testnet contract address: ${matchedPoll.deploymentAddress} )`,
      );

    // extract poll details for contract deployment
    const pollOptions = matchedPoll.proposals;

    // deploy with helper function
    const deployDetails = await deployToGoerli(pollOptions);

    if (deployDetails instanceof DeployDetails) {
      matchedPoll.isDeployed = deployDetails.success;
      matchedPoll.deploymentHash = deployDetails.hash;
      matchedPoll.deploymentAddress = deployDetails.address;

      await matchedPoll.save();

      return { result: true };
    }

    return { result: false };
  }
}
