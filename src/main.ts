import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationException } from './utils/exceptions/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { errorFormatter } from './utils/helpers/validation.error.formatter';
import {
  VersioningType,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('port', 3000);

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errorFormatter(errors);

        return new ValidationException(messages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
    })
    .setTitle('test api')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(PORT, () => {});
}

bootstrap();
