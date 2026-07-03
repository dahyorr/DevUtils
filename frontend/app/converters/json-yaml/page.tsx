import JsonToYaml from '@/components/JsonToYaml'
import {Suspense} from 'react'

type Props = {}

const JsonYamlpage = () => {
  return (
    <Suspense>
      <JsonToYaml/>
    </Suspense>
  )
}

export default JsonYamlpage