import { ApiResponseProperty } from '@nestjs/swagger';

export class DailyPostCountDto {
  @ApiResponseProperty({ type: Number })
  readonly memberId: number;

  @ApiResponseProperty({ type: Date, format: 'date' })
  readonly date: string;

  @ApiResponseProperty({ type: Number })
  readonly count: number;

  constructor(memberId: number, date: string, count: number) {
    this.memberId = memberId;
    this.date = date;
    this.count = count;
  }
}
