import PasswordGenerator from "@/components/PasswordGenerator"
import { Suspense } from "react"

type Props = {}

const PasswordGeneratorPage = (props: Props) => {
  return (
    <Suspense>
      <PasswordGenerator/>
    </Suspense>
  )
}

export default PasswordGeneratorPage