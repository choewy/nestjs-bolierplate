import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Traffic').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableCircularCheck: true, enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        throw new BadRequestException(Object.values(errors.shift().constraints).pop());
      },
    }),
  );

  useSwagger(app);

  await app.listen(3000);
};

bootstrap();
