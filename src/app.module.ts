import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/user.entity';
import { UserModule } from './modules/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth.module';
import { Ticket } from './entity/ticket.entity';
import { TicketModule } from './modules/ticket.module';
import { AddSearchVectorToTickets1773160411046 } from './migrations/AddSearchVectorToTickets1773160411046';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env', // Load environment variables from .env file
      isGlobal: true, // Make ConfigModule available globally
    }),
    process.env.DATABASE_URL ?
      TypeOrmModule.forRoot({
        type: 'postgres',
        // Railway provides the full URL, which is the easiest way to connect
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true, // Set to false in production usually!
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
      }) :
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          entities: [User, Ticket],
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: false,
          migrationsRun: true,
          migrations:[AddSearchVectorToTickets1773160411046]
        }),
      }),
    UserModule,
    AuthModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: any) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
