import {
  Controller,
  Get,
  Param,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import isValidAddress from './helpers/isValidAddress';
import { MintVotingTokensDto } from './polls/dto/mint-voting-tokens.dto';

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

  // mint voting tokens
  @Post('request-voting-tokens')
  async requestVotingTokens(@Body() body: MintVotingTokensDto) {
    if (!isValidAddress(body.address)) throw new BadRequestException();
    const isMintSuccess = await this.appService.requestVotingTokens(body);
    return { result: isMintSuccess };
  }

  // register vote casted

  // get list of all votes
}
