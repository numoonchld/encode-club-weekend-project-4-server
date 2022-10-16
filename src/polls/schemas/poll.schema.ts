import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PollDocument = Poll & Document;

// schemaType limitations: https://mongoosejs.com/docs/guide.html#definition

class Deployment {
  address: string;
  hash: string;
  admin: string;
}

class Vote {
  voter: string;
  proposalChoiceSelected: number;
  hash: string;
}

@Schema()
export class Poll {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  proposals: string[];

  @Prop({ required: true })
  creator: string;

  @Prop()
  isDeployed: boolean;

  @Prop()
  deployment: Deployment;

  @Prop()
  votes: Vote[];
}

export const PollSchema = SchemaFactory.createForClass(Poll);
