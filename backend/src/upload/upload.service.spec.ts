import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';
import { DB } from 'src/db/db.module';

const sendMock = jest.fn().mockResolvedValue({});

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({ send: sendMock })),
  PutObjectCommand: jest.fn().mockImplementation((input) => ({ input })),
}));

describe('UploadService', () => {
  let service: UploadService;
  let values: jest.Mock;
  let insert: jest.Mock;

  const makeFile = (): Express.Multer.File => ({
    buffer: Buffer.from('testtest', 'utf8'),
    originalname: 'test.txt',
    size: 8,
    mimetype: 'text/plain',
  } as Express.Multer.File);

  beforeEach(async () => {
    sendMock.mockClear();
    values = jest.fn().mockResolvedValue(undefined);
    insert = jest.fn().mockReturnValue({ values });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('test-value') },
        },
        { provide: DB, useValue: { insert } },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uploads the file to S3 and records file metadata', async () => {
    const file = makeFile();

    const result = await service.initiateUpload(file);

    expect(result.message).toBe('File uploaded successfully');
    expect(result.fileId).toBeDefined();
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({
        id: result.fileId,
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        key: result.fileId,
      }),
    );
  });

  it('prefixes the storage key when a prefix is provided', async () => {
    const file = makeFile();

    const result = await service.initiateUpload(file, 'temp');

    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({ key: `temp/${result.fileId}` }),
    );
  });
});
