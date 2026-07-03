import Base64ImageConverter from "@/components/Base64ImageConverter"
import { Suspense } from "react"

const Base64ImagePage = () => {
  return (
    <Suspense>
      <Base64ImageConverter/>
    </Suspense>
  )
}

export default Base64ImagePage