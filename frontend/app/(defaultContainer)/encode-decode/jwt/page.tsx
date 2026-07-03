import JWTEncodeDecode from "@/components/JWTEncodeDecode"
import { Suspense } from "react"

type Props = {}

const JWTPage = (props: Props) => {
  return (
    <Suspense>
      <JWTEncodeDecode />
    </Suspense>
  )
}

export default JWTPage