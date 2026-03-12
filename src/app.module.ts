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
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env', // Load environment variables from .env file
      isGlobal: true, // Make ConfigModule available globally
    }),
    process.env.DATABASE_URL ?
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          password: configService.get('REDIS_PASSWORD'), 
          ttl: 60000,
        }),
      }),
      inject: [ConfigService],
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
