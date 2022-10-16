import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Wallet } from 'ethers';

export type PollDocument = Poll & Document;

@Schema()
export class Poll {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  proposals: string[];

  @Prop({ required: true })
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
