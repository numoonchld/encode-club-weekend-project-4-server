import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Wallet } from 'ethers';

export type PollDocument = Poll & Document;

@Schema()
export class Poll {
  @Prop()
  question: string;

  @Prop()
  proposals: string[];

  @Prop()
  creator: Wallet;

  @Prop()
  voters: Wallet[];

  @Prop()
  isDeployed: boolean;

  @Prop()
  deployment: {
    address: string;
    hash: string;
    admin: Wallet;
  };

  @Prop()
  votes: {
    voter: Wallet;
    proposalChoiceSelected: number;
    hash: string;
  };
}

export const PollSchema = SchemaFactory.createForClass(Poll);
