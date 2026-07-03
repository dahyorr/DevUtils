import { nanoid } from "nanoid"

export const generateNanoid = (length?:number ) => {
  return nanoid(length)
}