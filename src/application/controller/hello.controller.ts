import { DataSource } from 'typeorm';

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('hello')
@Controller()
export class HelloController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  @ApiOperation({ summary: 'DB 연결 상태 체크' })
  async checkDBConnection() {
    return this.dataSource
      .query('SELECT 1;')
      .then(() => true)
      .catch(() => false);
  }
}
