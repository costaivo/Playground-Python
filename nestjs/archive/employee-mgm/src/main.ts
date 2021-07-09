import { NestFactory } from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstrap the nest-js application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'verbose','log','debug'],
  });
  const logger = new Logger('bootstrap');
  
  // Setup Documentation
  documentationSetup(app);

  const port =9000;
  await app.listen(port);
  logger.log(`Application Started. Listening on port ${port}`)
}

/**
 * Add API documentation for API endPoints
 * 
 * @param app Nest Application
 */
function documentationSetup(app){
  const options = new DocumentBuilder()
  .setTitle('Training Tracker')
  .setDescription('The API for Training Tracker Application')
  .setVersion('0.2')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
}

bootstrap();
