import { Injectable } from '@nestjs/common';
import * as tokenContractAddressJSON from '../src/contract-assets/token-contract/G11Token.address.json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Tokenized Ballot dApp API Backend';
  }

  getTokenContractAddress() {
    return tokenContractAddressJSON['token-goerli-address'];
  }
}
