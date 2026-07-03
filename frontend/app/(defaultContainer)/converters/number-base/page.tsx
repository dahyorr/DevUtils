import NumberBaseConverter from '@/components/NumberBaseConverter'
import { Suspense } from 'react'

type Props = {}

const NumberBaseConverterPage = (props: Props) => {
  return (
    <Suspense>
      <NumberBaseConverter/>
    </Suspense>
  )
}

export default NumberBaseConverterPage