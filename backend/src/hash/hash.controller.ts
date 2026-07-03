import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HashRequestDto, HashGetRequestDto } from './dtos/hash-request.dto';
import { HashService } from './hash.service';

@Controller('hash')
export class HashController {
  constructor(private readonly service: HashService) {}

  @Post('initiate')
  intiateFileHash(@Body() { fileId, hashTypes }: HashRequestDto) {
    return this.service.initiateFileHash(fileId, hashTypes);
  }

  @Get('result')
  getHashResult(@Query() { fileId }: HashGetRequestDto) {
    return this.service.getHashResult(fileId);
  }
}
