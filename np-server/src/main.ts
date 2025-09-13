import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVariable } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT), '0.0.0.0');
  console.log("Server is running on: http://localhost:" + process.env.PORT);
}
bootstrap();
