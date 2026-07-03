import { Suspense } from 'react';
import UuidGenerator from '@/components/UUIDGenerator';


const UuidGeneratorPage = () => {
  return (
    <Suspense>
      <UuidGenerator />  
    </Suspense>
  )
}

export default UuidGeneratorPage