import NumberBaseConverter from '@/components/NumberBaseConverter'
import TextEscapeUnescape from '@/components/TextEscapeUnescape'
import { Suspense } from 'react'

type Props = {}

const NumberBaseConverterPage = (props: Props) => {
  return (
    <Suspense>
      <TextEscapeUnescape/>
    </Suspense>
  )
}

export default NumberBaseConverterPage