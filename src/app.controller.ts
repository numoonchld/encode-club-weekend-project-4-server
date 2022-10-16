import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // get token contract address
  @Get('token-contract-address')
  getTokenContractAddress(): string {
    return this.appService.getTokenContractAddress();
  }

  // get total token supply
  @Get('token-total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  // register voters for token (mint voting tokens)

  // process mint request from voters

  // get list of all votes
}
