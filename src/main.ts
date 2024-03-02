import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger configuration
  const SWAGGER_API_ROOT = 'api/docs';
  const SWAGGER_API_NAME = 'API';
  const SWAGGER_API_DESCRIPTION = 'CODEBUDDY ASSESSMENT';
  const SWAGGER_API_CURRENT_VERSION = '1.0';

  //swagger configuration
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  //enabled class-validator validations
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
