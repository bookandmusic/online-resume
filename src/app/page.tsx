

import { HelloMessage } from "@/components/hello";
import { InnerLayout } from "@/components/layout";
import { authOptions } from "@/lib/auth/next-auth.config";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(authOptions);
  return (
    <InnerLayout
      session={session}
    >
      <HelloMessage />
    </InnerLayout>
  )
}
