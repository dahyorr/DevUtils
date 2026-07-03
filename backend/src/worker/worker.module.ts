import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [WorkerService, ConfigService],
  exports: [WorkerService]
})
export class WorkerModule { }
