import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { DeployPollDto } from './dto/deploy-poll-dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollsService } from './polls.service';
import isValidAddress from '../helpers/isValidAddress';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getAll() {
    return this.pollsService.findAll();
  }

  @Post('new-poll')
  createNewPoll(@Body() body: CreatePollDto) {
    if (!isValidAddress(body.creator))
      throw new BadRequestException('Invalid requesting account address!');
    return this.pollsService.create(body);
  }

  // deploy poll ballot contract
  @Post('deploy-poll-contract')
  deployPollContract(@Body() body: DeployPollDto) {
    return this.pollsService.deployPoll(body.pollID);
  }
}
