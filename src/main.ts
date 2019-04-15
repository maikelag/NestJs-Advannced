import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '10mb'}));
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const options = new DocumentBuilder()
  .setTitle('User example')
  .setDescription('The users API description')
  .setVersion('1.0')
  .addTag('users')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
