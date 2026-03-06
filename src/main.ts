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
console.log("FORCE DEPLOY CHECK #1");
await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
