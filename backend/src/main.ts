import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('listening to port: '+process.env.APP_PORT)
  await app.listen(process.env.APP_PORT);
}
bootstrap();
