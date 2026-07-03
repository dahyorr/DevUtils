import ColorConverter from '@/components/ColorConverter'
import React, { Suspense } from 'react'

type Props = {}

const ColorConverterPage = (props: Props) => {
  return (
    <Suspense>
      <ColorConverter/>
    </Suspense>
  )
}

export default ColorConverterPage