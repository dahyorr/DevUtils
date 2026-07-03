import { IsString, IsOptional } from 'class-validator'

export class UploadRequestDto {
  file: any;

  @IsString()
  @IsOptional()
  isTemp?: string
}
