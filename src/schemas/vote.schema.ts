import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoteDocument = Vote & Document;

// schemaType limitations: https://mongoosejs.com/docs/guide.html#definition

@Schema()
export class Vote {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  selection: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
