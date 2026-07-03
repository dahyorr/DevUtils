import HashPreview from '@/components/FileHashGenerator/HashPreview'
import { Suspense } from 'react'

const FileHashGeneratorResultPage = async ({ }) => {

  return (
    <Suspense>
      <HashPreview />
    </Suspense>
  )
}

export default FileHashGeneratorResultPage