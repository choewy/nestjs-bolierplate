import { IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class DailyPostCountCriteria {
  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  readonly memberId: number;

  @ApiProperty({ type: Date, format: 'date' })
  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({ type: Date, format: 'date' })
  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;
}
