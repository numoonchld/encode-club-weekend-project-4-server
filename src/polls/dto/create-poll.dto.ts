import { ApiProperty } from '@nestjs/swagger';
import { utils } from 'ethers';

export class CreatePollDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  proposals: string[];

  @ApiProperty()
  creator: string;
}
