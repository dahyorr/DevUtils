import FileForm from '@/components/FileHashGenerator/FileForm'
import React, { Suspense } from 'react'

const FileHashGeneratorPage = () => {
  return (
    <Suspense>
      <FileForm />
    </Suspense>
  )
}

export default FileHashGeneratorPage