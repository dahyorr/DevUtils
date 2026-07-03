import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadRequestDto } from './dtos/upload-request.dto';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) { }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 20000000,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() { isTemp }: UploadRequestDto) {
    if (!file) {
      throw new UnprocessableEntityException('No file provided');
    } else {
      let prefix = ''
      if (isTemp) {
        prefix = 'temp'
      }
      const res = await this.uploadService.initiateUpload(file, prefix);
      return res
    }
  }
}
