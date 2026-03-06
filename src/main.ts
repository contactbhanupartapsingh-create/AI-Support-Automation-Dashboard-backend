import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
  transform: true, // <--- MUST BE TRUE
  whitelist: true,
  transformOptions: {
    enableImplicitConversion: true, // Recommended for Enums/Numbers
  },
}));
  console.log(process.env.PORT,'this is port for public forwarding')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
