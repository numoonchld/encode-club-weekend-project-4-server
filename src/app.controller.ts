import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import isValidAddress from './helpers/isValidAddress';

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

  // get token-balance of address
  @Get('token-balance/:accountAddress')
  getAccountTokenBalance(@Param('accountAddress') accountAddress: string) {
    if (!isValidAddress(accountAddress)) throw new BadRequestException();
    return this.appService.getAccountTokenBalance(accountAddress);
  }

  // register voters for token (mint voting tokens)

  // process mint request from voters

  // get list of all votes
}
