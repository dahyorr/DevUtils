import { Module } from '@nestjs/common';
import { UploadModule } from '../upload/upload.module';
import { ConfigModule } from '@nestjs/config';
// import { PublishModule } from 'src/publish/publish.module';
import { HashModule } from '../hash/hash.module';
import configuration from '../config/configuration';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true
    }),
    DbModule,
    HashModule,
  ],
})
export class AppModule { }
