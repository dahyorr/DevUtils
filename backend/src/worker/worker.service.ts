import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WorkerHashResponse } from 'src/types';

@Injectable()
export class WorkerService {
  constructor(
    private readonly configService: ConfigService,
  ) { }
  workerClient = axios.create({
    baseURL: this.configService.get<string>('WORKER_URL')
  })

  async hashRequest(filePath: string, hashType: string) {
    const res = await this.workerClient.post<WorkerHashResponse>('/hash', {
      file_path: `temp/${filePath}`,
      hash_type: hashType
    })
    return res.data
  }
}
