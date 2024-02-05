import { Repository } from 'typeorm';

import { Provider, Type } from '@nestjs/common';

export const mockRepository = <E, R extends Repository<E>>(Provide: Type<R>): Provider => {
  const value = {};

  []
    .concat(Object.getOwnPropertyNames(Repository.prototype))
    .concat(Object.getOwnPropertyNames(Provide.prototype))
    .forEach((methodName) => {
      value[methodName] = jest.fn();
    });

  return { provide: Provide, useValue: value };
};
