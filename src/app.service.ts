import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenContractAddressJSON from '../src/contract-assets/token-contract/G11Token.address.json';
import * as G11TokenJSON from '../src/contract-assets/token-contract/G11Token.json';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.contract = new ethers.Contract(
      tokenContractAddressJSON['token-goerli-address'],
      G11TokenJSON.abi,
      this.provider,
    );
  }

  getHello(): string {
    return 'Tokenized Ballot dApp API Backend';
  }

  getTokenContractAddress() {
    return tokenContractAddressJSON['token-goerli-address'];
  }

  async getTotalSupply() {
    const totalSupplyBN = await this.contract.totalSupply();
    const totalSupply = ethers.utils.formatEther(totalSupplyBN);
    return { result: totalSupply };
  }

  async getAccountTokenBalance(accountAddress: string) {
    const tokenBalanceBN = await this.contract.balanceOf(accountAddress);
    const tokenBalance = ethers.utils.formatEther(tokenBalanceBN);
    return { result: tokenBalance };
  }
}
