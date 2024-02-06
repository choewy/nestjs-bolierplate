import { ApiResponseProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

export class DailyPostCountDto {
  @ApiResponseProperty({ type: Number })
  readonly memberId: number;

  @ApiResponseProperty({ type: Date, format: 'date' })
  readonly date: string;

  @ApiResponseProperty({ type: Number })
  readonly count: number;

  constructor(memberId: number, date: Date, count: number) {
    this.memberId = memberId;
    this.date = DateTime.fromJSDate(date).toSQLDate();
    this.count = count;
  }
}
