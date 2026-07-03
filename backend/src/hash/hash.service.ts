import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { HashStatus, HashType } from 'src/types';
import { DB } from 'src/db/db.module';
import * as schema from 'src/db/schema';
import { WorkerService } from 'src/worker/worker.service';

@Injectable()
export class HashService {
  constructor(
    @Inject(DB) private readonly db: NeonHttpDatabase<typeof schema>,
    private readonly worker: WorkerService,
  ) { }

  async validatFileRecord(fileId: string) {
    /*  Returns file record if it exists in cache */
    const fileData = await this.db.query.files.findFirst({ where: eq(schema.files.id, fileId) });
    if (!fileData) {
      throw new NotFoundException('This record does not exist');
    }
    return fileData
  }

  // parseFileHash(fileData: FileMetaData, hashType: HashType) {
  //   /* Parses provided record if requested hash object exists*/
  //   if (!fileData.hashes) {
  //     return null
  //   }
  //   const result = fileData.hashes.find(
  //     (hashObj) => hashObj.hashType === hashType,
  //   );

  //   return result ? result : null
  // }

  // checkHashExistience(fileData: File) {

  //   if (fileData.hashes) {
  //     return fileData.hashes
  //   }
  //   return false
  // }

  // async addPendingStatus(fileId: string, fileData: FileMetaData, hashType: HashType) {
  //   const hashPendingData = {
  //     hashType,
  //     status: "Pending" as const,
  //     hash: ""
  //   }
  //   if (fileData.hashes) {
  //     fileData.hashes.push(hashPendingData)
  //   }
  //   else {
  //     fileData.hashes = [hashPendingData]
  //   }
  //   // await this.redisCache.setValue(fileId, fileData)
  //   return true
  // }

  async initiateFileHash(
    fileId: string,
    hashTypes: HashType[],
  ) {
    /* starts file hashing */
    const fileData = await this.validatFileRecord(fileId)
    await this.db.insert(schema.hashes).values(
      hashTypes.map(hashType => ({
        id: randomUUID(),
        type: hashType,
        fileId: fileData.id
      }))
    )
    return {
      message: 'Hash request initaited',
    };
  }

  async getHashResult(fileId: string) {
    /* fetches file hashing result */
    const fileData = await this.db.query.files.findFirst({
      where: eq(schema.files.id, fileId),
      columns: {
        id: true,
        key: true,
      },
      with: {
        hashes: {
          columns: {
            id: true,
            type: true,
            status: true,
            hash: true
          }
        }
      }
    })
    if (!fileData) {
      throw new NotFoundException('This record does not exist');
    }
    const hashes = fileData.hashes
    const sortedHashes = hashes.reduce((acc, cur) => {
      acc[cur.status].push(cur)
      return acc
    }, {
      pending: [],
      completed: [],
      failed: [],
    } as Record<HashStatus, typeof hashes>)


    if (sortedHashes['pending'].length > 0) {
      try {
        const hashes = await Promise.all(sortedHashes['pending'].map(h => this.worker.hashRequest(fileData.id, h.type)))
        console.log(hashes)
        const res = await Promise.all(sortedHashes['pending'].map(({ id, ...hashData }, i) => (this.db.update(schema.hashes)
          .set({
            ...hashData,
            hash: hashes[i].hash,
            status: 'completed'
          })
          .where(eq(schema.hashes.id, id)))))
        console.log(res)
      }
      catch (err) {
        console.log(err)
        throw new InternalServerErrorException("Something went wrong")
      }
    }

    return hashes
  }
}
