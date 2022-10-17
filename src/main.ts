import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable CORS for API calls from Angular
  app.enableCors();

  // configure OpenAPI (Swagger)
  const config = new DocumentBuilder()
    .setTitle('Tokenized Ballot dApp')
    .setDescription(
      'API backend server for Tokenized Ballot dApp on the Goerli testnet',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
