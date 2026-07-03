export type HashStatus = 'pending' | 'completed' | 'failed'

export enum HashEnum {
    'sha256',
    'md5',
    'sha512',
    'sha224'
  }
  
export type HashType = 'sha256' | 'md5' | 'sha512' | 'sha224'

export type StatusType = "Pending" | "Failed" | "Completed"

export interface HashData {
  hashType: HashType;
  hash: string;
  status: StatusType;
}

export interface FileMetaData {
  filename: string;
  size: number;
  mimetype: string;
  hashes: HashData[] | null;
}

export interface WorkerHashResponse{
  hash: string,
  hashType: HashEnum,
  status: HashStatus
}