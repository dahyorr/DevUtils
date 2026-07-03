import Base64EncodeDecodePage from '@/components/Base64Converter'
import { Suspense } from 'react'

type Props = {}

const Base64Page = (props: Props) => {
  return (
    <Suspense>
      <Base64EncodeDecodePage />
    </Suspense>
  )
}

export default Base64Page