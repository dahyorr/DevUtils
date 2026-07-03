import JsonToYaml from '@/components/JsonToYaml'
import MarkdownPreview from '@/components/MarkdownPreview'
import {Suspense} from 'react'

type Props = {}

const MarkdownPreviewPage = () => {
  return (
    <Suspense>
      <MarkdownPreview/>
    </Suspense>
  )
}

export default MarkdownPreviewPage