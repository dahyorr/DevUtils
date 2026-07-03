import { UUIDVersion } from '@/types'
import { v4, v1 } from 'uuid'

export const generateUuid = (version = 'v4' as UUIDVersion) => {
  let uuidStr: string
  if (version === "v4") {
    uuidStr = v4()
  }
  else if (version === "v1") {
    uuidStr = v1()
  }
  else {
    throw new Error('Invalid UUID version')
  }
  return uuidStr
}
