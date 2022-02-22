import { Controller, Get } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Controller('api')
export class AppController {
  constructor(private readonly redisRepository: RedisRepository) {}

  @Get('jobs')
  getHello() {
    return this.redisRepository.getJobs();
  }
}
