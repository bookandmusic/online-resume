import { getServerSession } from "next-auth";

import { InnerLayout } from "@/components/layout";
import ResumeTemplates from "@/components/resume-templates";
import { authOptions } from "@/lib/auth/next-auth.config";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <InnerLayout session={session}>
      <ResumeTemplates />
    </InnerLayout>
  );
}
