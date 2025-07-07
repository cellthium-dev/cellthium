import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import type { Metadata } from "next"
import PasswordWrapper from "./password-wrapper"

export const metadata: Metadata = {
  title: "Cellthium",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })
  if (!collections || !region) return null

  return <PasswordWrapper />
}
