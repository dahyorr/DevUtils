import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { readFileSync, unlinkSync } from 'fs'

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const mockUploadService = new UploadService()
    mockUploadService.generateUUID = () => '00000000-0000-0000-0000-000000000000'

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a file', async () => {
    const buf = Buffer.from('testtest', 'utf8');
    const uuid = service.generateUUID()
    const path = service.generateFilePath(uuid)

    await service.saveFile(uuid, buf)
    const file = readFileSync(path)
    unlinkSync(path)

    const compare = Buffer.compare(buf, file)
    expect(file).toBeDefined();
    expect(compare).toEqual(0)
  });
  
});
