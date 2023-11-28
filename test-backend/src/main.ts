import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.TEST_BACKEND_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
