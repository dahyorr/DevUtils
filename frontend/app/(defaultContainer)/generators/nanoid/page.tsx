import NanoidGenerator from '@/components/NanoidGenerator'
import { Suspense } from 'react'

type Props = {}

const NanoidPage = (props: Props) => {
  return (
    <Suspense>
      <NanoidGenerator/>  
    </Suspense>
  )
}

export default NanoidPage