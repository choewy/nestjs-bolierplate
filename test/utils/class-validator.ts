import { Type } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';

export class ClassValidator {
  static validate<Dto>(dto: Type<Dto>, plain: Partial<Dto> = {}): ValidationError | null {
    const errors = validateSync(plainToInstance(dto, plain) as object, {
      stopAtFirstError: true,
    });

    return errors.shift() ?? null;
  }
}
