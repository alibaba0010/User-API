import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4005, () =>
    console.log(`Listening on port http://localhost:4005`),
  );
}
bootstrap();
