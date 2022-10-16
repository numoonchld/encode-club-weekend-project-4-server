import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Voter, VoterDocument } from './schemas/voter.schema';
import { MintVotingTokensDto } from './polls/dto/mint-voting-tokens.dto';

import { ethers } from 'ethers';

import * as tokenContractAddressJSON from '../src/contract-assets/token-contract/G11Token.address.json';
import * as G11TokenJSON from '../src/contract-assets/token-contract/G11Token.json';

import * as dotenv from 'dotenv';
dotenv.config();

import isMintingAllowed from './helpers/isMintingAllowed';
import currentEpoch from './helpers/currentEpoch';
import mintTokens from './contract-assets/token-contract/mintTokens.helper';

type VoterTypeLocal = {
  address: string;
  lastMintEpoch: number;
};

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;

  constructor(
    @InjectModel(Voter.name) private voterModel: Model<VoterDocument>,
  ) {
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

  async requestVotingTokens(
    mintVotingTokensDto: MintVotingTokensDto,
  ): Promise<Boolean> {
    const addressToMintTo = mintVotingTokensDto.address;

    const voterEntry: VoterTypeLocal[] = await this.voterModel.find({
      address: addressToMintTo,
    });

    if (voterEntry.length !== 0) {
      // if voter exists, check isMintingAllowed, if yes mint, else return same voter
      const matchedVoter = voterEntry[0];
      if (isMintingAllowed(matchedVoter.lastMintEpoch)) {
        const isMintingSuccess: boolean = await mintTokens(
          matchedVoter.address,
          this.contract,
        );

        if (isMintingSuccess) return true;
        throw new InternalServerErrorException('Minting failed!');
      }

      return true;
    } else {
      const isMintingSuccess: boolean = await mintTokens(
        addressToMintTo,
        this.contract,
      );

      if (!isMintingSuccess)
        throw new InternalServerErrorException('Minting failed!');

      const voterToCreate: VoterTypeLocal = {
        address: addressToMintTo,
        lastMintEpoch: currentEpoch(),
      };

      new this.voterModel(voterToCreate);

      return true;
    }
  }
}
