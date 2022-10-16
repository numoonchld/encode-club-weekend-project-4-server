import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollsService } from './polls.service';
import { ethers } from 'ethers';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getAll() {
    return this.pollsService.findAll();
  }

  @Post('new-poll')
  createNewPoll(@Body() body: CreatePollDto) {
    if (!ethers.utils.isAddress(body.creator)) throw new BadRequestException();
    return this.pollsService.create(body);
  }

  // deploy ballot contract

  // registered voter casts vote
}
