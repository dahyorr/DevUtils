import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DB } from 'src/db/db.module';
import * as schema from 'src/db/schema';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(DB) private readonly db: NeonHttpDatabase<typeof schema>
  ) { }
  S3_BUCKET = this.configService.get<string>('S3_UPLOAD_BUCKET')
  S3_REGION = this.configService.get<string>('S3_REGION')
  s3Client = new S3Client({
    region: this.S3_REGION
  })

  async uploadFile(key: string, fileBuffer: Buffer) {
    const params = {
      Bucket: this.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
    };
    await this.s3Client.send(new PutObjectCommand(params))
  }

  async initiateUpload(file: Express.Multer.File, prefix?: string) {
    /* processes upload and saves metadata to cache*/
    const fileId = randomUUID();
    let key = fileId
    if (prefix) {
      key = `${prefix}/${fileId}`
    }
    const { buffer, originalname: filename, size, mimetype } = file;
    await this.uploadFile(key, buffer);
    await this.db.insert(schema.files).values({
      id: fileId,
      filename,
      size,
      mimetype,
      key,
      updatedAt: new Date()
    })
    // await this.redisCache.setValue<FileMetaData>(fileId, metaData);
    return { fileId, message: 'File uploaded successfully' };
  }
}
