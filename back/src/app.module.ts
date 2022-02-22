import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisRepository } from './redis.repository';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.environment',
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        'front',
        'dist',
        'bull-supervisor-front',
      ),
    }),
  ],
  controllers: [AppController],
  providers: [RedisRepository],
})
export class AppModule {}
