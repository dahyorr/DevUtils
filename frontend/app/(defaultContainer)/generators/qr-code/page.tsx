import QrCodeGenerator from '@/components/QrCodeGenerator'
import { Suspense } from 'react'

type Props = {}

const QrCodePage = (props: Props) => {
  return (
    <Suspense>
      <QrCodeGenerator/>  
    </Suspense>
  )
}

export default QrCodePage