import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as tokenContractAddressJSON from '../src/contract-assets/token-contract/G11Token.address.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should show landing text"', () => {
      expect(appController.getHello()).toBe(
        'Tokenized Ballot dApp API Backend',
      );
    });
  });

  describe('token actions', () => {
    it('should return token contract address', () => {
      expect(appController.getTokenContractAddress()).toBe(
        tokenContractAddressJSON['token-goerli-address'],
      );
    });
  });
});
