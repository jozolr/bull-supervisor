import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Bull, * as QueueBull from 'bull';

@Injectable()
export class RedisRepository {
  queue: Bull.Queue;
  private isReady = false;
  private logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = new Logger('RedisRepository');
    this.queue = new QueueBull(
      'JobQueue',
      this.configService.get('redis').url,
      {
        redis: {
          enableReadyCheck: true,
          retryStrategy: (times: number): number => {
            if (times > 1) {
              this.logger.error(
                'could not connect to redis!' + times.toString(),
              );
            }
            this.isReady = true;
            return 1000;
          },
        },
      },
    );
    this.queue.isReady().then(() => {
      this.isReady = true;
    });
  }

  async isQueueReady(): Promise<Bull.Queue> {
    return this.queue.isReady();
  }

  getJobs() {
    return this.queue.getJobs([
      'completed',
      'waiting',
      'active',
      'delayed',
      'failed',
      'paused',
    ]);
  }
}
