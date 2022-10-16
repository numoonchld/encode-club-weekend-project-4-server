import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Signer } from 'ethers';

export type PollDocument = Poll & Document;

@Schema()
export class Poll {
  @Prop()
  question: string;

  @Prop()
  proposals: string[];

  @Prop()
  creator: Signer;

  @Prop()
  voters: Signer[];

  @Prop()
  isDeployed: boolean;

  @Prop()
  deployment: {
    address: string;
    hash: string;
  };

  @Prop()
  votes: {
    voter: Signer;
    proposlaChoiceSelected: number;
    hash: string;
  };
}

export const PollSchema = SchemaFactory.createForClass(Poll);
