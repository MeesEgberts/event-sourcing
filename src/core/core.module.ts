import { Module } from '@nestjs/common';
import { EVENT_STORE_CONNECTION } from './core.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.EVENT_STORE_HOST,
      username: process.env.EVENT_STORE_USERNAME,
      password: process.env.EVENT_STORE_PASSWORD,
      database: process.env.EVENT_STORE_DATABASE,
      port: Number(process.env.EVENT_STORE_PORT),
      // synchronize: process.env.NODE_ENV === 'development',
      synchronize: true,
      autoLoadEntities: true,
      name: EVENT_STORE_CONNECTION,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.READ_DB_HOST,
      username: process.env.READ_DB_USERNAME,
      password: process.env.READ_DB_PASSWORD,
      database: process.env.READ_DB_DATABASE,
      port: Number(process.env.READ_DB_PORT),
      // synchronize: process.env.NODE_ENV === 'development',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class CoreModule {}
