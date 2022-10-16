import { Controller, Get } from '@nestjs/common';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getAll() {
    return this.pollsService.findAll();
  }
}
